# OAuth 2.0

OAuth is used widely for authorization in applications and websites, allowing seamless integration and secure connections between different services.

You can call an OAuth-protected endpoint by utilizing the OAuth auth type in a HTTP step.

This will execute a POST request to the given token endpoint with the given authentication data.
As some IdPs require the data to be sent in different format, you can specify the `contentType` as an option.

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
              scope: ""
              contentType: "application/json"
```
