# CO<sub>2</sub> Testing

You can now test your API carbon footprint by adding a special `co2` check

::: info
The calculation algorithm is provided by [CO2.js](https://developers.thegreenwebfoundation.org/co2js/overview/) and [Sustainable Web Design](https://sustainablewebdesign.org/calculating-digital-emissions/)
:::

**Example: Checking emissions**

```yaml
version: "1.1"
name: Emission Check
tests:
  example:
    steps:
      - name: GET request
        http:
          url: https://example.com
          method: GET
          check:
            co2:
              - lte: 0.05 # in grams
```
