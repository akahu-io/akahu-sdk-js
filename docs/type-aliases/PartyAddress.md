[**akahu v2.0.0**](../README.md) • **Docs**

***

[akahu v2.0.0](../README.md) / PartyAddress

# Type alias: PartyAddress

> **PartyAddress**: `object`

The user's address as sourced from the connected institution.

## Type declaration

### subtype

> **subtype**: `"RESIDENTIAL"` \| `"POSTAL"`

### value

> **value**: `string`

The raw address value from the connected institution.

### formatted

> **formatted**: `string`

A consistently formatted/normalised version of the address.

### components

> **components**: `object`

Individual components of the normalised address.

### components.street

> **street**: `string`

### components.suburb

> **suburb**: `string`

### components.city

> **city**: `string`

### components.region

> **region**: `string`

### components.postal\_code

> **postal\_code**: `string`

### components.country

> **country**: `string`

### google\_maps\_place\_id

> **google\_maps\_place\_id**: `string`

Google Maps API Place ID for this address.

[https://developers.google.com/maps/documentation/places/web-service/place-id](https://developers.google.com/maps/documentation/places/web-service/place-id)
