# Performance Testing

API Performance Testing, such as measuring the Time to First Byte (TTFB), is a performance evaluation to determine how quickly a server sends the first byte of data after a request is made.

This testing is crucial for understanding the latency in server response, including network and server processing delays. It's an important metric for assessing the overall responsiveness and user experience, as faster response times typically lead to better user satisfaction.

```yaml
version: "1.1"
name: Performance Check
tests:
  example:
    steps:
      - http:
          url: https://example.com
          method: GET
          check:
            performance:
              firstByte:
                - lte: 200
              total:
                - lte: 500
```
