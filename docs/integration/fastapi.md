# Integrating with FastAPI

[FastAPI](https://fastapi.tiangolo.com/) is a web framework for building APIs (application programming interfaces) that is known for its speed and ease of use

Generate ready-to-use workflows from FastAPI-powered OpenAPI spec

**Example: FastAPI**

```
stepci generate http://127.0.0.1:8000/docs/openapi.json
```

Result:

```
Success! The workflow file can be found at ./workflow.yml
```

::: info
Configuration options for `stepci generate` command can be found in the [CLI Reference](/reference/cli#generate-spec-path)
:::
