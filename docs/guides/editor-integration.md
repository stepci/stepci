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
    "https://raw.githubusercontent.com/stepci/stepci/refs/heads/main/schemas/workflow.schema.json": ["*.stepci.yml"],
    "https://raw.githubusercontent.com/stepci/stepci/refs/heads/main/schemas/test.schema.json": ["*.stepci-test.yml"],
    "https://raw.githubusercontent.com/stepci/stepci/refs/heads/main/schemas/step.schema.json": ["*.stepci-step.yml"]
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
        "*.stepci.json"
      ],
      "url": "https://raw.githubusercontent.com/stepci/stepci/refs/heads/main/schemas/workflow.schema.json"
    },
    {
      "fileMatch": [
        "*.stepci-test.yml"
      ],
      "url": "https://raw.githubusercontent.com/stepci/stepci/refs/heads/main/schemas/test.schema.json"
    },
    {
      "fileMatch": [
        "*.stepci-step.yml"
      ],
      "url": "https://raw.githubusercontent.com/stepci/stepci/refs/heads/main/schemas/step.schema.json"
    }
  ]
}
```

After that you should be able to see completions for **JSON files** ending with `.stepci.json`

## Individual Schema Files

StepCI provides separate schema files for workflows, tests, and steps in the `/schemas/` directory. These enable more precise validation and better editor support for modular test structures.

### Available Schemas

- **`suite.schema.json`** - For workflow/suite files
- **`test.schema.json`** - For test files
- **`step.schema.json`** - For step files

### VSCode Configuration

Configure schema mappings based on your file organization:

**Using file patterns:**

```json
{
  "yaml.schemas": {
    "https://raw.githubusercontent.com/stepci/stepci/refs/heads/main/schemas/suite.schema.json": ["*.stepci.yml"],
    "https://raw.githubusercontent.com/stepci/stepci/refs/heads/main/schemas/test.schema.json": ["**/*.stepci-test.yml"],
    "https://raw.githubusercontent.com/stepci/stepci/refs/heads/main/schemas/step.schema.json": ["**/*.stepci-step.yml"]
  }
}
```

**Using inline directives:**

You can also add schema directives directly in your YAML files:

```yaml
# yaml-language-server: $schema=https://raw.githubusercontent.com/stepci/stepci/refs/heads/main/schemas/suite.schema.json
version: "1.1"
name: "My Workflow"
```

```yaml
# yaml-language-server: $schema=https://raw.githubusercontent.com/stepci/stepci/refs/heads/main/schemas/test.schema.json
name: "My Test"
steps:
  - name: Test step
```

```yaml
# yaml-language-server: $schema=https://raw.githubusercontent.com/stepci/stepci/refs/heads/main/schemas/step.schema.json
name: "My Step"
http:
  url: https://example.com
```

### Schema Comparison

**Main `schema.json`:**
- Complete, all-in-one schema
- Best for simple projects with single workflow files
- Hosted on GitHub for easy remote reference
- Use with `.stepci.yml` or `.stepci.json` extensions

**Individual schemas (`/schemas/*.json`):**
- Modular schemas for each level (workflow/test/step)
- Best for multi-file, organized projects
- More precise validation based on file type
- Better editor support when files are separated
- Can be used with custom file extensions and patterns

### Benefits of Individual Schemas

1. **Precise validation** - Only validates relevant properties for each file type
2. **Better autocomplete** - Editor suggests only applicable fields
3. **Clearer errors** - Validation errors are more specific
4. **File organization** - Supports structured project layouts
5. **Independent validation** - Validate workflows, tests, and steps separately

### Example: Multi-File Project Setup

For a project structure like:
```
my-api-tests/
├── api-tests.stepci.yml
├── tests/
│   ├── auth.stepci-test.yml
│   └── users.stepci-test.yml
└── steps/
    ├── login.stepci-step.yml
    └── logout.stepci-step.yml
```

Use this VSCode configuration:
```json
{
  "yaml.schemas": {
    "./schemas/suite.schema.json": "*.stepci.yml",
    "./schemas/test.schema.json": "**/*.stepci-test.yml",
    "./schemas/step.schema.json": "**/*.stepci-step.yml"
  }
}
```

Or add directives to each file:
```yaml
# api-tests.stepci.yml
# yaml-language-server: $schema=./schemas/suite.schema.json

# tests/auth.stepci-test.yml
# yaml-language-server: $schema=../schemas/test.schema.json

# steps/login.stepci-step.yml
# yaml-language-server: $schema=../schemas/step.schema.json
```

## Additional Resources

- [Schemas Reference](../reference/schemas.md) - Detailed schema documentation
- [Architecture](./architecture.md) - Understanding workflow/test/step hierarchy
- [Organising Workflows](./organising-workflows.md) - File organization patterns
