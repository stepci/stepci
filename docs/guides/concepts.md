# Concepts

### Workflows

Workflows contain meta information, tests and default configuration

### Tests

Tests describe different test suites. Tests can have multiple steps. Tests are executed concurrently. Each test has a separate context, shared across steps

### Steps

Steps are the instructions to be executed by the runner. Steps contain the request parameters, captures and checks. Steps are executed in a sequence. If one step fails, all the following steps are skipped. Steps have access to shared context

### Captures

Steps can specify captures to capture data from responses into named variables that can later be used in consequent requests. Also known as "request chaining"

### Checks

Steps can include checks to validate responses

### Matchers

Matchers can be used to match values against a pre-defined set of rules

### Reusables

Reusables allow you to reuse content such as schemas and credentials without repetition
