import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import cleaner from 'rollup-plugin-cleaner'

export default {
    // input: "src/index.js",
    // input: ['src/index.js', 'src/album.js'],
    input: {
        foo: 'src/index.js',
        bar: 'src/album.js'
    },
    output: {
        // file: "dist/bundle.js",
        // format: "iife"
        dir: "dist",
        format: "amd"
    },
    plugins: [
        json(),
        resolve(),
        commonjs(),
        cleaner({
            targets: [
                './dist'
            ]
        })
    ]
}