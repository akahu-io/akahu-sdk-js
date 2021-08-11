[akahu - v0.0.1](../README.md) / AkahuErrorResponse

# Class: AkahuErrorResponse

Error type for error responses received from the Akahu API.
An error response is characterised by a non 2XX status code and/or a body
payload that contains `success: false` along with an accompanying error message.

## Hierarchy

- `AkahuError`

  ↳ **`AkahuErrorResponse`**

## Table of contents

### Constructors

- [constructor](AkahuErrorResponse.md#constructor)

### Properties

- [status](AkahuErrorResponse.md#status)
- [response](AkahuErrorResponse.md#response)

## Constructors

### constructor

• **new AkahuErrorResponse**(`response`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | `AxiosResponse`<`any`\> |

#### Overrides

AkahuError.constructor

## Properties

### status

• **status**: `number`

The response status code.

___

### response

• **response**: `AxiosResponse`<`any`\>

The full [AxiosReponse](https://axios-http.com/docs/res_schema)
object from axios.
