var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://code.jquery.com/jquery-3.0.0.min.js';
var head = document.getElementsByTagName('head')[0];
console.log(head);
head.appendChild(script);

var frameset = document.getElementsByTagName('frameset')[0];

if (!!frameset) {
  var frames = frameset.getElementsByTagName('frame');

  var loader = function() {
    var fDoc = frames[0].contentDocument;
    // add classes
    var table = fDoc.getElementsByTagName('table')[0];
    table.setAttribute('class', 'title');
    var div = fDoc.getElementsByTagName('div')[0];
    div.removeAttribute('style');
    div.setAttribute('class', 'header');

    // page style
    var height = frames[0].contentDocument.documentElement.scrollHeight;
    frameset.setAttribute('rows', height + ',*');
  };

  window.headerLoad = function() {
    var interval = setInterval(function() {
      if (!!frames[0].contentDocument &&
          frames[0].contentDocument.getElementsByTagName('table').length &&
          frames[0].contentDocument.getElementsByTagName('div').length) {
        clearInterval(interval);
        loader();
      }
    }, 100);
  }
  frames[0].setAttribute('onload', 'headerLoad()');

  frames[1].contentWindow.onload = function() {

  }
}
