# Importing from OpenAPI

::: warning
Only OpenAPI 3.0 and higher is supported. Prepare your OpenAPI spec before running the command. Add request and response examples, default values and specify required params
:::

Our first-class OpenAPI integration lets you generate tests from your API spec on the fly

**Example: Swagger Petstore 3.0**

```
stepci generate https://petstore3.swagger.io/api/v3/openapi.json
```

Result:

```
Success! The workflow file can be found at ./workflow.yml
```

::: info
Configuration options for `stepci generate` command can be found in the [CLI Reference](/reference/cli#stepci-generate-spec-path)
:::
