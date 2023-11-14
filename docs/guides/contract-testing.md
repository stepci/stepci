# Contract Testing

**Example: Inline**

```yaml
version: "1.1"
name: Schema Testing
tests:
  example:
    steps:
      - http:
          url: https://jsonplaceholder.typicode.com/posts/1
          method: GET
          check:
            schema:
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
```

**Example: Imported from OpenAPI spec**

```yaml
version: "1.1"
name: Schema Testing
tests:
  example:
    steps:
      - http:
          url: https://jsonplaceholder.typicode.com/posts/1
          method: GET
          check:
            schema:
              $ref: "openapi.yml#/components/schemas/Post"
```
