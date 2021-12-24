import Cookies from 'js-cookie'

export function getCookie(key) {
  return Cookies.get(key)
}

export function setCookie(key, value) {
  return Cookies.set(key, value)
}

export function removeCookie(key) {
  return Cookies.remove(key)
}

export function logout() {
  return new Promise((resolve) => {
    removeCookie('accessToken')
    removeCookie('storeId')
    resolve()
  })
}
