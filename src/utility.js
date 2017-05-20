window.Element && function(ElementPrototype) {
  ElementPrototype.matches = ElementPrototype.matches ||
  ElementPrototype.matchesSelector ||
  ElementPrototype.webkitMatchesSelector ||
  ElementPrototype.msMatchesSelector ||
  function(selector) {
    var node = this, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1;
    while (nodes[++i] && nodes[i] != node);
    return !!nodes[i];
  }
}(Element.prototype);

// Create remove function if not exist (IE 10)
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

function mapToShorthand(styles, sides, type) {
      var strValue = ""
      sides.forEach((side, i) => {
          strValue += styles.getPropertyValue('border-' + side + '-' + type)
          if(i < 3) strValue += ' '
      })

      return strValue;
}

export function getStyle(el, strCssRule) {
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

export function parseShorthand(prop) {
  let chunks = prop.split(' ')
  switch(chunks.length) {
    case 1:
      let intval = parseInt(prop, 10)
      return {val: prop, top: intval, left: intval, right: intval, bottom: intval}
    case 2:
      let vertIntval = parseInt(chunks[0], 10)
      let horizIntval = parseInt(chunks[1], 10)
      return {val: prop, top: vertIntval, left: horizIntval, right: horizIntval, bottom: vertIntval}
    //I hope nobody would use 3-side shortand
    case 4:
      var propObj = {val: prop};
      ['top', 'right', 'bottom', 'left'].forEach((side, i) => {
        let intValue = parseInt(chunks[i], 10)
        propObj[side] = intValue
      })
      return propObj
    default:
      return {val: '', top: 0, left: 0, right: 0, bottom: 0}
  }
}
