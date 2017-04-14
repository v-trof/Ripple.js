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

export function getStyle(el, strCssRule) {
    var strValue = ""
    if (document.defaultView && document.defaultView.getComputedStyle) {
      strValue = document.defaultView.getComputedStyle(el, null).getPropertyValue(strCssRule)
    } else if(el.currentStyle) {
      strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1) {
        return p1.toUpperCase()
      })
      strValue = el.currentStyle[strCssRule]
    }
    return strValue
}
