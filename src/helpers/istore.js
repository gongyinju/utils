//sessionStorage
export const setItem = (key,value) => {
    sessionStorage.setItem(key,JSON.stringify(value))
}
export const getItem = key => {
    return window.sessionStorage.getItem(key);
}
export const removeItem = key => {
    sessionStorage.removeItem(key);
}
//localStorage
export const setItemLocal = (key,value) => {
    if (window.localStorage && (window.localStorage.setItem('a', 123), window.localStorage.getItem('a') === '123')) {
        localStorage.setItem(key, JSON.stringify(value))
    }else {
        window.localStorageCache[key] = value
    }
}
export const getItemLocal = key => {
    if (window.localStorage && (window.localStorage.setItem('a', 123), window.localStorage.getItem('a') === '123')) {
        if (localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key))
        } else {
            return undefined
        }
    }else {
        return window.localStorageCache[key]
    }
}
export const removeItemLocal = key => {
    if (window.localStorage && (window.localStorage.setItem('a_3', 123), window.localStorage.getItem('a_3') === '123')) {
        localStorage.removeItem(key);
    }else {
        delete window.localStorageCache[key]
    }
}

