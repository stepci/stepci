# Testing GraphQL APIs

[GraphQL](https://graphql.org) is a query language used to access and manipulate data in APIs

Testing such APIs would involve ensuring that they function properly and that they can effectively retrieve and manipulate data using GraphQL queries

This typically involves sending requests to the API and examining the responses to ensure that they are correct and meet the expectations of the developer

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

:::tip
See [Testing HTTP APIs](/guides/testing-http) for the full guide on testing HTTP-based APIs
:::
