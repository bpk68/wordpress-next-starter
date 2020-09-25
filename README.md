# Introduction

This is a quick, no-frills starter project that will allow you to connect a Next.js project to a WordPress instance running in headless mode.

_This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)._

## Getting Started

First, you'll need to install the dependencies:

```bash
yarn install
# or
npm install
```

### Adding an environment file

This project makes use of an external WordPress instance as a GraphQL API endpoint. If you look in the `/lib/api.js` file, you'll see we make reference to an environment variable, `process.env.WP_API_URL`.

To consume this, you'll need to make a new file in the project root called `.env.local`.

Once you've created the file, add the following:

```js
WP_API_URL=http://demo.robkendal.co.uk/graphql/
```

> **Note** I'm happy for you to temporarily use my personal demo site using the URL above. However, please be aware that it might not function as you expect, you have no control over the site, it's content or fields, and the site may be taken down without notice, which will cause unintended side effects for your own project.
> Please look to create your own WordPress instance and use that moving forward :)

### Running the project

Lastly, to run and test the project, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying page files under the `/pages/` path. The page auto-updates as you edit the file.

## Learn More

To learn more about using WordPress as a headless CMS with Next.js, check out my original blog article series:

- [Using WordPress as a Headless CMS with Next.js](https://robkendal.co.uk/blog/using-wordpress-as-a-headless-cms-with-next.js)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
