var assert = chai.assert

describe("API", function() {

  let rippleBind;

  beforeEach(function() {
    rippleBind = undefined
  })

  afterEach(function() {
    rippleBind.remove()
    ripple.setDefaults({color: '#757575', opacity: '0.15'})
  })

  it("Returns ripple_factory", function() {
    rippleBind = ripple.bind_to(document.querySelectorAll('#testBtns button'))
    assert.isOk(rippleBind.factory)
    assert.isObject(rippleBind.factory)
    assert.isObject(rippleBind.factory.rippleProps)
  })

  it("Accepts ripple_factory changes", function() {
    rippleBind = ripple.bind_to(document.querySelectorAll('#testBtns button'))

    rippleBind.factory.rippleProps.color = '#fafafa'

    assert.equal(rippleBind.factory.create().props.color, '#fafafa')
  })

  it("Only modifies 1 instance", function() {
    rippleBind = ripple.bind_to(document.querySelector('#testBtns button'))
    let rippleBind2 = ripple.bind_to(document.querySelectorAll('#testBtns button')[1])

    rippleBind.factory.rippleProps.color = '#fff'
    rippleBind2.factory.rippleProps.color = '#000'

    assert.notEqual(
      rippleBind.factory,
      rippleBind2.factory)
    assert.notEqual(
      rippleBind.factory.rippleProps,
      rippleBind2.factory.rippleProps)

    assert.equal(rippleBind.factory.create().props.color, '#fff')
    assert.equal(rippleBind2.factory.create().props.color, '#000')

    rippleBind2.remove()
  })

  it("Accepts defaults change", function() {
    ripple.setDefaults({opacity: '1'})
    rippleBind = ripple.bind_to(document.querySelector('#testBtns button'))

    assert.equal(rippleBind.factory.create().props.opacity, '1')
  })
})
