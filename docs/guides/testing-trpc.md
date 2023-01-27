# Testing tRPC APIs

[tRPC](https://trpc.io) is a library, that enables you to build typesafe APIs using TypeScript

Testing such APIs would involve ensuring that they function properly and that they can effectively retrieve and manipulate data using tRPC queries

This typically involves sending requests to the API and examining the responses to ensure that they are correct and meet the expectations of the developer

**Example: Greeting**

```yaml
version: "1.1"
name: tRPC
tests:
  example:
    steps:
      - name: Query
        http:
          url: http://localhost:2022/trpc
          trpc:
            query:
              greet: Mish
          check:
            status: /^20/
```

**Example: Updating a user**

```yaml
version: "1.1"
name: tRPC
tests:
  example:
    steps:
      - name: Mutation
        http:
          url: http://localhost:2022/trpc
          trpc:
            mutation:
              updateUser:
                name: Mish
          check:
            status: /^20/
```

**Example: Nested Routes**

```yaml
version: "1.1"
name: tRPC
tests:
  example:
    steps:
      - name: Query
        http:
          url: http://localhost:2022/trpc
          trpc:
            query:
              users/greet: Mish
          check:
            status: /^20/
```

**Example: Query Batching**

```yaml
version: "1.1"
name: tRPC
tests:
  example:
    steps:
      - name: Query
        http:
          url: http://localhost:2022/trpc
          trpc:
            query:
              - greet:
                  json:
                    name: Mish
              - greet:
                  json:
                    name: Mish
          check:
            status: /^20/
```

:::tip
See [Testing HTTP APIs](/guides/testing-http) for the full guide on testing HTTP-based APIs
:::
