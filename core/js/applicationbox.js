(function($) {
  const displayId = $('#imbox').data('display_id');
  const targets = ['DISPLAY_MYBOX', 'DISPLAY_DIRECTMESSAGEBOX', 'DISPLAY_COMPANYBOX', 'DISPLAY_USER_MESSAGE'];
  const URL = 'https://accel.intra-mart.jp/accel/imbox/applicationbox';

  if (targets.indexOf(displayId) != -1) {

    const applicationBoxStyle = [
      '.application-box {',
      '  cursor: move;',
      '  background: white;',
      '  position: fixed!important;',
      '  z-index: 20000000;',
      '  border: 1px solid gray;',
      '  overflow: hidden;',
      '  border-radius: 4px;',
      '  box-shadow: 1px 1px 1px rgba(0, 0, 0, .5);',
      '  width: auto;',
      '  height: auto;',
      '}',
      '.application-box-resizable-dealie.ui-state-disabled {',
      '  opacity: unset;',
      '}',
      '.application-box-label {',
      '  color: rgba(255,255,255,.8);',
      '  font-weight: bold;',
      '  padding: .6rem 1rem;',
      '  font-size: 1.5rem;',
      '  display: block;',
      '  cursor: move;',
      '}',
      '.application-tool-box {',
      '  position: absolute;',
      '  top: 1px;',
      '  right: 5px;',
      '}',
      '.application-tool-icon {',
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
      '#application-reload {',
      '  background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgMjY5LjI4MyAyNjkuMjgzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNjkuMjgzIDI2OS4yODM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMjY4LjM1NCw5MS44NjZjLTEuNzQxLTYuMDE3LTUuNzExLTEwLjk3MS0xMS4xODEtMTQuMDAzYy0zLjQ1My0xLjkwMS03LjM1MS0yLjkwNy0xMS4yODktMi45MDcgICBjLTQuOTM3LDAtOS42NDUsMS41NTUtMTMuNTQ3LDQuMzA5Yy0yMC42NS00MC45NzctNjIuNjM3LTY3LjQxNi0xMDkuNTUyLTY3LjQxNkM1NS4wODIsMTEuODQ5LDAsNjYuOTMxLDAsMTM0LjYzNSAgIGMwLDY3LjcxMSw1NS4wODIsMTIyLjc5OSwxMjIuNzg2LDEyMi43OTljMTIuOTA3LDAsMjMuNDA2LTEwLjUwOSwyMy40MDYtMjMuNDE5cy0xMC40OTktMjMuNDA3LTIzLjQwNi0yMy40MDcgICBjLTQxLjg4NywwLTc1Ljk2NC0zNC4wODMtNzUuOTY0LTc1Ljk3M2MwLTQxLjg4NiwzNC4wODMtNzUuOTYzLDc1Ljk2NC03NS45NjNjMjUuMjc0LDAsNDguNDI5LDEyLjYwNiw2Mi4zOSwzMi43NjIgICBjLTYuNDQ5LDEuNDU5LTEyLjA4Miw1LjYwOC0xNS4zNDgsMTEuNTI5Yy0zLjAxNSw1LjQ3OS0zLjcxOCwxMS44LTEuOTgyLDE3LjgwOHM1LjcwNSwxMC45NzEsMTEuMTgyLDEzLjk5NGwyMy45NjUsMTMuMjI2ICAgYzQuMzM2LDYuMjY5LDExLjQwMywxMC4wNTIsMTkuMTc0LDEwLjA1MmMxLjY2OSwwLDMuMzU2LTAuMTkyLDUuMTA5LTAuNjE4YzguMDg5LTAuMzkxLDE1LjQ2My00LjkzNywxOS4zOS0xMi4wN2wxOS42OTUtMzUuNjgzICAgQzI2OS4zODcsMTA0LjIsMjcwLjA4NCw5Ny44NzEsMjY4LjM1NCw5MS44NjZ6IE0yNTcuNTMzLDEwNC44MDdsLTE5LjY4OSwzNS42ODRjLTIuNDMyLDQuNDEzLTYuOTgzLDYuODg3LTExLjY3OSw2Ljg4NyAgIGMtMC4wNjEsMC0wLjEzMy0wLjAyMy0wLjIwNC0wLjAyM2MtMS4yMDEsMC4zNzItMi40NjMsMC42MjUtMy43ODksMC42MjVjLTUuMjU1LDAtOS43NTgtMy4wNzUtMTEuOTItNy41bC0yNi4zNjEtMTQuNTM1ICAgYy02LjQ0OS0zLjU1NS04Ljc5MS0xMS42NjEtNS4yMjktMTguMTFjMy41NjEtNi40NjEsMTEuNjktOC43ODUsMTguMTE2LTUuMjM5bDcuMjksNC4wMTQgICBDMTkyLjQwNiw3Mi45LDE2MC40MTgsNDguNTksMTIyLjc5Miw0OC41OWMtNDcuNDUsMC04Ni4wNCwzOC41OS04Ni4wNCw4Ni4wMzljMCw0Ny40NTYsMzguNTksODYuMDQ5LDg2LjA0LDg2LjA0OSAgIGM3LjM1NiwwLDEzLjMzMSw1Ljk3NSwxMy4zMzEsMTMuMzMxYzAsNy4zNTUtNS45NzUsMTMuMzMxLTEzLjMzMSwxMy4zMzFjLTYyLjE1MiwwLTExMi43MS01MC41NTUtMTEyLjcxLTExMi43MTEgICBjMC02Mi4xNDYsNTAuNTU4LTExMi43MSwxMTIuNzEtMTEyLjcxYzQ5Ljk1NCwwLDkyLjM2LDMyLjY5NiwxMDcuMTA3LDc3Ljc4Nmw0LjI4OC03Ljc4NWMzLjU3Mi02LjQ0MywxMS42ODUtOC43ODgsMTguMTIyLTUuMjM5ICAgQzI1OC43NDcsOTAuMjU0LDI2MS4wOTUsOTguMzU3LDI1Ny41MzMsMTA0LjgwN3oiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);',
      '}',
      '#application-minimize {',
      '  background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ0IDQ0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NCA0NDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiPgo8cGF0aCBkPSJNMzguMDU5LDI4SDUuOTQxQzIuNjY1LDI4LDAsMjUuMzA5LDAsMjJzMi42NjUtNiw1Ljk0MS02aDMyLjExN0M0MS4zMzUsMTYsNDQsMTguNjkxLDQ0LDIyUzQxLjMzNSwyOCwzOC4wNTksMjh6IE01Ljk0MSwxOCAgQzMuODA1LDE4LDIsMTkuODMyLDIsMjJzMS44MDUsNCwzLjk0MSw0aDMyLjExN0M0MC4xOTUsMjYsNDIsMjQuMTY4LDQyLDIycy0xLjgwNS00LTMuOTQxLTRINS45NDF6IiBmaWxsPSIjMDAwMDAwIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=);',
      '}',
      '#application-maximize {',
      '  background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ0IDQ0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NCA0NDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiPgo8cGF0aCBkPSJNMjIsNDRjLTMuMzA5LDAtNi0yLjY2NS02LTUuOTQxVjI4SDUuOTQxQzIuNjY1LDI4LDAsMjUuMzA5LDAsMjJzMi42NjUtNiw1Ljk0MS02SDE2VjUuOTQxQzE2LDIuNjY1LDE4LjY5MSwwLDIyLDAgIHM2LDIuNjY1LDYsNS45NDFWMTZoMTAuMDU5QzQxLjMzNSwxNiw0NCwxOC42OTEsNDQsMjJzLTIuNjY1LDYtNS45NDEsNkgyOHYxMC4wNTlDMjgsNDEuMzM1LDI1LjMwOSw0NCwyMiw0NHogTTUuOTQxLDE4ICBDMy44MDUsMTgsMiwxOS44MzIsMiwyMnMxLjgwNSw0LDMuOTQxLDRIMTh2MTIuMDU5QzE4LDQwLjE5NSwxOS44MzIsNDIsMjIsNDJzNC0xLjgwNSw0LTMuOTQxVjI2aDEyLjA1OUM0MC4xOTUsMjYsNDIsMjQuMTY4LDQyLDIyICBzLTEuODA1LTQtMy45NDEtNEgyNlY1Ljk0MUMyNiwzLjgwNSwyNC4xNjgsMiwyMiwycy00LDEuODA1LTQsMy45NDFWMThINS45NDF6IiBmaWxsPSIjMDAwMDAwIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=);',
      '}',
      '#application-home {',
      '  background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ2LjE3NyA0Ni4xNzciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ2LjE3NyA0Ni4xNzc7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KPHBhdGggZD0iTTIzLjg1NiwxLjQ1MWwxMC45ODQsMTAuMjIybDEwLjk4NCwxMC4yMjJjMC40NDQsMC40MjksMC40NzYsMS4xMjcsMC4wNjMsMS41ODcgIGMtMC4yMjIsMC4yMzgtMC41MjQsMC4zNDktMC44MjUsMC4zNDl2MC4wMTZoLTUuNTU1VjQzLjkxYzAsMC42MTktMC41MDgsMS4xMjctMS4xMjcsMS4xMjdoLTguNzQ2ICBjLTAuNjE5LDAtMS4xMTEtMC41MDgtMS4xMTEtMS4xMjdWMjguNDgySDE3LjY2NlY0My45MWMwLDAuNjE5LTAuNTA4LDEuMTI3LTEuMTI3LDEuMTI3SDcuNzkzYy0wLjYxOSwwLTEuMTExLTAuNTA4LTEuMTExLTEuMTI3ICBWMjMuODQ3SDEuMTExQzAuNDkyLDIzLjg0NywwLDIzLjM0LDAsMjIuNzIxYzAtMC4zNDksMC4xNTktMC42NjcsMC40MTMtMC44NzNsMTAuOTM2LTEwLjE3NEwyMi4zMzIsMS40MzUgIEMyMi43NjEsMS4wMzksMjMuNDI3LDEuMDM5LDIzLjg1NiwxLjQ1MUwyMy44NTYsMS40NTF6IE0zMy4zMTYsMTMuMzA4TDIzLjA5NCwzLjc4NWwtMTAuMjIyLDkuNTI0bC04LjkwNCw4LjI4NmgzLjgyNSAgYzAuNjE5LDAsMS4xMjcsMC41MDgsMS4xMjcsMS4xMjd2MjAuMDYzaDYuNTA4VjI3LjM3MWMwLTAuNjE5LDAuNDkyLTEuMTI3LDEuMTExLTEuMTI3aDEzLjA5NWMwLjYxOSwwLDEuMTI3LDAuNTA4LDEuMTI3LDEuMTI3ICB2MTUuNDEyaDYuNTA4VjIyLjcyMWMwLTAuNjE5LDAuNDkyLTEuMTI3LDEuMTExLTEuMTI3aDMuODQxTDMzLjMxNiwxMy4zMDh6IiBmaWxsPSIjMDAwMDAwIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=);',
      '}',
      '#application-read {',
      '  background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ0OS43MTYsMjM5Ljg0MmMtMC41NDMtNy41MzUtNy4wODItMTMuMTkxLTE0LjYyOC0xMi42NjFjLTcuNTM2LDAuNTQzLTEzLjIwNCw3LjA5Mi0xMi42NjIsMTQuNjI4ICAgIGMwLjMzNyw0LjY1NSwwLjUwNiw5LjQzMSwwLjUwNiwxNC4xOTFjMCwxMDkuMDYxLTg4LjcyNiwxOTcuNzg3LTE5Ny43ODYsMTk3Ljc4N0MxMTYuMDg2LDQ1My43ODcsMjcuMzYsMzY1LjA2LDI3LjM2LDI1NiAgICBTMTE2LjA4Niw1OC4yMTQsMjI1LjE0Nyw1OC4yMTRjNDMuMTkxLDAsODQuMjEsMTMuNjY4LDExOC42MiwzOS41MjVjNi4wNDEsNC41MzgsMTQuNjE1LDMuMzIxLDE5LjE1NC0yLjcxOCAgICBjNC41NC02LjA0LDMuMzIzLTE0LjYxNi0yLjcxNy0xOS4xNTRjLTM5LjE4OS0yOS40NDctODUuODkxLTQ1LjAxMi0xMzUuMDU4LTQ1LjAxMkMxMDEuMDAxLDMwLjg1NCwwLDEzMS44NTUsMCwyNTYgICAgczEwMS4wMDEsMjI1LjE0NSwyMjUuMTQ3LDIyNS4xNDVTNDUwLjI5MiwzODAuMTQ2LDQ1MC4yOTIsMjU2QzQ1MC4yOTIsMjUwLjU4Niw0NTAuMDk3LDI0NS4xNSw0NDkuNzE2LDIzOS44NDJ6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDk2LjM5NSw2MS43N2MtMjAuODA4LTIwLjgwNy01NC42NjYtMjAuODA3LTc1LjQ3NCwwbC0xOTcuMTEsMTk3LjEwOGwtNjkuODc0LTY5Ljg3NSAgICBjLTIwLjgwOC0yMC44MDctNTQuNjY2LTIwLjgwNy03NS40NzQsMGMtMjAuODA4LDIwLjgwOC0yMC44MDgsNTQuNjY2LDAsNzUuNDc0bDEyMC4zNDEsMTIwLjM0MSAgICBjNi44OTUsNi44OTUsMTUuOTUxLDEwLjM0MiwyNS4wMDcsMTAuMzQyYzkuMDU3LDAsMTguMTEzLTMuNDQ3LDI1LjAwOC0xMC4zNDJsMjQ3LjU3Ni0yNDcuNTc2ICAgIEM1MTcuMjAxLDExNi40MzUsNTE3LjIwMSw4Mi41NzksNDk2LjM5NSw2MS43N3ogTTQ3Ny4wNDksMTE3Ljg5N0wyMjkuNDcyLDM2NS40NzVjLTMuMTIsMy4xMi04LjIsMy4xMi0xMS4zMiwwTDk3LjgxMSwyNDUuMTMzICAgIGMtMTAuMTQxLTEwLjE0MS0xMC4xNDEtMjYuNjQsMC0zNi43ODFjNS4wNy01LjA3MiwxMS43MjktNy42MDYsMTguMzktNy42MDZzMTMuMzIxLDIuNTM1LDE4LjM5LDcuNjA2bDcxLjg4Miw3MS44ODIgICAgYzQuNjMyLDQuNjMxLDEwLjc5MSw3LjE4MSwxNy4zMzksNy4xODFjNi41NTEsMCwxMi43MS0yLjU1MSwxNy4zNDEtNy4xODJMNDQwLjI2OCw4MS4xMTZjMTAuMTM4LTEwLjE0MSwyNi42NC0xMC4xNDEsMzYuNzgxLDAgICAgQzQ4Ny4xODksOTEuMjU3LDQ4Ny4xODksMTA3Ljc1Niw0NzcuMDQ5LDExNy44OTd6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==);',
      '}',
      '.application-tool-icon:hover {',
      '  background-color: rgba(0,0,0,.1);',
      '}',
      '.application-frame {',
      '  border: none;',
      '  width: 100%;',
      '  height: calc(100% - 3.3rem);',
      '}',
      '.application-table-cloth {',
      '  position: absolute;',
      '  top: 3.3rem;',
      '  width: 100%;',
      '  height: calc(100% - 3.3rem);',
      '  display: none;',
      '}',
      '.ui-resizable-disabled .ui-resizable-handle {',
      '  display: none!important;',
      '}'
    ].join('\n');

    const applicationStyle = [
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
      '  width: 100%;',
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
      '}',
      '#imui-container div.imbox div.imbox-timeline div.imbox-timeline-body #imbox_timeline_thread div.imbox-timeline-thread-body div.imbox-timeline-thread-bottom div.imbox-timeline-thread-posted-option div.imbox-timeline-thread-posted-option-body.imbox-timeline-thread-reply-message span.imbox-timeline-thread-reply-right {',
      '  width: unset;',
      '}',
      '#imui-container div.imbox div.imbox-timeline div.imbox-timeline-body #imbox_timeline_thread div.imbox-timeline-thread-body span.imbox-timeline-thread-post-right div.imbox-timeline-thread-post-right-body div.imbox-timeline-thread-message div.imbox-timeline-thread-share span.imbox-timeline-thread-share-right {',
      '  width: unset;',
      '}',
      '#imui-container div.imbox div.imbox-timeline div.imbox-timeline-body #imbox_timeline_thread div.imbox-timeline-thread-body span.imbox-timeline-thread-post-right div.imbox-timeline-thread-post-right-body div.imbox-timeline-thread-message div.imbox-timeline-thread-share span.imbox-timeline-thread-share-right span.imbox-timeline-thread-share-url {',
      '  word-break: break-all;',
      '}'
    ].join('\n');

    let settings = localStorage.applicationBoxSettings || '{}';
    settings = JSON.parse(settings);

    let position = settings.position || {top: 10, left: 10};
    let size = settings.size || {width: 500, height: 350};

    const save = function() {
      localStorage.applicationBoxSettings = JSON.stringify(settings);
    }

    const $applicationBoxStyle = $('<style />');
    $applicationBoxStyle.text(applicationBoxStyle);

    const $applicationBox = $('<div />');
    $applicationBox
      .addClass('application-box')
      .css('position', 'fixed')
      .css('top', position.top)
      .css('left', position.left);

    const $resizableBox = $('<div />')
      .addClass('application-box-resizable-dealie')
      .css('width', size.width)
      .css('height', size.height);

    const showTableCloth = function() {
      $('#table-cloth').show();
    };

    const hideTableCloth = function(e, ui) {
      $('#table-cloth').hide();
    }

    const savePosition = function(e, ui) {
      if (settings.position == null) settings.position = {};
      settings.position.top = ui.position.top;
      settings.position.left = ui.position.left;
      position = settings.position;
      save();
    }

    const saveSize = function(e, ui) {
      if (settings.size == null) settings.size = {};
      settings.size.width = ui.size.width;
      settings.size.height = ui.size.height;
      size = settings.size;
      save();
    }

    $applicationBox
      .draggable({
        start: showTableCloth,
        stop: function(e, ui) {
          hideTableCloth(e, ui);
          savePosition(e, ui);
        },
        containment: 'parent'
      });

    $resizableBox
      .resizable({
        minWidth: 350,
        minHeight: 200,
        start: showTableCloth,
        stop: function(e, ui) {
          hideTableCloth(e, ui);
          saveSize(e, ui);
        }
      });

    const $title = $('<label />');
    $title
      .text('Application Box')
      .addClass('imui-theme-color')
      .addClass('application-box-label');

    const $iconbox = $('<div />');
    $iconbox.addClass('application-tool-box');

    const $read = $('<span />');
    $read
      .attr('id', 'application-read')
      .addClass('application-tool-icon');

    const $home = $('<span />');
    $home
      .attr('id', 'application-home')
      .addClass('application-tool-icon');

    const $reload = $('<span />');
    $reload
      .attr('id', 'application-reload')
      .addClass('application-tool-icon');

    const $minimize = $('<span />');
    $minimize
      .attr('id', 'application-minimize')
      .addClass('application-tool-icon');

    const $maximize = $('<span />');
    $maximize
      .attr('id', 'application-maximize')
      .addClass('application-tool-icon');

    if (settings.minimized) {
      $minimize.hide();
      $resizableBox.css('height', '3.3rem').resizable('disable');
    } else {
      $maximize.hide();
    }

    $iconbox
      .append($read)
      .append($home)
      .append($reload)
      .append($minimize)
      .append($maximize);

    const $applicationFrame = $('<iframe />');
    $applicationFrame
      .attr('src', URL)
      .addClass('application-frame');

    const $tableCloth = $('<div />');
    $tableCloth
      .attr('id', 'table-cloth')
      .addClass('application-table-cloth');

    $applicationFrame.on('load', function() {
      const $ = this.contentWindow.$;
      const $style = $('<style />');
      $style.text(applicationStyle);

      $('body').append($style)
    });

    $resizableBox.append($title).append($iconbox).append($tableCloth).append($applicationFrame);
    $applicationBox.append($resizableBox);

    $(document)
      .on('click', '#application-read', function() {
        const readFunction = $applicationFrame[0].contentWindow.$imbox.menu.allRead;
        const $readMenu = $applicationFrame.contents().find('[data-menu_type="confirm"]');
        if ($readMenu.length) {
          readFunction($readMenu);
        }
      })
      .on('click', '#application-home', function() {
        $applicationFrame[0].contentWindow.location.href = URL;
      })
      .on('click', '#application-reload', function() {
        $applicationFrame[0].contentWindow.location.reload();
      })
      .on('click', '#application-minimize', function() {
        $resizableBox.css('height', '3.3rem').resizable('disable');
        $minimize.hide();
        $maximize.show();

        settings.minimized = true;
        save();
      })
      .on('click', '#application-maximize', function() {
        $resizableBox.css('height', size.height).resizable('enable');
        $minimize.show();
        $maximize.hide();

        settings.minimized = false;
        save();
      })

    $('body').append($applicationBoxStyle).append($applicationBox);
  }
})(jQuery);
