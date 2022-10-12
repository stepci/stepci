# StepCI CLI reference
The following documents evety command and flag avaliable for use in StepCI's command-line interface.

With the CLI you can:
- Run workflows

Follow the [getting started guide](https://github.com/stepci/stepci/blob/main/docs/get-started.md) for setup instructions

## Synopsis
---
The `stepci` command can be called once installed and is the main command for the CLI.

The primary method to execute StepCI workflows is `stepci run [command]`

When `stepci` is called with the `--help` option a list of avaliable commands and options will be displayed:
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
---
### `run [workflow]`
The `run ` command allows you to execute a specified workflow

#### **Arguments**
| Argument | Required | Description |
|-|-|-|
| workflow | Yes | Specify the path to a stepci workflow |
<br>

#### **Options**
| Options | Required | Description |
|-|-|-|
| --help | No | Outputs the help text for `stepci run` |
| --version | No | Outputs the current stepci version |
<br>

#### **Examples**
Run test workflow to return the status of [example.com](https://example.com)
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
---
### `--help`
Outputs the help menu for the main `stepci` comamnd

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
Outputs the current version of stepci installed

#### **Examples**
```console
$ stepci --version
2.1.0
```
