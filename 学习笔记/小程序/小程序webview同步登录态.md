小程序和小程序中的webview是两个独立空间，webview没法自动同步小程序的登陆状态，所以需要手动同步，这里记录一下同步的方法。
小程序登录成功后，在本地记录需要的cookie，然后打开webview，进入中转页，url上携带cookie和directUrl。
需要确保中转页和webview的域名是同一个，这样才能同步cookie。
中转页setCookie后，跳转到directUrl，这样webview就能同步到cookie了。

核心代码如下
```js
const { cookie, redictUrl, stopAutoJump } = useQuery();

const syncLogin = async() => {
  const cookieStr = decodeURIComponent(cookie).replaceAll(' ', '')
  const cookieObjArr = cookieStr.split(';').map(str => {
    const [key, value] = str.split('=')
    return { key, value }
  })

  cookieObjArr.forEach(({ key, value }) => {
    if (key) {
      // typescript-cookie
      setCookie(key, value, { expires: 7, path: '/', domain: '.youdao.com' })
    }
  })

  setTimeout(() => {
    if (redictUrl === window.location.href || stopAutoJump) return
    window.location.href = decodeURIComponent(redictUrl) 
  }, 50)
}

useEffect(() => { syncLogin() }, [])
```