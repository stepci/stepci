# Using the CLI

The following documents every command and flag available for use in Step CI command-line interface.

::: info
The CLI collects anonymous usage data. You can disable this by setting `STEPCI_DISABLE_ANALYTICS` environment variable
:::

## Synopsis

The `stepci` command can be called once installed and is the main command for the CLI.

The primary method to execute workflows is `stepci run [command]`

When `stepci` is called with the `--help` option, a list of avaliable commands and options will be displayed:

```
stepci [command]

Commands:
  stepci run [workflow]          run workflow
  stepci generate [spec] [path]  generate workflow from OpenAPI spec

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

## Commands

### `init [path]`

The `init` command lets you init a new workflow

#### **Arguments**

| Argument | Required | Description |
|-|-|-|
| path | No | Specify the path to a workflow |

#### **Examples**

Initialise a workflow

```
stepci init
```

```
Success! The workflow file can be found at workflow.yml
Enter npx stepci run workflow.yml to run it
```

### `run [workflow]`

The `run` command lets you run a specified workflow

#### **Arguments**

| Argument | Required | Description |
|-|-|-|
| workflow | Yes | Specify the path to a workflow |

#### **Options**

| Option | Required | Description |
|-|-|-|
| --env [-e] | No | Supply environment variables (can be defined multiple times) |
| --secret [-s] | No | Supply secret variables (can be defined multiple times) |
| --verbose [-v] | No | Verbose mode: always show request/response |
| --loadtest [-load] | No | Run test in load-testing mode |
| --concurrency | No | Concurrency setting |

#### **Examples**

Run example workflow located at `examples/status.yml`

```
stepci run examples/status.yml
```

```
 PASS  example

Tests: 0 failed, 1 passed, 1 total
Steps: 0 failed, 1 passed, 1 total
Time:  0.524s, estimated 1s

Workflow passed after 0.524s
```

### `generate [spec] [path]`

Generate workflow from OpenAPI spec. The generator will use default and example values defined in your spec, when not specified, placeholder values will be generated according to your schema

::: warning
Only OpenAPI 3.0 and higher is supported. Prepare your OpenAPI spec before running the command. Add request and response examples, default values and specify required params
:::

#### **Arguments**

| Argument | Required | Default | Description |
|-|-|-|-|
| spec | No | `openapi.json` | OpenAPI file path |
| path | No | `workflow.yml` | Output file path |

#### **Options**

| Option | Required | Default | Description |
|-|-|-|-|
| generatePathParams | No | `true` | Generate path params |
| generateOptionalParams | No | `true` | Generate optional params |
| generateRequestBody | No | `true` | Generate request body |
| useExampleValues | No | `true` | Use example values |
| useDefaultValues | No | `true` | Use default values |
| checkStatus | No | `true` | Check response status |
| checkExamples | No | `true` | Check response examples |
| checkSchema | No | `true` | Check response schema |
| contentType | No | `application/json` | Specify content-type |

#### **Examples**

Generate a workflow from Swagger Petstore 3.0

```
stepci generate https://petstore3.swagger.io/api/v3/openapi.json
```

```
Success! The workflow file can be found at ./workflow.yml
```

## Options

### `--help`

Outputs the help menu for the main `stepci` command

#### **Examples**

```
stepci --help
```

```
stepci [command]

Commands:
  stepci run [workflow]          run workflow
  stepci generate [spec] [path]  generate workflow from OpenAPI spec

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

### `--version`

Outputs the version currently installed

#### **Examples**

```
stepci --version
```

```
2.1.0
```

## Environment Variables

### `STEPCI_DISABLE_ANALYTICS`

Set this environment variable to disable anonymous usage data collection
