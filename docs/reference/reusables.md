# Reusables

Reusables allow you to reuse content such as schemas and credentials without repetition. Reusable content is listed under the components section of your workflow and can be called by using a reference. The `$ref` syntax should be familiar to OpenAPI users

## Reusable credentials

**Example: Basic Auth**

```yaml{3-8,17}
version: "1.1"
name: Basic Auth
components:
  credentials:
    example:
      basic:
        username: hello
        password: world
tests:
  example:
    steps:
      - name: Basic Auth
        http:
          url: https://httpbin.org/basic-auth/hello/world
          method: GET
          auth:
            $ref: "#/components/credentials/example"
```

[→ All credentials options](/reference/workflow-syntax#components-credentials)

## Reusable schemas

**Example: Post schema**

```yaml{3-20,30}
version: "1.1"
name: JSON Schema
components:
  schemas:
    Post:
      type: object
      properties:
        userId:
          type: integer
        id:
          type: integer
        title:
          type: string
        body:
          type: string
      required:
        - userId
        - id
        - title
        - body
tests:
  example:
    steps:
      - name: GET request
        http:
          url: https://jsonplaceholder.typicode.com/posts/1
          method: GET
          check:
            schema:
              $ref: "#/components/schemas/Post"
```
