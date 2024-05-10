# xpath

get xpath expression of html DOM node in browser.

support `Element` and `Text` node type.

## install 

```
npm install -P dom2xpath
```

## usage

```typescript
import getXPath from 'dom2xpath'

console.log(getXPath(document.querySelector('body')))
// '/html/body'

console.log(getXPath(document.querySelector('#target')))
// '//*[@id="target"]'

console.log(getXPath(document.querySelector('p').firstChild))
// '/html/body/p/text()[1]'
```