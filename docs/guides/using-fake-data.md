# Using Fake Data

Fake data is commonly used in software development to test the functionality of an API without relying on real data.

By using fake data, developers can ensure that their code is working properly and can also avoid using sensitive or confidential data in their tests.

Using fake data can also help to speed up the testing process and make it easier to create a wide range of test scenarios.

You can utilise the [templating](/reference/templating) functionality combined with `fake` filter to replace a placeholder value with fake data

::: info
The fake data is provided by Faker. Instruct [Faker docs](https://fakerjs.dev/api/) to learn more
:::

**Example: Cats on Wikipedia**

```yaml
version: "1.1"
name: Fake Data
tests:
  example:
    steps:
      - name: GET request
        http:
          url: https://en.wikipedia.org/wiki/${{ animal.cat | fake }}
          method: GET
          check:
            status: /^20/
```
