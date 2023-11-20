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
          { text: 'Testing SOAP APIs', link: '/guides/testing-soap' },
          { text: 'Testing tRPC APIs', link: '/guides/testing-trpc' },
          { text: 'Testing ChatGPT <span class="badge-new">New</span>', link: '/guides/testing-gpt' },
          { text: 'Using Fake Data', link: '/guides/using-fake-data' },
          { text: 'Using Proxies <span class="badge-new">New</span>', link: '/guides/using-proxy' },
          { text: 'Fuzz Testing', link: '/guides/fuzz-testing' },
          { text: 'CO<sub>2</sub> Testing', link: '/guides/co2-testing' },
          { text: 'Organising Workflows', link: '/guides/organising-workflows' },
          { text: 'Using as a Library', link: '/guides/using-library' },
        ]
      },
      {
        text: 'Pro',
        items: [
          { text: 'Get The Pro Plan', link: 'https://cal.com/wissmueller/step-ci-enterprise-support' },
          { text: '<span class="badge-pro">Pro</span> Testing gRPC APIs', link: '/guides/testing-grpc' },
          { text: '<span class="badge-pro">Pro</span> Testing SSE APIs', link: '/guides/testing-sse' },
          { text: '<span class="badge-pro">Pro</span> Using Test Data', link: '/guides/using-test-data' },
          { text: '<span class="badge-pro">Pro</span> SSL-Testing', link: '/guides/ssl-testing' },
          { text: '<span class="badge-pro">Pro</span> Performance Testing', link: '/guides/performance-testing' },
          { text: '<span class="badge-pro">Pro</span> Load Testing', link: '/guides/load-testing' },
          { text: '<span class="badge-pro">Pro</span> Contract Testing', link: '/guides/contract-testing' },
          { text: '<span class="badge-pro">Pro</span> OAuth 2.0', link: '/guides/oauth' },
          { text: '<span class="badge-pro">Pro</span> Retries and Timeout', link: '/guides/retry-timeout' },
          { text: '<span class="badge-pro">Pro</span> Delays', link: '/guides/delay' },
          { text: '<span class="badge-pro">Pro</span> Coverage Report', link: '/guides/coverage' },
          { text: '<span class="badge-pro">Pro</span> Editor Integration', link: '/guides/editor-integration' },
          { text: '<span class="badge-pro">Pro</span> Plugins', link: '/guides/plugins' },
        ]
      },
      {
        text: 'Import',
        collapsed: true,
        items: [
          { text: 'OpenAPI', link: '/import/openapi' },
          { text: 'Postman', link: 'https://github.com/stepci/stepci/issues/29' },
          { text: 'Insomnia', link: 'https://github.com/stepci/stepci/issues/30' },
        ]
      },
      {
        text: 'Reference',
        collapsed: true,
        items: [
          { text: 'Using the CLI', link: '/reference/cli' },
          { text: 'Workflow Syntax', link: '/reference/workflow-syntax' },
          { text: 'Templating', link: '/reference/templating' },
          { text: 'Matchers', link: '/reference/matchers' },
          { text: 'Reusables', link: '/reference/reusables' },
          { text: 'Examples', link: 'https://github.com/stepci/stepci/blob/main/examples' },
        ]
      },
      {
        text: 'Integration',
        collapsed: true,
        items: [
          { text: 'FastAPI', link: '/integration/fastapi' },
          { text: 'Docker', link: '/integration/docker' },
          { text: 'Kubernetes', link: '/integration/k8s' },
          { text: 'GitHub Actions', link: '/integration/actions' },
          { text: 'GitLab CI/CD', link: '/integration/gitlab' },
          { text: 'CircleCI', link: '/integration/circle' },
          { text: 'Dagger', link: '/integration/dagger' },
          { text: 'Jenkins', link: '/integration/jenkins' },
          { text: 'Azure Pipelines', link: '/integration/azure' },
          { text: 'AWS CodeBuild', link: '/integration/codebuild' },
          { text: 'Google Cloud Build', link: '/integration/cloudbuild' },
          { text: 'Bitbucket Pipelines', link: '/integration/bitbucket' },
          { text: 'TeamCity', link: '/integration/teamcity' },
          { text: 'Jest', link: '/integration/jest' },
          { text: 'Ava', link: '/integration/ava' },
          { text: 'Mocha', link: '/integration/mocha' },
          { text: 'Vitest', link: '/integration/vitest' },
          { text: 'Bun', link: '/integration/bun' },
        ]
      },
      {
        text: 'Legal',
        collapsed: true,
        items: [
          { text: 'Privacy', link: '/legal/privacy' },
        ]
      },
    ]
  }
}
