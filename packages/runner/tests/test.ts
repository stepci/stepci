import { run } from '../src/index'
import { EventEmitter } from 'node:events'

// Example workflow
const workflow = {
  version: "1.0",
  name: "Status Test",
  env: {
    host: "example.com"
  },
  components: {
    schemas: {
      "Post": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "integer",
          },
          "id": {
            "type": "integer",
          },
          "title":{
            "type": "string",
          },
          "body": {
            "type": "string",
          }
        },
        "required": ['userId', 'id', 'title', 'body']
      }
    }
  },
  tests: {
    "example": {
      "steps": [{
        "name": "GET request",
        "url": "https://jsonplaceholder.typicode.com/posts/1",
        "headers": {
          "accept": "application/json"
        },
        "method": "GET",
        "check": {
          "schema": {
             "$ref": "#/components/schemas/Post"
          }
        }
   }]
    },
    // default: {
    //   "steps": [
    //     {
    //       "name": "Captures",
    //       "id": "captures",
    //       "method": "GET",
    //       "url": "https://jsonplaceholder.typicode.com/posts/1",
    //       "capture": {
    //         "id": {
    //           "jsonpath": "$.id"
    //         }
    //       }
    //     },
    //     {
    //       "name": "Redirect",
    //       "url": "https://httpbin.org/redirect-to",
    //       "method": "GET",
    //       "params": {
    //         "url": "https://example.com",
    //       },
    //       "check": {
    //         "redirects": ['https://example.com/']
    //       }
    //     },
    //     {
    //       "name": "Cookies",
    //       "url": "https://httpbin.org/cookies",
    //       "method": "GET",
    //       "cookies": {
    //         "wows": "world"
    //       },
    //       "check": {
    //         "status": 200,
    //         "cookies": {
    //           "wows": "world",
    //         }
    //       },
    //     },
    //     {
    //       "name": "Image",
    //       "url": "https://httpbin.org/image",
    //       "headers": {
    //         "accept": "image/webp"
    //       },
    //       "method": "GET",
    //       "check": {
    //         "status": 200,
    //         "sha256": "567cfaf94ebaf279cea4eb0bc05c4655021fb4ee004aca52c096709d3ba87a63"
    //       }
    //     },
    //     {
    //       "name": "Upload",
    //       "url": "https://httpbin.org/post",
    //       "method": "POST",
    //       "formData": {
    //         "name": {
    //           "file": "README.md"
    //         }
    //       },
    //       "check": {
    //         "ok": true
    //       }
    //     },
    //     {
    //       "name": "Performance",
    //       "url": "https://jsonplaceholder.typicode.com/posts/1",
    //       "method": "GET",
    //       "check": {
    //         "performance": {
    //           "firstByte": [{
    //             "lte": 500
    //           }]
    //         }
    //       }
    //     },
    //     {
    //       "name": "SSL",
    //       "method": "GET",
    //       "url": "https://example.com",
    //       "captures": {
    //         "title": {
    //           "regex": "<title>(.*?)<\/title>"
    //         }
    //       },
    //       "check": {
    //         "ssl": {
    //           "valid": true,
    //           "signed": true,
    //           "daysUntilExpiration": [{
    //             "gte": 60
    //           }]
    //         }
    //       }
    //     }
    //   ]
    // }
  }
}

const ee = new EventEmitter()
run(workflow).then(({ result }) => console.log(result.tests[0].steps))
