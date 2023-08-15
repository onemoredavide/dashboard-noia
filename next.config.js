const withPlugins = require("next-compose-plugins")
const { paths } = require("./src/i18n/config.js")
const { version } = require("./package.json")

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  typescript: {
    tsconfigPath: "./tsconfig.build.json"
  },
  rewrites: async() => {
    const rewrites = []
    for (const [fsPath, i18n] of Object.entries(paths)) {
      for (const [lng, translation] of Object.entries(i18n)) {
        const source = `/${lng}${translation}`, destination = `/${lng}${fsPath}`
        if (source !== destination) {
          rewrites.push({ source, destination }, { source: destination, destination: `/${lng}/404` })
        }
      }
    }

    return rewrites
  },
  // ! PENDING NextJS https://github.com/vercel/next.js/issues/48765
  // compress: false,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: !!process.env.CI
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        __SENTRY_DEBUG__: process.env.NEXT_PUBLIC_ENVIRONMENT === "local"
      })
    )

    // return the modified config
    return config
  }
}

const plugins = []

if (process.env.NEXT_PUBLIC_WITH_SENTRY === "true") {
  const { withSentryConfig } = require("@sentry/nextjs")

  plugins.push((nextConfig) =>
    withSentryConfig(
      nextConfig,
      { silent: false, release: `v${version}` },
      { hideSourceMaps: true }
    ))
}

if (process.env.ANALYZE === "true") {
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true
  })

  plugins.push([withBundleAnalyzer])
}

module.exports = withPlugins(plugins, nextConfig)
