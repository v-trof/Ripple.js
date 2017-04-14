/**
 * Describes default ripple properties
 * @type {Object}
 */
let defaults = {
  color: "#757575",
  opacity: 0.15,
  borderRadius: 'auto',
  borderWidth: 'auto',
  zIndex: 999,
  transitionDuration: 375,
  timingFunction: "cubic-bezier(.4,0`,.42,1)", //timing function
  constant: false // enlarging speed is constant
}

export function setDefaults(changes) {
  defaults = Object.assign(defaults, changes)
}

export function getDefaults() {
  return defaults
}
