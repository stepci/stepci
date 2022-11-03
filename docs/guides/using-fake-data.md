# Using Fake Data

We can utilize the [templating](/reference/templating) functionality combined with `fake` filter to replace a placeholder value with fake data

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
          url: https://en.wikipedia.org/wiki/{{ animal.cat | fake }}
          method: GET
          check:
            status: /^20/
```
