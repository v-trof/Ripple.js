import binders from './binders'
import {setDefaults} from './defaults'
import {Ripple, RippleFactory} from './ripple'

/**
 * will automatically call ripple on given elemets
 * @param  {Element[]} elements elements to call ripple on
 * @param  {Object} options any modification of default for these ripples
 * @return {RippleFactory} generates ripple effects for your elem`ets
 */
function bindTo(elements, options) {
  if(elements instanceof NodeList) {
    let old = elements
    elements = []
    for(let i = 0; i < old.length; i++) elements.push(old[i])
  }

  if(elements instanceof Node) {
    elements = [elements]
  }

  let factory = new RippleFactory(options)
  let unBind = binders.bind(elements, factory)

  return {
    factory,
    remove: unBind
  }
}

/**
 * will automatically call ripple on any node matching selector in scope
 * @param  {String} selector css selector for Elements to call ripple on
 * @param  {Object} options any modification of default for these ripples
 * @param  {Element} scope can be used for optimization, default is {Document}
 * @return {RippleFactory} generates ripple effects for your elemets
 */
function watch(selector, options, scope) {
  let factory = new RippleFactory(options)
  let unWatch = binders.watch(selector, factory, scope)

  return {
    factory,
    remove: unWatch
  }
}

exports.bindTo = bindTo
exports.watch = watch
exports.setDefaults = setDefaults
