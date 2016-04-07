# UserError [![Travis][build-badge]][build] [![npm package][npm-badge]][npm]

[build-badge]: https://img.shields.io/travis/mjackson/usererror/master.svg?style=flat-square
[build]: https://travis-ci.org/mjackson/usererror

[npm-badge]: https://img.shields.io/npm/v/usererror.svg?style=flat-square
[npm]: https://www.npmjs.org/package/usererror

UserError is a base class that makes JavaScript errors a lot more useful. It gives you:

  - An `Error` subclass that actually works
  - Support for checking error types using `instanceof`
  - A correct `name` property on error objects
  - Cleaner stack traces

## Installation

Using [npm](http://npmjs.org):

    $ npm install --save usererror

## Rationale

To see the problems UserError solves for you, let's try to subclass `Error` directly and see what happens.

```javascript
class MyError extends Error {
  constructor(message) {
    super(message)
  }
}

const boom = () => {
  throw new MyError('boom!')
}

try {
  boom()
} catch (error) {
  error instanceof Error    // true  (correct)
  error instanceof MyError  // false (wrong, should be true)
  error.name                // Error (wrong, should be MyError)
}
```

In this example, subclassing `Error` is useless; we can't really differentiate an instance of `MyError` from any other `Error` in the system. This inability to subclass `Error` has led to a number of other workarounds, most often adding some kind of `code` property to error objects, so you end up doing stuff like this:

```js
if (error.code === SomeErrorCode)
  // ...
```

In addition to this problem, errors created in this way include extra noise in their stack trace:

```log
Error: boom!                              << should be "MyError: boom!"
    at MyError.Error (native)             << noise
    at new MyError (test.js:3:7)          << noise
    at boom (test.js:10:9)
    at Object.<anonymous> (test.js:14:3)
```

UserError aims to fix these problems. Now, when we run the example it looks like this:

```javascript
import UserError from 'usererror'

class MyError extends UserError {
  constructor(message) {
    super(message)
  }
}

const boom = () => {
  throw new MyError('boom!')
}

try {
  boom()
} catch (error) {
  error instanceof Error    // true
  error instanceof MyError  // true
  error.name                // MyError
}
```

Since both `instanceof` work and the `name` property is setup correctly, we can do either

```js
if (error instanceof MyError)
  // ...
```

or

```js
if (error.name === 'MyError')
  // ...
```

instead of duck-typing with a custom property. Additionally, the stack trace doesn't contain unnecessary entries:

```log
MyError: boom!
    at boom (test.js:10:9)
    at Object.<anonymous> (test.js:14:3)
```
