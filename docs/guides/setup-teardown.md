# Running setup and teardown steps

The [`before`] and [`after`] sections are optional top level sections that can be used to run steps before or after the [`tests`] section has run. These sections can be useful to set up or tear down test data.

Any variable [captured][captures] in the [`before`] section will be available in the [`tests`] and [`after`] sections. However, since variables captured in individual tests are not shared to other tests, any variable [captured][captures] in the [`tests`] section will **not** be available in the [`after`] section.

::: warning
Steps defined in [`before`] and [`after`] sections are ran as tests and will therefore be reported as such. Those steps will count in the overall results summary and any `check` failure will cause the entire run to report as failed.
:::

**Example usage**

```yaml
version: "1.1"
name: "`before` and `after` sections example"
before:
  name: Before all
  steps: []
tests:
  example1:
    name: Test 1
    steps: []
  example2:
    name: Test 2
    steps: []
after:
  name: After all
  steps: []
```

[`before`]: /reference/workflow-syntax#before
[`after`]: /reference/workflow-syntax#after
[`tests`]: /reference/workflow-syntax#tests
[captures]: /guides/concepts#captures
