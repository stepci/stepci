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
          { text: 'Load Testing <span class="badge-new">New</span>', link: '/guides/load-testing' },
          { text: 'Fuzz Testing', link: '/guides/fuzz-testing' },
          { text: 'CO<sub>2</sub> Testing <span class="badge-new">New</span>', link: '/guides/co2-testing' },
          { text: 'Organising Tests', link: '/guides/organising-tests' },
          { text: 'Using as a Library', link: '/guides/using-library' },
        ]
      },
      {
        text: 'Import',
        items: [
          { text: 'OpenAPI', link: '/import/openapi' },
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Using the CLI', link: '/reference/cli' },
          { text: 'Workflow Syntax', link: '/reference/workflow-syntax' },
          { text: 'Using Matchers', link: '/reference/matchers' },
          { text: 'Templating', link: '/reference/templating' },
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
          { text: 'Jenkins', link: '/integration/jenkins' },
          { text: 'Azure Pipelines', link: '/integration/azure' },
          { text: 'Google Cloud Build', link: '/integration/cloudbuild' },
          { text: 'Bitbucket Pipelines', link: '/integration/bitbucket' },
          { text: 'TeamCity', link: '/integration/teamcity' },
          { text: 'Jest', link: '/integration/jest' },
          { text: 'Ava', link: '/integration/ava' },
          { text: 'Mocha', link: '/integration/mocha' },
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
