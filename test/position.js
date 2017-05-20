var assert = chai.assert

describe("Ripple zone", function() {
  var rippleBind;
  var btn;

  beforeEach(function() {
    rippleBind = undefined

    btn = document.createElement('button')
    document.body.querySelector('#testBtns').appendChild(btn)

    rippleBind = ripple.bindTo(btn)
  })

  afterEach(function() {
    rippleBind.remove()
    btn.remove()
    document.body.querySelectorAll('.ripple').toArray().forEach(function(el) {el.remove()})
  })

  it("Positions right above element", function() {
    btn.dispatchEvent(mouseEvent('mousedown'))

    var btnRect = btn.getBoundingClientRect()
    var rippleRect = document.body.querySelector('.ripple').getBoundingClientRect()

    assert.equal(Math.floor(btnRect.top), Math.floor(rippleRect.top))
    assert.equal(Math.floor(btnRect.left), Math.floor(rippleRect.left))
    assert.equal(Math.floor(btnRect.width), Math.floor(rippleRect.width))
    assert.equal(Math.floor(btnRect.height), Math.floor(rippleRect.height))
  })

  it("Positions right above element when page is scrolled", function() {
    window.scrollTo(300, 300)
    btn.dispatchEvent(mouseEvent('mousedown'))

    var btnRect = btn.getBoundingClientRect()
    var rippleRect = document.body.querySelector('.ripple').getBoundingClientRect()

    assert.equal(Math.floor(btnRect.top), Math.floor(rippleRect.top))
    assert.equal(Math.floor(btnRect.left), Math.floor(rippleRect.left))
    assert.equal(Math.floor(btnRect.width), Math.floor(rippleRect.width))
    assert.equal(Math.floor(btnRect.height), Math.floor(rippleRect.height))

    window.scrollTo(0, 0)
  })

  it("Accepts z-index", function() {
    rippleBind.factory.rippleProps.zIndex = 10
    btn.dispatchEvent(mouseEvent('mousedown'))

    assert.equal(document.body.querySelector('.ripple').style.zIndex, '10')
  })

  it("Changes borderWidth automatically", function() {
    rippleBind.factory.rippleProps.border = 'auto'

    btn.style.border = '20px solid #000'

    btn.dispatchEvent(mouseEvent('mousedown'))

    if(btn.style.borderWidth) {
      assert.equal(document.body.querySelector('.ripple').style.borderWidth, '20px')
    }
  })

  it("Changes borderWidth manulally", function() {
    rippleBind.factory.rippleProps.borderWidth = '10px'
    btn.dispatchEvent(mouseEvent('mousedown'))

    assert.equal(document.body.querySelector('.ripple').style.borderWidth, '10px')
  })

  it("Changes borderRadius automatically", function() {
    rippleBind.factory.rippleProps.borderRadius = 'auto'

    btn.style.borderRadius = '5px'

    btn.dispatchEvent(mouseEvent('mousedown'))

    assert.equal(getStyle(
      document.body.querySelector('.ripple'), 'border-radius'),
      '5px 5px 5px 5px')
  })

  it("Changes borderRadius manulally", function() {
    rippleBind.factory.rippleProps.borderRadius = '10px'
    btn.dispatchEvent(mouseEvent('mousedown'))

    assert.equal(
      getStyle(document.body.querySelector('.ripple'), 'border-radius'),
      '10px 10px 10px 10px')
  })
})
