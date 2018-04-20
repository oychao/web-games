export default [
    {
        input: './index.js',
        output: [
            {
                file: 'dist/bundle.js',
                format: 'iife',
                name: 'jQuery'
            },
        ],
        plugins: [],
        external: ['fs', 'path', 'jsonfile',],
    },
];
