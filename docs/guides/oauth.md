# OAuth 2.0

OAuth is used widely for authorization in applications and websites, allowing seamless integration and secure connections between different services.

You can call an OAuth-protected endpoint by utilizing the OAuth auth type in a HTTP step

```yaml
version: "1.1"
name: OAuth
tests:
  example:
    steps:
      - http:
          url: https://example.com/protected
          method: GET
          auth:
            oauth:
              endpoint: "https://app.auth0.com/oauth/token"
              client_id: ""
              client_secret: ""
              audience: ""
```
