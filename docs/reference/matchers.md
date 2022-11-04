# Using Matchers

With matchers you can validate that values match expected patterns

::: info
The syntax is inspired by MongoDB's [Comparison Query Operators](https://www.mongodb.com/docs/manual/reference/operator/query-comparison/)
:::

**Example: Time to first byte to be lower or equal 500ms**

```yaml
steps:
  - name: GET Request
    http:
      url: https://example.com
      method: GET
      check:
        performance:
          firstByte:
            - lte: 500
```

**Example: Chaining matchers**

```yaml
steps:
  - name: GET Request
    http:
      url: https://example.com
      method: GET
      check:
        performance:
          firstByte:
            - lte: 500
            - gte: 100
```

### Available Matchers

- `eq` - Equal (===)
- `ne` - Not equal (!==)
- `gt` - Greater than (>)
- `gte` - Greater than or equal (>=)
- `lt` - Lower than (<)
- `lte` - Lower than or equal (<=)
- `in` - Includes
- `nin` - Not includes
- `match` - Regex pattern

**Boolean Matchers**

- `isNumber` - Is Number
- `isString` - Is String
- `isBoolean` - Is Boolean
- `isNull` - Is Null
- `isDefined` - Is Defined
- `isObject` - Is Object
- `isArray` - Is Array
