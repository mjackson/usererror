import expect from 'expect'
import UserError from '../index'

describe('A UserError', () => {
  describe('without a cause', () => {
    let message, err
    beforeEach(() => {
      message = 'Bang!'
      err = new UserError(message)
    })

    it('knows its name', () => {
      expect(err.name).toEqual('UserError')
    })

    it('knows its message', () => {
      expect(err.message).toEqual(message)
    })

    it('does not have a cause', () => {
      expect(err.cause).toNotExist()
    })

    it('has a fullStack property', () => {
      expect(typeof err.fullStack).toEqual('string')
    })
  })

  describe('with a cause', () => {
    let cause, message, err
    beforeEach(() => {
      cause = new UserError
      message = 'Another bang!'
      err = new UserError(message, cause)
    })

    it('knows its name', () => {
      expect(err.name).toEqual('UserError')
    })

    it('knows its message', () => {
      expect(err.message).toEqual(message)
    })

    it('has a cause', () => {
      expect(err.cause).toExist()
    })

    it('has a fullStack property', () => {
      expect(typeof err.fullStack).toEqual('string')
    })
  })
})

describe('A UserError subclass instance', () => {
  function MyError(message, cause) {
    message = message || 'Boom!'
    UserError.call(this, message, cause)
  }

  Object.setPrototypeOf(MyError.prototype, UserError.prototype)

  describe('without a cause', () => {
    let message, err
    beforeEach(() => {
      message = 'Boom!'
      err = new MyError(message)
    })

    it('knows its name', () => {
      expect(err.name).toEqual('MyError')
    })

    it('knows its message', () => {
      expect(err.message).toEqual(message)
    })

    it('does not have a cause', () => {
      expect(err.cause).toNotExist()
    })

    it('has a fullStack property', () => {
      expect(typeof err.fullStack).toEqual('string')
    })
  })

  describe('with a cause', () => {
    let cause, message, err
    beforeEach(() => {
      cause = new UserError
      message = 'Another boom!'
      err = new MyError(message, cause)
    })

    it('knows its name', () => {
      expect(err.name).toEqual('MyError')
    })

    it('knows its message', () => {
      expect(err.message).toEqual(message)
    })

    it('has a cause', () => {
      expect(err.cause).toExist()
    })

    it('has a fullStack property', () => {
      expect(typeof err.fullStack).toEqual('string')
    })
  })
})
