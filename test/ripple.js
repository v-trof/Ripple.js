var assert = chai.assert

describe("Ripple effect", function() {
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
    document.body.querySelectorAll('.ripple')
      .toArray().forEach(function(el) {el.remove()})
  })

  describe("Customiztion", function() {
    function createBigBtn() {
      var btn = document.createElement('button')
      btn.style.width = '400px'
      btn.style.height = '400px'

      return btn
    }

    it("Changes color", function() {
      rippleBind.factory.rippleProps.color = '#000'
      btn.dispatchEvent(mouseEvent('mousedown'))

      assert.equal(document.body.querySelector('.ripple__effect')
                     .style.background, 'rgb(0, 0, 0)')
    })

    it("Changes opacity", function() {
      rippleBind.factory.rippleProps.opacity = 1
      btn.dispatchEvent(mouseEvent('mousedown'))

      assert.equal(document.body.querySelector('.ripple__effect').style.opacity, 1)
    })

    it("Changes transitionDuration", function() {

    })

    it("Changes timingFunction", function() {
      rippleBind.factory.rippleProps.timingFunction = 'linear'
      btn.dispatchEvent(mouseEvent('mousedown'))

      assert.equal(document.body.querySelector('.ripple__effect')
                     .style.transitionTimingFunction, 'linear')
    })

    it("Has size-dependent duration when is not constant", function(done) {
      //duration inscreases with button size, so we check it for being longer
      var startTime = 0
      var expectedDuration = rippleBind.factory.rippleProps.transitionDuration + 100

      rippleBind.factory.rippleProps.constant = false

      btn.dispatchEvent(mouseEvent('mousedown'))
      btn.dispatchEvent(mouseEvent('mouseup'))

      var checkInterval = setInterval(function() {
        var states = getRipplesState()
        if(states[0] === 'shown' && ! startTime) {
          startTime = new Date()
        }

        if(states[0] === 'none') {
          var duration = Date.now() - startTime

          clearInterval(checkInterval)
          done(assert.isAtLeast(duration, expectedDuration + 10))
        }
      }, 1)
    })

    it("Has fixed duration when constant", function(done) {
      //duration inscreases with button size, so we check it for being amost equal
      var startTime = 0
      var expectedDuration = rippleBind.factory.rippleProps.transitionDuration + 100

      rippleBind.factory.rippleProps.constant = true

      btn.dispatchEvent(mouseEvent('mousedown'))
      btn.dispatchEvent(mouseEvent('mouseup'))

      var checkInterval = setInterval(function() {
        var states = getRipplesState()

        if(states[0] === 'shown' && ! startTime) {
          startTime = new Date()
        }

        if(states[0] === 'none') {
          var duration = Date.now() - startTime

          clearInterval(checkInterval)
          done(assert.closeTo(duration, 10, expectedDuration))
        }
      }, 1)
    })
  })


  describe("Actions", function() {
    it("Shows on mousedown", function(done) {
      btn.dispatchEvent(mouseEvent('mousedown'))

      setTimeout(function() {
        done(assert.equal(getRipplesState()[0], 'shown'))
      }, 10)
    })

    it("Waits for mouseup | mouseout", function(done) {
      btn.dispatchEvent(mouseEvent('mousedown'))

      setTimeout(function() {
        done(assert.equal(getRipplesState()[0], 'shown'))
      }, 300)
    })

    it("Hides on mouseup", function(done) {
      btn.dispatchEvent(mouseEvent('mousedown'))
      btn.dispatchEvent(mouseEvent('mouseup'))

      setTimeout(function() {
        done(assert.equal(getRipplesState()[0], 'hiding'))
      }, 200)
    })

    it("Hides on mouseout", function(done) {
      btn.dispatchEvent(mouseEvent('mousedown'))
      btn.dispatchEvent(mouseEvent('mouseout'))

      setTimeout(function() {
        done(assert.equal(getRipplesState()[0], 'hiding'))
      }, 200)
    })
  });
})
