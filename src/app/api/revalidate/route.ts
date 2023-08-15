import type { NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"
import { languages } from "$i18n/helpers"
import { getPath } from "$helpers/routes"
import { ReplaceParams, Href } from "$types/routes"
import { validateWithJsonSchema } from "$helpers/ajv"

type PageParams = {
  path: Href
  params?: ReplaceParams
}

type RequestParams = {
  pages: PageParams[]
}

export const POST = async(req: NextRequest, res: NextApiResponse): Promise<Response> => {
  if (req.headers.get("authorization") !== process.env.REVALIDATE_TOKEN) {
    return new Response("Invalid token", {
      status: 401
    })
  }

  try {
    const body = await req.json() as RequestParams

    const validationResult = validateWithJsonSchema({
      data: body,
      schema: {
        type: "object",
        additionalProperties: false,
        required: ["pages"],
        properties: {
          pages: {
            type: "array",
            minItems: 1,
            items: {
              type: "object",
              additionalProperties: false,
              required: ["path"],
              properties: {
                path: {
                  type: "string"
                },
                params: {
                  type: "object",
                  additionalProperties: {
                    anyOf: [
                      {
                        type: "string"
                      },
                      {
                        type: "number"
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!validationResult.isValid) {
      return NextResponse.json({
        message: "Validation error",
        details: validationResult.errors,
        jsonSchema: validationResult.schema
      }, {
        status: 400
      })
    }

    const { pages } = body

    const paths = languages.map((lng) => {
      return pages.map(({ path, params }: PageParams) => getPath({
        href: path,
        lng,
        replaceParams: params
      }))
    }).flat()

    const results = await Promise.allSettled(paths.map((path => res.revalidate(path))))

    return NextResponse.json({
      revalidated: paths.filter((_, i) => results[i].status === "fulfilled"),
      failed: paths.filter((_, i) => results[i].status === "rejected")
    }, {
      status: 200
    })
  } catch (error) {
    return NextResponse.json({
      message: "Internal server error",
      details: (error as Error).message
    }, {
      status: 500
    })
  }
}
