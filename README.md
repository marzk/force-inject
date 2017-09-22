# force-inject

[![NPM version](https://img.shields.io/npm/v/force-inject.svg?style=flat)](https://npmjs.org/package/force-inject)

simple dependency inject support async, generator function.

*caveat*:
1. cant suport args with comments
2. support async only node > 7.6.0

## install

```js
npm install force-inject
```

## usage


```

import inject from 'force-inject';

const context = {
  state: {
    a: 1,
  },
};

function test(a, state) {
  console.log(a, state.a);
}

const injectTest = inject(test)(context);

console.log(injectTest(2));
// 2, 1

console.log(injectTest());
// undefined, 1


// inject function only support the parameters after invoking arguments
console.log(injectTest(2, 3));
// 2, 3

```

`test` will show more usages.
