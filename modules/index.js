function UserError(message) {
  Error.call(this)

  if (Error.captureStackTrace)
    Error.captureStackTrace(this, this.constructor)

  this.name = this.constructor.name
  this.message = message
}

UserError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: UserError,
    configurable: true,
    enumerable: false,
    writable: true
  }
})

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(UserError, Error)
} else {
  UserError.__proto__ = Error
}

export default UserError
