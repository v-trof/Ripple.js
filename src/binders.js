function hadlerFactory(el, rippleFactory) {
  // scoping
  return function () {
    let ripples = []
    let startTimeDate = undefined

    let startHandler = function(event, new_target) {
      let target = new_target || el
      startTimeDate = Date.now()
      ripples.push({
        effect: rippleFactory.create(),
        state: 'shown',
      })
      ripples[ripples.length - 1].effect.show(target, event)
    }

    let endHandler = function(event) {
      for(let i = 0; i < ripples.length; i++) {
        let ripple = ripples[i]
        switch(ripple.state) {
          case 'shown':
          ripple.state = 'hiding'
          ripple.effect.hide(() => {ripple.state = 'hidden'})
          case 'hidden':
          ripples.splice(i, 1)
          i--
        }
      }
    }

    // Debouncing
    let endAdapter = function(event) {
      let delta = Date.now() - startTimeDate
      if(delta <= 100) {
        setTimeout(endAdapter, 100 - delta)
      } else {
        endHandler()
      }
    }

    return {
      end: endAdapter,
      start: startHandler,
    }
  } ()
}

function bind(elements, rippleFactory) {
  let bounds = []

  elements.forEach(function(el) {
    let handle = hadlerFactory(el, rippleFactory)
    bounds.push({el, handle})

    el.addEventListener('mousedown', handle.start)

    el.addEventListener('mouseup', handle.end)
    el.addEventListener('mouseout', handle.end)
  })

  function unBind() {
    bounds.forEach(function(bound) {
      bound.el.removeEventListener('mousedown', bound.handle.start)

      bound.el.removeEventListener('mouseup', bound.handle.end)
      bound.el.removeEventListener('mouseout',bound.handle.end)
    })
  }

  return unBind
}

function watch(selector = "*", rippleFactory, scope = document) {
  let handle = hadlerFactory(scope, rippleFactory)

  let startAdapter = function(event) {
    let el = event.target

    while(el !== scope) {
      if(el.matches(selector)) {
        el.classList.add('ripple--mouseout-protected')
        handle.start(event, el)
        break
      }
      el = el.parentNode
    }
  }

  let endAdapter = function(event, handler) {
    if(event.target.matches(selector)) {
      handle.end(event, event.target)
      event.target.classList.remove('ripple--mouseout-protected')
    }
  }



  scope.addEventListener('mousedown', startAdapter)

  scope.addEventListener('mouseup', endAdapter)
  scope.addEventListener('mouseout', endAdapter)

  function unWatch() {
    scope.removeEventListener('mousedown', startAdapter)

    scope.removeEventListener('mouseup', endAdapter)
    scope.removeEventListener('mouseout', endAdapter)
  }

  return unWatch
}

let binders = {
  bind,
  watch
}


export default binders
