if (transform_url != null) {
  function transform_url(a) {
    const c = fgt_sslvpn_transform_url_path(a, !1, "web");
    const b = window.open(c);
    try {
      b.opener = null
    } catch (d) {console.error(d);}
  }
}
