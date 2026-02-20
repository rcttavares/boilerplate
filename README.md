# Boilerplate

![Boilerplate](https://raw.githubusercontent.com/React-Avancado/boilerplate/master/public/img/logo-gh.svg)

## What is inside?

This project uses lot of stuff as:

- [TypeScript](https://www.typescriptlang.org/)
- [NextJS](https://nextjs.org/)
- [Styled Components](https://styled-components.com/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Storybook](https://storybook.js.org/)
- [Biome](https://biomejs.dev/) (lint/check)
- [Prettier](https://prettier.io/)
- [Husky](https://github.com/typicode/husky) + [lint-staged](https://github.com/lint-staged/lint-staged)
- [Plop](https://plopjs.com/) (generators)

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Commands

- `dev`: runs your application on `localhost:3000`
- `build`: creates the production build version
- `start`: starts a simple server with the build production code
- `lint`: runs Biome linter across the project
- `check`: runs Biome checks and applies safe fixes
- `test`: runs jest to test all components and pages
- `test:watch`: runs jest in watch mode
- `test:ci`: runs jest in CI mode
- `storybook`: runs storybook on `localhost:6006`
- `build-storybook`: creates the build version of storybook
- `generate`: scaffolds code using Plop generators
- `audit`: runs `npm audit` (fails if any vulnerability exists)
- `audit:prod`: runs `npm audit` for runtime dependencies only
- `prepare`: installs Git hooks via Husky

## Security audit

This project aims to keep `npm audit` with zero vulnerabilities. If you want to check only runtime (production) dependencies, use the command below.

- Production-focused audit (runtime deps):

```bash
npm run audit:prod
```

- Full audit (fails if any vulnerability exists):

```bash
npm run audit
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
