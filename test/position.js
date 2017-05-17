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

    assert.equal(btnRect.top, rippleRect.top)
    assert.equal(btnRect.left, rippleRect.left)
    assert.equal(btnRect.width, rippleRect.width)
    assert.equal(btnRect.height, rippleRect.height)
  })

  it("Positions right above element when page is scrolled", function() {
    window.scrollTo(300, 300)
    btn.dispatchEvent(mouseEvent('mousedown'))

    var btnRect = btn.getBoundingClientRect()
    var rippleRect = document.body.querySelector('.ripple').getBoundingClientRect()

    assert.equal(btnRect.top, rippleRect.top)
    assert.equal(btnRect.left, rippleRect.left)
    assert.equal(btnRect.width, rippleRect.width)
    assert.equal(btnRect.height, rippleRect.height)

    window.scrollTo(0, 0)
  })

  it("Accepts z-index", function() {
    rippleBind.factory.rippleProps.zIndex = 10
    btn.dispatchEvent(mouseEvent('mousedown'))

    assert.equal(document.body.querySelector('.ripple').style.zIndex, '10')
  })

  if(getStyle(document.body, 'border-width') === '') {
    console.warn('WARNING: Some styles are uncheckable in phantomjs');
  } else {
    it("Changes borderWidth automatically", function() {
      rippleBind.factory.rippleProps.border = 'auto'

      btn.style.border = '20px solid #000'

      btn.dispatchEvent(mouseEvent('mousedown'))

      if(btn.style.borderWidth) {
        assert.equal(document.body.querySelector('.ripple').style.borderWidth, '20px')
      }
    })

    it("Changes borderWidth manulally", function() {
      rippleBind.factory.rippleProps.borderWidth = 10
      btn.dispatchEvent(mouseEvent('mousedown'))

      assert.equal(document.body.querySelector('.ripple').style.borderWidth, '10px')
    })

    it("Changes borderRadius automatically", function() {
      rippleBind.factory.rippleProps.borderRadius = 'auto'

      btn.style.borderRadius = '20px'

      btn.dispatchEvent(mouseEvent('mousedown'))

      assert.equal(document.body.querySelector('.ripple').style.borderRadius, '20px')
    })

    it("Changes borderRadius manulally", function() {
      rippleBind.factory.rippleProps.borderRadius = 10
      btn.dispatchEvent(mouseEvent('mousedown'))

      assert.equal(document.body.querySelector('.ripple').style.borderRadius, '10px')
    })
  }
})
