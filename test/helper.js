function mouseEvent(type, sx, sy, cx, cy) {
  var evt;
  var e = {
    bubbles: true,
    cancelable: (type != "mousemove"),
    view: window,
    detail: 0,
    screenX: sx,
    screenY: sy,
    clientX: cx,
    clientY: cy,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    button: 0,
    relatedTarget: undefined
  };
  if (typeof( document.createEvent ) == "function") {
    evt = document.createEvent("MouseEvents");
    evt.initMouseEvent(type,
      e.bubbles, e.cancelable, e.view, e.detail,
      e.screenX, e.screenY, e.clientX, e.clientY,
      e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
      e.button, document.body.parentNode);
  } else if (document.createEventObject) {
    evt = document.createEventObject();
    for (prop in e) {
    evt[prop] = e[prop];
  }
    evt.button = { 0:1, 1:4, 2:2 }[evt.button] || evt.button;
  }
  return evt;
}

function dispatchEvent (el, evt) {
  if (el.dispatchEvent) {
    el.dispatchEvent(evt);
  } else if (el.fireEvent) {
    el.fireEvent('on' + type, evt);
  }
  return evt;
}

function getRipplesState() {
  var ripples = document.body.querySelectorAll('.ripple__effect').toArray()

  if(ripples.length === 0) return ['none']

  var states = ripples.map(function (currRipple) {
    if(currRipple.classList.contains('ripple__effect--hidden')) return 'hidden'
    if(currRipple.classList.contains('ripple__effect--hide')) return 'hiding'

    return 'shown'
  })

  return states
}


// Fix for old browsers & phantomjs
NodeList.prototype.toArray = function () {
  return Array.prototype.slice.call(this)
}

// getStyle
function mapToShorthand(styles, sides, type) {
      var strValue = ""
      sides.forEach(function(side, i) {
          strValue += styles.getPropertyValue('border-' + side + '-' + type)
          if(i < 3) strValue += ' '
      })

      return strValue;
}

function getStyle(el, strCssRule) {
    var styles = window.getComputedStyle(el, null)

    if(strCssRule === 'border-width') {
      return mapToShorthand(styles, ['top', 'right', 'bottom', 'left'], 'width');
    } else if (strCssRule === 'border-radius') {
      return mapToShorthand(styles,
                            ['top-left', 'top-right', 'bottom-right', 'bottom-left'], 'radius');
    } else {
      return styles.getPropertyValue(strCssRule)
    }
}
