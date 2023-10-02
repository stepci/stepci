export default {
  title: 'Step CI Docs',
  description: 'API Testing and Monitoring made simple.',
  lastUpdated: true,
  markdown: {
    theme: 'github-dark'
  },
  themeConfig: {
    siteTitle: 'Step CI',
    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/KqJJzJ3BTu' },
      { icon: 'twitter', link: 'https://twitter.com/ci_step' },
      { icon: 'github', link: 'https://github.com/stepci/stepci' },
    ],
    logo: 'https://stepci.com/logo.svg',
    nav: [
      { text: 'Home', link: 'https://stepci.com' },
      { text: 'Playground', link: 'https://stepci.com' },
      { text: 'Star us', link: 'https://github.com/stepci/stepci' },
    ],
    editLink: {
      pattern: 'https://github.com/stepci/stepci/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    algolia: {
      appId: 'BGFVFFQ7D3',
      apiKey: '3edb499a6cb1b332569b42cd4e44da82',
      indexName: 'stepci'
    },
    sidebar: [
      {
        text: 'Learn',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Getting Started', link: '/guides/getting-started' },
          { text: 'Concepts', link: '/guides/concepts' },
          { text: 'Testing HTTP APIs', link: '/guides/testing-http' },
          { text: 'Testing GraphQL APIs', link: '/guides/testing-graphql' },
          { text: 'Testing tRPC APIs', link: '/guides/testing-trpc' },
          { text: 'Testing SSE APIs <span class="badge-new">New</span>', link: '/guides/testing-sse' },
          { text: 'Testing gRPC APIs', link: '/guides/testing-grpc' },
          { text: 'Using Test Data', link: '/guides/using-test-data' },
          { text: 'Using Fake Data', link: '/guides/using-fake-data' },
          { text: 'Load Testing <span class="badge-new">New</span>', link: '/guides/load-testing' },
          { text: 'Fuzz Testing', link: '/guides/fuzz-testing' },
          { text: 'CO<sub>2</sub> Testing', link: '/guides/co2-testing' },
          { text: 'Organising Workflows', link: '/guides/organising-workflows' },
          { text: 'Using as a Library', link: '/guides/using-library' },
        ]
      },
      {
        text: 'Import',
        items: [
          { text: 'OpenAPI', link: '/import/openapi' },
          { text: 'Postman', link: 'https://github.com/stepci/stepci/issues/29' },
          { text: 'Insomnia', link: 'https://github.com/stepci/stepci/issues/30' },
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Using the CLI', link: '/reference/cli' },
          { text: 'Workflow Syntax', link: '/reference/workflow-syntax' },
          { text: 'Templating', link: '/reference/templating' },
          { text: 'Matchers', link: '/reference/matchers' },
          { text: 'Reusables', link: '/reference/reusables' },
          { text: 'Examples', link: '/reference/examples' },
        ]
      },
      {
        text: 'Integration',
        items: [
          { text: 'FastAPI', link: '/integration/fastapi' },
          { text: 'Docker', link: '/integration/docker' },
          { text: 'GitHub Actions', link: '/integration/actions' },
          { text: 'GitLab CI/CD', link: '/integration/gitlab' },
          { text: 'CircleCI', link: '/integration/circle' },
          { text: 'Dagger', link: '/integration/dagger' },
          { text: 'Jenkins', link: '/integration/jenkins' },
          { text: 'Azure Pipelines', link: '/integration/azure' },
          { text: 'Google Cloud Build', link: '/integration/cloudbuild' },
          { text: 'Bitbucket Pipelines', link: '/integration/bitbucket' },
          { text: 'TeamCity', link: '/integration/teamcity' },
          { text: 'Jest', link: '/integration/jest' },
          { text: 'Ava', link: '/integration/ava' },
          { text: 'Mocha', link: '/integration/mocha' },
          { text: 'Vitest', link: '/integration/vitest' },
        ]
      },
      {
        text: 'Legal',
        items: [
          { text: 'Privacy', link: '/legal/privacy' },
        ]
      },
    ]
  }
}
