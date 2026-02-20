import type { Decorator } from '@storybook/react'
import GlobalStyles from '../src/styles/global'

export const decorators: Decorator[] = [
  (Story) => (
    <>
      <GlobalStyles />
      <Story />
    </>
  )
]
export const tags = ['autodocs']
