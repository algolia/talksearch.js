/* eslint-disable import/no-commonjs */
const _ = require('lodash');
const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const filterRules = require('postcss-filter-rules');
const cleancss = require('postcss-clean');
const inline = require('postcss-url');
const shouldMinify = process.env.MINIFY;

const tailwindConfig = './tailwind.config.js';
const filterOptions = {
  filter(selector) {
    return _.startsWith(selector, '.ais-') || _.startsWith(selector, '.ats-');
  },
};
const inlineOptions = {
  url: 'inline',
};
const cleanCssOptions = {
  level: {
    1: {
      specialComments: false,
    },
  },
};

const pluginList = [
  tailwind(tailwindConfig), // Load tailwind utilities
  filterRules(filterOptions), // Keep only .ais-* classes
  inline(inlineOptions), // Inline svg images
  autoprefixer, // Crossbrowser compat
];

if (shouldMinify) {
  pluginList.push(cleancss(cleanCssOptions));
}

module.exports = {
  plugins: pluginList,
};
