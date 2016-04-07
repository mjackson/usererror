import expect from 'expect'
import UserError from '../index'

describe('A UserError', () => {
  let message, error
  beforeEach(() => {
    message = 'Bang!'
    error = new UserError(message)
  })

  it('knows its name', () => {
    expect(error.name).toEqual('UserError')
  })

  it('knows its message', () => {
    expect(error.message).toEqual(message)
  })
})

describe('A UserError subclass instance', () => {
  class MyError extends UserError {
    constructor(message = 'Boom!') {
      super(message)
    }
  }

  let message, error
  beforeEach(() => {
    message = 'Boom!'
    error = new MyError(message)
  })

  it('knows its name', () => {
    expect(error.name).toEqual('MyError')
  })

  it('knows its message', () => {
    expect(error.message).toEqual(message)
  })
})
