[**akahu v2.0.0**](../README.md) • **Docs**

***

[akahu v2.0.0](../README.md) / AkahuErrorResponse

# Class: AkahuErrorResponse

Error type for error responses received from the Akahu API.
An error response is characterised by a non 2XX status code and/or a body
payload that contains `success: false` along with an accompanying error message.

## Extends

- `AkahuError`

## Properties

### status

> **status**: `number`

The response status code.

***

### response

> **response**: `AxiosResponse`\<`any`, `any`\>

The full [AxiosReponse](https://axios-http.com/docs/res_schema)
object from axios.
