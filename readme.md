# Ripple.js
Proper Material Design ripple effect for the web, that would interfere your element's DOM.
 - Customization
 - Multiple ripples at once
 - Enlarges on mousedown, fades out on mouseup
 - Works with touch devices
 - Simple API

[See a Demo](https://vsevolodtrofimov.github.io/Ripple.js/docs/)

## How to get ripple

**Like vendor lib**

CSS & JS file

Check releases page

-----------

**via npm**
```bash
$ npm install proper-ripple --save-dev
```

**via yarn**
```bash
$ yarn add proper-ripple
```

Make sure to include it in your webpack (uses babel-loader with es-2015 preset & css-loader)

## Usage

Adding listener to element
```javascript
var yourElement = document.querySelector('.login-button')
var manyNodes = document.querySelectorAll('button')

ripple.bindTo(yourElement) //will trigger on your element
ripple.bindTo(manyNodes) //will trigger on any of these
```

Or watching all elements matching a selector
```javascript
//will trigger on any element mathching given selector
ripple.watch('button')
ripple.watch('#demo-2 button')
```

Unbinding
```javascript
var rippleBind = ripple.watch('#demo-2 button')
rippleBind.remove()
```

## Customization
#### Full set of props
```javascript
{
  color: "#fafafa", //{string} background color (like in CSS)
  opacity: 0.21, //{number} ripple max opacity (like in CSS)
  borderRadius: 'auto', //auto -- copy target props OR {number} in px
  borderWidth: 'auto',  //auto -- copy target props OR {number} in px
  zIndex: 999, //{number}
  transitionDuration: 500, //{number} in ms
  timingFunction: "cubic-bezier(.4,0`,.42,1)", //{string} transition timing function
  constant: false //{bool} enlarging speed is constant on any element size
}
```
#### Way A
```javascript
var rippleBind = ripple.watch('#demo-2 button')
rippleBind.factory.rippleProps = {
	opacity: 0.41,
	transitionDuration: 700,
} //it's a plain js object

rippleBind.factory.rippleProps.color = '#000'
```

#### Way B
```javascript
var myProps = {
	color: '#000',
	opacity: 0.4,
	transitionDuration: 700
}

ripple.watch('#demo-2 button', myProps)
ripple.bindTo(manyNodes, myProps)
```

#### Way C
```javascript
ripple.setDefaults({
	color: '#000',
	opacity: 0.41,
	transitionDuration: 700
})
```
