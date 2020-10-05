# oxford-dictionary-nodejs
A modern tiny nodeJS wrapper for the oxforddictionary.com V2 REST API.

# Usage
```sh
npm install oxford-dictionary-nodejs
```

```ts
import Dictionary from 'oxford-dictionary-nodejs'

const dictionary = new Dictionary({
  appId: xxxx,
  appKey: xxxx,
})

const entries = dictionary.entries('hello')
```
