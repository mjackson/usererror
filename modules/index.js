/**
 * An Error subclass that is better-suited for subclassing and
 * is nestable. Arguments are the error message and an optional
 * cause, which should be another error object that was responsible
 * for causing this error at some lower level.
 */
function UserError(message, cause) {
  Error.call(this)
  Error.captureStackTrace(this, this.constructor)
  this.name = this.constructor.name
  this.message = message
  this.cause = cause
}

Object.setPrototypeOf(UserError.prototype, Error.prototype)

Object.defineProperty(UserError.prototype, 'fullStack', {
  configurable: true,
  enumerable: true,
  get() {
    let stack = this.stack

    if (this.cause)
      stack += `\nCaused by ${this.cause.fullStack || this.cause.stack}`

    return stack
  }
})

export default UserError
