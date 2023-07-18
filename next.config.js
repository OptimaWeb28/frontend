const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: '127.0.0.1',
			},
		],
	},
	env: {
		NEXT_SHARP_PATH: '/node_modules/sharp'
	}
}

module.exports = nextConfig
