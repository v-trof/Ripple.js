var assert = chai.assert

describe("Ripple effect", function() {
  describe("Customiztion", function() {
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

    it("Changes color", function() {
      rippleBind.factory.rippleProps.color = '#000'
      btn.dispatchEvent(mouseEvent('mousedown'))

      assert.equal(document.querySelector('.ripple__effect')
                     .style.background, 'rgb(0, 0, 0)')
    })

    it("Changes opacity", function() {
      rippleBind.factory.rippleProps.opacity = 1
      btn.dispatchEvent(mouseEvent('mousedown'))

      assert.equal(document.querySelector('.ripple__effect').style.opacity, 1)
    })

    it("Changes transitionDuration", function() {

    })

    it("Changes timingFunction", function() {
      rippleBind.factory.rippleProps.timingFunction = 'linear'
      btn.dispatchEvent(mouseEvent('mousedown'))

      assert.equal(document.querySelector('.ripple__effect')
                     .style.transitionTimingFunction, 'linear')
    })

    it("Has size-dependent duration when is not constant", function() {

    })

    it("Has fixed duration when constant", function() {

    })
  })


  describe("Actions", function() {
    it("Shows on mousedown", function() {

    })

    it("Waits for mouseup", function() {

    })

    it("Hides on mouseup", function() {

    })

    it("Waits for mouseout", function() {

    })

    it("Hides on mouseout", function() {

    })
  });
})
