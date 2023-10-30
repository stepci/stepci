# Testing SOAP APIs

[SOAP](https://en.wikipedia.org/wiki/SOAP) is a protocol for exchanging structured information in the implementation of web services using XML

Testing a SOAP API involves verifying its functionality, reliability, performance, and security by sending requests and assessing the responses against expected outcomes

**Example: SOAP Action**

```yaml
version: "1.1"
name: SOAP API
tests:
  example:
    steps:
      - name: POST request
        http:
          url: https://www.dataaccess.com/webservicesserver/NumberConversion.wso
          method: POST
          headers:
            Content-Type: text/xml
            SOAPAction: "#POST"
          body: >
            <?xml version="1.0" encoding="utf-8"?>
            <soap:Envelope
            xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
              <soap:Body>
                <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
                  <ubiNum>500</ubiNum>
                </NumberToWords>
              </soap:Body>
            </soap:Envelope>
          check:
            status: 200
            selectors:
              m\:numbertowordsresult: "five hundred "
```

:::tip
See [Testing HTTP APIs](/guides/testing-http) for the full guide on testing HTTP-based APIs
:::
