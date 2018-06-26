# Contributing

## Playground

This project comes with a playground to generate demos for indexes. You can run
the playground by typing `yarn run playground:serve` and opening
http://localhost:3000/.

The playground is used by developers to check that `talksearch.js` can work in
a variety of scenarios, and also to showcase an example of what can be done with
the data.

### Creating a new demo

To add a new demo to the playground, you'll need to create a new directory in
`./playground/src`. This directory should contain the following files:
- `index.pug` will contain all the required metadata for the page (conference
  name, url, appId and apiKey)
- `search.js` will contain the actual instantsearch code for this specific demo.
  It can accept custom `// include: hits.js` strings to include some of the most
  used widgets.
- `style.css` will contain any custom styling you need to apply to the page.
  This will be processed as part of the postcss build, so you can use tailwind
  `@apply` directive.
- `tailwind.config.js` will contain config you need to pass to
  tailwind. This is where you define/overwrite colors.
- `logo.*` and `logo-small.*` are images used for displaying the logo in the
  header on various screen size. They can be of any extensions (`svg` or `png`
  are recommended, though).
- `fonts` should contain any additional font you need to use. CSS class names
  will automatically be added for fonts there.
