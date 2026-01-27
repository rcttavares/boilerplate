import path from 'path'
import { fileURLToPath } from 'url'
import type { UserConfig } from 'vite'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const config = {
  staticDirs: ['../public'],
  stories: ['../src/components/**/stories.tsx'],
  addons: ['@storybook/addon-docs'],

  framework: {
    name: '@storybook/nextjs-vite',
    options: {}
  },

  viteFinal: async (config: UserConfig) => {
    config.resolve = config.resolve ?? {}
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string> | undefined),
      '@': path.resolve(dirname, '../src')
    }
    return config
  }
}

export default config
