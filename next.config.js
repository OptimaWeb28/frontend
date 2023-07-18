const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'cms',
			},
		],
	},
	env: {
		NEXT_SHARP_PATH: '/node_modules/sharp'
	}
}

module.exports = nextConfig
