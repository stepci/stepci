# Contract Testing

OpenAPI contract testing involves validating that an API's implementation is consistent with its OpenAPI specification, which is a formal description of the API's expected behavior. This testing ensures that the API responses and requests conform to the defined schema, including endpoints, query parameters, and response formats.

It helps in identifying mismatches or deviations between the API's actual behavior and its documented contract, thus ensuring reliability and consistency in API integrations.

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
