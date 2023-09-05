const config = {
  staticDirs: ['../public'],
  stories: ['..src/components/**/stories.tsx'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  docs: {
    autodocs: true
  },
  webpackFinal: (config: { resolve: { modules: string[] } }) => {
    config.resolve.modules.push(`${process.cwd()}/src`)
    return config
  }
}

export default config
