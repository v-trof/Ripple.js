//helpers
function createBtn(props) {
  var btn = document.createElement("button");
  btn.innerHTML = "newBtn";

  for(var propName in props) {
    console.log('setting', propName, 'for', btn);
    btn.style[propName] = props[propName];
  }

  return btn;
}

function getFirstObjectExp(str) {
  var opened = 0,
      started = false,
      comment = false,
      obj = "";

  for(var i = 0; i < str.length; i++) {
    if(str[i] === "{") {
      opened++;
      started = true;
    }

    if(str[i] === '/' && str[i + 1] === '/') comment = true;
    if(str[i] === '\n') comment = false;

    if(opened > 0 && ! comment) obj += str[i];
    if(str[i] === "}") opened--;
    if(opened === 0 && started) break;
  }

  return JSON.parse(obj);
}

//heading
(function() {
  var rippleBind = ripple.bindTo(document.querySelector("h1"));
} ());

//demo-1
(function() {
  var buttons = document.querySelectorAll(".demo-1 button");
  ripple.bindTo(buttons);
} ());


//demo-2
(function() {
  var add_btn = document.querySelector(".demo-2 .add-btn");
  ripple.watch(".demo-2 button");

  add_btn.addEventListener("click", function() {
    var newBtn = createBtn({});

    add_btn.parentNode.appendChild(newBtn);
  });
} ());


//demo-3
(function() {
  var rippleBind = ripple.watch(".demo-3 button");
  var add_btn = document.querySelector(".demo-3 .add-btn");

  add_btn.addEventListener("click", function() {
    var code = document.querySelector(".demo-3 .code").innerText;
    var newBtn = createBtn(getFirstObjectExp(code));

    add_btn.parentNode.appendChild(newBtn);
  });
} ());

//demo-4
(function() {
  var rippleBind = ripple.watch(".demo-4 button");
  var codeBlock = document.querySelector(".demo-4 .code");

  function commitChange() {
    var code = codeBlock.innerText;
    rippleBind.factory.rippleProps = getFirstObjectExp(code);
  }

  commitChange();

  codeBlock.addEventListener("keyup", commitChange);
} ());
