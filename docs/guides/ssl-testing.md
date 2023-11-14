# SSL-Testing

SSL (Secure Sockets Layer) testing involves evaluating the security of a web server's SSL/TLS implementation. It includes checking for vulnerabilities, such as weak encryption algorithms and expired or invalid certificates, to ensure secure data transmission.

This testing is crucial for preventing man-in-the-middle attacks and maintaining data privacy and integrity.

```yml
version: "1.1"
name: SSL Check
tests:
  example:
    steps:
      - http:
          method: GET
          url: https://example.com
          check:
            ssl:
              valid: true
              signed: true
              daysUntilExpiration:
                - gte: 60
```
