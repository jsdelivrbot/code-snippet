function expirationDate (userName, password) {
  const parser = new DOMParser();
  const xhr = new XMLHttpRequest();

  const putOnHeader = function(str, style) {
    const inline = document.createElement('span');

    inline.innerHTML = str;
    inline.style.display = 'inline-block';
    inline.style.padding = '.2rem .5rem';

    if (style != null) Object.keys(style).forEach(key => {
      inline.style[key] = style[key];
    });

    document.querySelector('#subheader').appendChild(inline);
  }

  xhr.open('get', 'https://wg.alpha.co.jp/proxy/https/passwdchg2.alpha.co.jp/UserInfo.aspx', true, userName, password);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const doc = parser.parseFromString(xhr.responseText, 'application/xml');
      const expireLimit = doc.querySelector('#ExpireLimit');
      const remain = doc.querySelector('#Remain');

      putOnHeader('パスワード有効期限');
      putOnHeader(expireLimit.innerHTML);
      putOnHeader(remain.innerHTML, {fontSize: '1.2rem', color: '#f88'});
    }
  }
}
