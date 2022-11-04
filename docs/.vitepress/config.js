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
      { icon: 'github', link: 'https://github.com/stepci/stepci' },
      { icon: 'twitter', link: 'https://twitter.com/ci_step' }
    ],
    logo: 'https://stepci.com/logo.svg',
    nav: [
      { text: 'Home', link: 'https://stepci.com' },
      { text: 'Playground', link: 'https://stepci.com' },
    ],
    editLink: {
      pattern: 'https://github.com/stepci/stepci/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    sidebar: [
      {
        text: 'Guides',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Getting Started', link: '/guides/getting-started' },
          { text: 'Concepts', link: '/guides/concepts' },
          { text: 'Testing HTTP', link: '/guides/testing-http' },
          { text: 'Testing gRPC', link: '/guides/testing-grpc' },
          { text: 'Using Test Data', link: '/guides/using-test-data' },
          { text: 'Using Fake Data', link: '/guides/using-fake-data' },
          { text: 'Fuzz Testing', link: '/guides/fuzz-testing' },
          { text: 'CO<sub>2</sub> Testing', link: '/guides/co2-testing' },
          { text: 'Importing from OpenAPI', link: '/guides/openapi' },
          { text: 'Using as a library', link: '/guides/using-library' },
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Using the CLI', link: '/reference/cli' },
          { text: 'Workflow Syntax', link: '/reference/workflow-syntax' },
          { text: 'Using Matchers', link: '/reference/matchers' },
          { text: 'Templating', link: '/reference/templating' },
          { text: 'Examples', link: '/reference/examples' }
        ]
      },
      {
        text: 'Integrations',
        items: [
          { text: 'Docker', link: '/integrations/docker' },
          { text: 'GitHub Actions', link: '/integrations/actions' },
          { text: 'GitLab CI/CD', link: '/integrations/gitlab' },
          { text: 'CircleCI', link: '/integrations/circle' },
          { text: 'Azure Pipelines', link: '/integrations/azure' },
          { text: 'Google Cloud Build', link: '/integrations/cloudbuild' },
          { text: 'Bitbucket Pipelines', link: '/integrations/bitbucket' },
          { text: 'TeamCity', link: '/integrations/teamcity' },
          { text: 'Jest', link: '/integrations/jest' },
          { text: 'Ava', link: '/integrations/ava' },
          { text: 'Mocha', link: '/integrations/mocha' },
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
