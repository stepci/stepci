# Fuzz Testing

You can utilise the [templating](/reference/templating) functionality combined with `naughtystring` filter to replace a placeholder value with a "naughty" string

::: info
The values are provided by [Big List of Naughty Strings](https://github.com/minimaxir/big-list-of-naughty-strings)
:::

**Example: Fuzz-Testing a form**

```yaml
version: "1.1"
name: Form Submission
tests:
  example:
    steps:
      - name: Submit a form
        http:
          url: https://httpbin.org/post
          method: POST
          formData:
            email: {{ | naughtystring }}
          check:
            status: 200
```
