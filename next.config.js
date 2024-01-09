const isProd = process.env.NODE_ENV === 'production'
const prefixPath = !isProd ? '/farm' : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
	assetPrefix: prefixPath,
	basePath: prefixPath,
	output: 'export',
	images: { unoptimized: true }
}

module.exports = nextConfig
