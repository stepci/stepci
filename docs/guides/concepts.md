# Concepts

### Workflows

Workflows contain meta information, tests and configuration

### Tests

Tests describe different test suites. Tests can have multiple steps. Tests are executed concurrently. Each test has a separate context, shared accross steps

### Steps

Steps are the instructions to be executed by the runner. Steps contain the request parameters and assertions. Steps are executed in a sequence. If one step fails, all the following steps are skipped. Steps have access to shared context

### Checks

Steps can have many different checks to validate responses

### Captures

Steps can capture data from responses into named variables

### Conditions

Steps can be skipped if a condition is not met

### Matchers

Matchers can match values against a pre-defined set of rules
