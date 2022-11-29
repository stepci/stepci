# Testing GraphQL APIs

[GraphQL](https://graphql.org) is a query language for APIs and a runtime for fulfilling those queries with your existing data

We have added useful helpers to reduce the burden for testing GraphQL-powered APIs with our tool

**Example: GraphQL Query**

```yaml
version: "1.1"
name: GraphQL
tests:
  example:
    steps:
      - name: Request
        http:
          url: https://echo.hoppscotch.io/graphql
          graphql:
            query: |
              query Request {
                method
              }
            variables:
              id: 1
          check:
            status: 200
            jsonpath:
              $.data.method: POST
```

:::info
See [Workflow Syntax Reference](/reference/workflow-syntax#tests-test-steps-step-http-graphql) for more request options
:::
