import Ajv from "ajv"
import type { JSONSchema7 } from "json-schema"
import type { ErrorObject } from "ajv/dist/types"

export type ValidateWithJsonSchemaParams<T> = {
  schema: JSONSchema7
  data: T
}

type ValidateWithJsonSchemaResponse = {
  isValid: boolean
  errors: ErrorObject[] | null
  schema: JSONSchema7
}

export const validateWithJsonSchema = <T>({ schema, data }: ValidateWithJsonSchemaParams<T>): ValidateWithJsonSchemaResponse => {
  const ajv = new Ajv({ allErrors: true })
  const validator = ajv.compile(schema)
  const isValid = validator(data)

  return {
    isValid,
    errors: validator.errors || null,
    schema
  }
}
