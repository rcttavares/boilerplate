module.exports = {
  // Lint & Prettify TS and JS files
  '*.{js,jsx,ts,tsx}': (filenames) => [
    `node ./node_modules/prettier/bin/prettier.cjs --write ${filenames.join(
      ' '
    )}`,
    `biome lint --write ${filenames.join(' ')}`,
    `npm test -- --findRelatedTests ${filenames.join(' ')}`
  ]
}
