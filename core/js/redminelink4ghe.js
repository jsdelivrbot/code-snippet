(() => {
const createRedmineLink = ($) => {
  const pathname = location.pathname;

  if (/^.*\/pull\/[0-9]+(\/.*)?$/.test(pathname)) {
    // プルリク
    const branchName = $('span.head-ref > span.css-truncate-target').text();
    const tmp = branchName.split('-');
    let ticketNo;
    if (tmp.length >= 2) ticketNo = tmp[1];
    if (ticketNo != null && /^[0-9]+$/.test(ticketNo)) {
      const $redmineLink = $('<a/>');
      $redmineLink
        .css('display', 'inline-block')
        .css('position', 'absolute')
        .css('top', 20)
        .css('right', 50)
        .css('padding', '2px 15px')
        .css('background-image', 'url("https://raw.githubusercontent.com/spookybird/code-snippet/master/redmine_fluid_icon.png")')
        .css('background-size', '32px 32px')
        .css('background-repeat', 'no-repeat')
        .css('background-position', 'center')
        .css('background-color', '#d9d9d9')
        .css('border-radius', '3px')
        .css('box-shadow', '1px 1px 1px rgba(0, 0, 0, .4)')
        .css('cursor', 'pointer')
        .css('color', 'white')
        .css('font-size', 20)
        .css('font-weight', 900)
        .css('text-decoration', 'none')
        .attr('href', 'http://redmine.intra.intra-mart.jp/issues/' + ticketNo)
        .attr('target', '_blank')
        .text(ticketNo);
      $('div[role="main"]').css('position', 'relative').append($redmineLink);
    }
  }
}

const intervalId = setInterval(() => {
  if ($ != null) {
    clearInterval(intervalId);
    createRedmineLink($);
  }
}, 100);
})();
