const displayId = $('#imbox').data('display_id');
const targets = ['DISPLAY_MYBOX', 'DISPLAY_DIRECTMESSAGEBOX', 'DISPLAY_APPLICATIONBOX', 'DISPLAY_COMPANYBOX', 'DISPLAY_USER_MESSAGE'];

if (targets.indexOf(displayId) != -1) {

  const noticesBoxStyle = [
    '.notices-box {',
    '  cursor: move;',
    '  background: white;',
    '  position: fixed;',
    '  width: 500px;',
    '  height: 350px;',
    '  z-index: 20000000;',
    '  border: 1px solid gray;',
    '  overflow: hidden;',
    '  border-radius: 4px;',
    '  box-shadow: 1px 1px 1px rgba(0, 0, 0, .5);',
    '}',
    '.notices-box-label {',
    '  color: rgba(255,255,255,.8);',
    '  font-weight: bold;',
    '  padding: .6rem 1rem;',
    '  font-size: 1.5rem;',
    '  display: block;',
    '  cursor: move;',
    '}',
    '.notices-tool-box {',
    '  position: absolute;',
    '  top: 1px;',
    '  right: 5px;',
    '}',
    '.notices-tool-icon {',
    '  display: inline-block;',
    '  padding: 2px;',
    '  border-radius: 4px;',
    '  background-position: center;',
    '  background-repeat: no-repeat;',
    '  background-size: 24px;',
    '  width: 24px;',
    '  height: 24px;',
    '  cursor: pointer;',
    '  margin-left: 5px;',
    '}',
    '#notices-reload {',
    '  background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgMjY5LjI4MyAyNjkuMjgzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNjkuMjgzIDI2OS4yODM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMjY4LjM1NCw5MS44NjZjLTEuNzQxLTYuMDE3LTUuNzExLTEwLjk3MS0xMS4xODEtMTQuMDAzYy0zLjQ1My0xLjkwMS03LjM1MS0yLjkwNy0xMS4yODktMi45MDcgICBjLTQuOTM3LDAtOS42NDUsMS41NTUtMTMuNTQ3LDQuMzA5Yy0yMC42NS00MC45NzctNjIuNjM3LTY3LjQxNi0xMDkuNTUyLTY3LjQxNkM1NS4wODIsMTEuODQ5LDAsNjYuOTMxLDAsMTM0LjYzNSAgIGMwLDY3LjcxMSw1NS4wODIsMTIyLjc5OSwxMjIuNzg2LDEyMi43OTljMTIuOTA3LDAsMjMuNDA2LTEwLjUwOSwyMy40MDYtMjMuNDE5cy0xMC40OTktMjMuNDA3LTIzLjQwNi0yMy40MDcgICBjLTQxLjg4NywwLTc1Ljk2NC0zNC4wODMtNzUuOTY0LTc1Ljk3M2MwLTQxLjg4NiwzNC4wODMtNzUuOTYzLDc1Ljk2NC03NS45NjNjMjUuMjc0LDAsNDguNDI5LDEyLjYwNiw2Mi4zOSwzMi43NjIgICBjLTYuNDQ5LDEuNDU5LTEyLjA4Miw1LjYwOC0xNS4zNDgsMTEuNTI5Yy0zLjAxNSw1LjQ3OS0zLjcxOCwxMS44LTEuOTgyLDE3LjgwOHM1LjcwNSwxMC45NzEsMTEuMTgyLDEzLjk5NGwyMy45NjUsMTMuMjI2ICAgYzQuMzM2LDYuMjY5LDExLjQwMywxMC4wNTIsMTkuMTc0LDEwLjA1MmMxLjY2OSwwLDMuMzU2LTAuMTkyLDUuMTA5LTAuNjE4YzguMDg5LTAuMzkxLDE1LjQ2My00LjkzNywxOS4zOS0xMi4wN2wxOS42OTUtMzUuNjgzICAgQzI2OS4zODcsMTA0LjIsMjcwLjA4NCw5Ny44NzEsMjY4LjM1NCw5MS44NjZ6IE0yNTcuNTMzLDEwNC44MDdsLTE5LjY4OSwzNS42ODRjLTIuNDMyLDQuNDEzLTYuOTgzLDYuODg3LTExLjY3OSw2Ljg4NyAgIGMtMC4wNjEsMC0wLjEzMy0wLjAyMy0wLjIwNC0wLjAyM2MtMS4yMDEsMC4zNzItMi40NjMsMC42MjUtMy43ODksMC42MjVjLTUuMjU1LDAtOS43NTgtMy4wNzUtMTEuOTItNy41bC0yNi4zNjEtMTQuNTM1ICAgYy02LjQ0OS0zLjU1NS04Ljc5MS0xMS42NjEtNS4yMjktMTguMTFjMy41NjEtNi40NjEsMTEuNjktOC43ODUsMTguMTE2LTUuMjM5bDcuMjksNC4wMTQgICBDMTkyLjQwNiw3Mi45LDE2MC40MTgsNDguNTksMTIyLjc5Miw0OC41OWMtNDcuNDUsMC04Ni4wNCwzOC41OS04Ni4wNCw4Ni4wMzljMCw0Ny40NTYsMzguNTksODYuMDQ5LDg2LjA0LDg2LjA0OSAgIGM3LjM1NiwwLDEzLjMzMSw1Ljk3NSwxMy4zMzEsMTMuMzMxYzAsNy4zNTUtNS45NzUsMTMuMzMxLTEzLjMzMSwxMy4zMzFjLTYyLjE1MiwwLTExMi43MS01MC41NTUtMTEyLjcxLTExMi43MTEgICBjMC02Mi4xNDYsNTAuNTU4LTExMi43MSwxMTIuNzEtMTEyLjcxYzQ5Ljk1NCwwLDkyLjM2LDMyLjY5NiwxMDcuMTA3LDc3Ljc4Nmw0LjI4OC03Ljc4NWMzLjU3Mi02LjQ0MywxMS42ODUtOC43ODgsMTguMTIyLTUuMjM5ICAgQzI1OC43NDcsOTAuMjU0LDI2MS4wOTUsOTguMzU3LDI1Ny41MzMsMTA0LjgwN3oiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);',
    '}',
    '#notices-minimize {',
    '  background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ0IDQ0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NCA0NDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiPgo8cGF0aCBkPSJNMzguMDU5LDI4SDUuOTQxQzIuNjY1LDI4LDAsMjUuMzA5LDAsMjJzMi42NjUtNiw1Ljk0MS02aDMyLjExN0M0MS4zMzUsMTYsNDQsMTguNjkxLDQ0LDIyUzQxLjMzNSwyOCwzOC4wNTksMjh6IE01Ljk0MSwxOCAgQzMuODA1LDE4LDIsMTkuODMyLDIsMjJzMS44MDUsNCwzLjk0MSw0aDMyLjExN0M0MC4xOTUsMjYsNDIsMjQuMTY4LDQyLDIycy0xLjgwNS00LTMuOTQxLTRINS45NDF6IiBmaWxsPSIjMDAwMDAwIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=)',
    '}',
    '#notices-maximize {',
    '  background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ0IDQ0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NCA0NDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiPgo8cGF0aCBkPSJNMjIsNDRjLTMuMzA5LDAtNi0yLjY2NS02LTUuOTQxVjI4SDUuOTQxQzIuNjY1LDI4LDAsMjUuMzA5LDAsMjJzMi42NjUtNiw1Ljk0MS02SDE2VjUuOTQxQzE2LDIuNjY1LDE4LjY5MSwwLDIyLDAgIHM2LDIuNjY1LDYsNS45NDFWMTZoMTAuMDU5QzQxLjMzNSwxNiw0NCwxOC42OTEsNDQsMjJzLTIuNjY1LDYtNS45NDEsNkgyOHYxMC4wNTlDMjgsNDEuMzM1LDI1LjMwOSw0NCwyMiw0NHogTTUuOTQxLDE4ICBDMy44MDUsMTgsMiwxOS44MzIsMiwyMnMxLjgwNSw0LDMuOTQxLDRIMTh2MTIuMDU5QzE4LDQwLjE5NSwxOS44MzIsNDIsMjIsNDJzNC0xLjgwNSw0LTMuOTQxVjI2aDEyLjA1OUM0MC4xOTUsMjYsNDIsMjQuMTY4LDQyLDIyICBzLTEuODA1LTQtMy45NDEtNEgyNlY1Ljk0MUMyNiwzLjgwNSwyNC4xNjgsMiwyMiwycy00LDEuODA1LTQsMy45NDFWMThINS45NDF6IiBmaWxsPSIjMDAwMDAwIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=)',
    '}',
    '.notices-tool-icon:hover {',
    '  background-color: rgba(0,0,0,.1);',
    '}',
    '.notices-frame {',
    '  border: none;',
    '  width: 100%;',
    '  height: calc(100% - 3.3rem);',
    '}',
    '.notices-table-cloth {',
    '  position: absolute;',
    '  top: 3.3rem;',
    '  width: 100%;',
    '  height: calc(100% - 3.3rem);',
    '  display: none;',
    '}'
  ].join('\n');

  const noticesStyle = [
    'body {',
    '  min-width: unset;',
    '}',
    '#imui-header, #imui-footer, .imui-title, #imbox_menu, #imbox_menu + div, #imbox_right, #imui-container:after {',
    '  display: none;',
    '}',
    '.container {',
    '  margin: 0;',
    '}',
    '#imui-container div.imbox div.imbox-main {',
    '  width: 480px;',
    '  margin-top: 0;',
    '}',
    '.span8 {',
    '  width: unset;',
    '}',
    '[class*="span"] {',
    '  float: none;',
    '}',
    '#imui-container div.imbox div.imbox-timeline div.imbox-timeline-body #imbox_timeline_thread div.imbox-timeline-thread-body span.imbox-timeline-thread-post-right {',
    '  width: unset;',
    '}',
    '#imui-container div.imbox div.imbox-timeline div.imbox-timeline-body #imbox_timeline_thread div.imbox-timeline-thread-body span.imbox-timeline-thread-post-right div.imbox-timeline-thread-attach-file span.imbox-timeline-thread-attach-file-right {',
    '  width: unset;',
    '}',
    '#imui-container div.imbox div.imbox-timeline div.imbox-timeline-body {',
    '  border: none;',
    '}'
  ].join('\n');

  let settings = localStorage.noticesBoxSettings || '{}';
  settings = JSON.parse(settings);

  let position = settings.position || {};

  const save = function() {
    localStorage.noticesBoxSettings = JSON.stringify(settings);
  }

  const $noticesBoxStyle = $('<style />');
  $noticesBoxStyle.text(noticesBoxStyle);

  const $noticesBox = $('<div />');
  $noticesBox.addClass('notices-box').css('position', 'fixed');

  if (position.top != null) $noticesBox.css('top', position.top);
  else $noticesBox.css('bottom', 10);

  if (position.left != null) $noticesBox.css('left', position.left);
  else $noticesBox.css('left', 10);

  $noticesBox.draggable({
    start: function() {
      $('#table-cloth').show();
    },
    stop: function(e, ui) {
      $('#table-cloth').hide();

      if (settings.position == null) settings.position = {};
      settings.position.top = ui.position.top;
      settings.position.left = ui.position.left;
      save();
    },
    containment: 'parent'
  });

  const $title = $('<label />');
  $title
    .text('Notice Messages')
    .addClass('imui-theme-color')
    .addClass('notices-box-label');

  const $iconbox = $('<div />');
  $iconbox.addClass('notices-tool-box');

  const $reload = $('<span />');
  $reload
    .attr('id', 'notices-reload')
    .addClass('notices-tool-icon');

  const $minimize = $('<span />');
  $minimize
    .attr('id', 'notices-minimize')
    .addClass('notices-tool-icon');

  const $maximize = $('<span />');
  $maximize
    .attr('id', 'notices-maximize')
    .addClass('notices-tool-icon');

  if (settings.minimized) {
    $minimize.hide();
    $noticesBox.css('height', '3.3rem');
  } else {
    $maximize.hide();
  }

  $iconbox
    .append($reload)
    .append($minimize)
    .append($maximize);

  const $noticesFrame = $('<iframe />');
  $noticesFrame
    .attr('src', 'https://accel.intra-mart.jp/accel/imbox/noticemessage')
    .addClass('notices-frame');

  const $tableCloth = $('<div />');
  $tableCloth
    .attr('id', 'table-cloth')
    .addClass('notices-table-cloth');

  $noticesFrame.on('load', function() {
    const $ = this.contentWindow.$;
    const $style = $('<style />');
    $style.text(noticesStyle);

    $('body').append($style)
  });

  $noticesBox.append($title).append($iconbox).append($tableCloth).append($noticesFrame)

  $(document)
    .on('click', '#notices-reload', function() {
      $noticesFrame[0].contentWindow.location.reload();
    })
    .on('click', '#notices-minimize', function() {
      $noticesBox.css('height', '3.3rem');
      $minimize.hide();
      $maximize.show();

      settings.minimized = true;
      save();
    })
    .on('click', '#notices-maximize', function() {
      $noticesBox.css('height', '350px');
      $minimize.show();
      $maximize.hide();

      settings.minimized = false;
      save();
    })

  $('body').append($noticesBoxStyle).append($noticesBox);
}
