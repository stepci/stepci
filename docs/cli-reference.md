# CLI reference

The following documents every command and flag available for use in Step CI command-line interface.

Follow the [Getting Started guide](./get-started.md) for setup instructions

## Synopsis

The `stepci` command can be called once installed and is the main command for the CLI.

The primary method to execute workflows is `stepci run [command]`

When `stepci` is called with the `--help` option, a list of avaliable commands and options will be displayed:

```console
$ stepci --help
stepci [command]

Commands:
  run [workflow]  run workflow

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  ```

## Commands

### `run [workflow]`

The `run` command lets you execute a specified workflow

#### **Arguments**

| Argument | Required | Description |
|-|-|-|
| workflow | Yes | Specify the path to a workflow |

#### **Options**

| Options | Required | Description |
|-|-|-|
| --help | No | Outputs the help text for `stepci run` |
| --version | No | Outputs the current version |
| -e [--env] | No | Supply environment variables (can be defined multiple times) |
| -s [--secret] | No | Supply secret variables (can be defined multiple times) |

#### **Examples**

Run example workflow located at `./examples/status.yml`

```console
$ stepci run ./examples/status.yml


Request

 GET  https://example.com/  200 OK

Checks

Status
✔ 200


✔ Status Check (./examples/status.yml) passed in 0.526s
```

## Options

### `--help`
Outputs the help menu for the main `stepci` command

#### **Examples**

```console
$ stepci --help
stepci [command]

Commands:
  run [workflow]  run workflow

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

### `--version`
Outputs the version currently installed

#### **Examples**

```console
$ stepci --version
2.1.0
```

## Environment Variables

### `STEPCI_DISABLE_ANALYTICS`

Anonymous usage analytics is enabled by default, use this environment variable to disable
