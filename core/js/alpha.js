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