# Typescript es2019 depth based url crawler

## Usage:

```js
iRequests('https://example.com', 1)
```
**Note**: For use within synchronous applications use `await` alongisde the `iRequests` function.

## Returned data format:
Data is returned within a set to reduce the overhead for duplicate url values.
```js
Set {
  'ajax.googleapis.com',
  'schema.org',
  'webschemas.org',
  'docs.google.com',
  'github.com',
  'w3.org',
  'eidr.org',
  'iana.org',
  'developer.mozilla.org'
   }
```

## Known issues:
- Some urls are returned incorrectly by the iRequests map to remove http, www and ://
- Some youtube urls are not shortened correctly.
