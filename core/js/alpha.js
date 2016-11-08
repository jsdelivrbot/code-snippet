// Load jQuery
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://code.jquery.com/jquery-3.0.0.min.js';
var head = document.getElementsByTagName('head')[0];
head.appendChild(script);

script.onload = function() {
  var $frameset = $('frameset');

  if ($frameset.length) {
    var frames = $frameset.children('frame');
    var $fDoc = $(frames[0].contentDocument);

    $(frames[0]).attr('id', 'headerFrame');
    $(frames[1]).attr('id', 'contentFrame');

    var loader = function() {
      // add classes
      var $table = $($fDoc.find('table:first'));
      $table.addClass('title');
      var $div = $($fDoc.find('div:first'));
      $div.removeAttr('style');
      $div.addClass('header');

      // page style
      var height = $fDoc.get(0).documentElement.scrollHeight;
      $frameset.attr('rows', height + ',*');
    };

    if ($fDoc.length &&
        $fDoc.find('table').length &&
        $fDoc.find('div').length) {
      // 既にload済の場合
      setTimeout(loader, 100);
    } else {
      // まだloadが終わっていない場合
      var interval = setInterval(function() {
        $fDoc = $(frames[0].contentDocument);
        if ($fDoc.length &&
            $fDoc.find('table').length &&
            $fDoc.find('div').length) {

          clearInterval(interval);
          loader();
        }
      }, 100);
    }
    frames[1].contentWindow.onload = function() {
    }
  }
}
