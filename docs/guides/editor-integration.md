# Editor Integration

You can optionally add Step CI IntelliSense completions to VSCode (and others) by adding the following to your `settings.json`:

**YAML Completions**

:::tip
Note: VS Code users may require to install Red Hat's [YAML extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)
:::

```json
{
  "yaml.completion": true,
  "yaml.schemas": {
    "https://raw.githubusercontent.com/stepci/stepci/main/schema.json": "*.stepci.yml"
  }
}
```

After that you should be able to see completions for **YAML files** ending with `.stepci.yml`

**JSON Completions**

```json
{
  "json.validate.enable": true,
  "json.schemas": [
    {
      "fileMatch": [
        "/*.stepci.json"
      ],
      "url": "https://raw.githubusercontent.com/stepci/stepci/main/schema.json"
    }
  ]
}
```

After that you should be able to see completions for **JSON files** ending with `.stepci.json`
