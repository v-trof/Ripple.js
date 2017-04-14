var assert = chai.assert

describe("Ripple zone", function() {
  let rippleBind;
  let btn;

  beforeEach(function() {
    rippleBind = undefined

    btn = document.createElement('button')
    document.querySelector('#testBtns').appendChild(btn)

    rippleBind = ripple.bind_to(btn)
  })

  afterEach(function() {
    rippleBind.remove()
    btn.remove()
    document.querySelectorAll('.ripple').forEach((el) => {el.remove()})
  })

  it("Positions right above element", function() {

  })

  it("Positions right above element when page is scrolled", function() {

  })

  it("Accepts z-index", function() {
    rippleBind.factory.rippleProps.zIndex = 10
    btn.dispatchEvent(mouseEvent('mousedown'))

    assert.equal(document.querySelector('.ripple').style.zIndex, '10')
  })

  it("Changes borderWidth automatically", function() {
    rippleBind.factory.rippleProps.border = 'auto'

    btn.style.border = '20px solid #000'

    btn.dispatchEvent(mouseEvent('mousedown'))

    assert.equal(document.querySelector('.ripple').style.borderWidth, '20px')
  })

  it("Changes borderWidth manulally", function() {
    rippleBind.factory.rippleProps.borderWidth = 10
    btn.dispatchEvent(mouseEvent('mousedown'))

    assert.equal(document.querySelector('.ripple').style.borderWidth, '10px')
  })

  it("Changes borderRadius automatically", function() {
    rippleBind.factory.rippleProps.borderRadius = 'auto'

    btn.style.borderRadius = '20px'

    btn.dispatchEvent(mouseEvent('mousedown'))

    assert.equal(document.querySelector('.ripple').style.borderRadius, '20px')
  })

  it("Changes borderRadius manulally", function() {
    rippleBind.factory.rippleProps.borderRadius = 10
    btn.dispatchEvent(mouseEvent('mousedown'))

    assert.equal(document.querySelector('.ripple').style.borderRadius, '10px')
  })
})
