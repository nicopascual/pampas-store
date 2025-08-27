/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	watchSchema: {
		url: 'http://server.test/graphql'
	},
	runtimeDir: '.houdini',
	plugins: {
		'houdini-svelte': {}
	},
	exclude: ['src/lib/paraglide/**/*']
};

export default config;
