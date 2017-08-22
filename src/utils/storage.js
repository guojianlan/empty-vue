/**
 * Created by guojian on 15/8/25.
 */
// exports storage action
var storage = module.exports = exports = {};

storage.version = '1.0.0'; // set version

storage.isSupportLocal = !!window.localStorage;

storage.localStorage = window.localStorage; // set localStorage
storage.sessionStorage = window.sessionStorage; // set localStorage

/**
 * @description set key of val storage at localStorage
 * if browser support `window.localStorage`
 * @param {String} key The storage key
 * @param {String or Object} val the storage val is string or object
 * @return {Bool}
 */
storage.setlocalStorage = function set(key, val) {
    try {
        if (storage.isObject(val)) val = JSON.stringify(val);

        if (storage.isSupportLocal) {
            storage.localStorage.setItem(key, val);
        } else {
            storage.setCookie({
                name: key,
                value: val,
                expiresHours: 24 * 30,
                path: '/'
            });
        }
        return true;
    } catch (e) {
        console.log('storage key ' + key + ' is failed');
        return false;
    }
};

/**
 * @description get localStorage val by key
 * @param {String} key the key of localstorage
 * @return {String} return value of key
 */
storage.getlocalStorage = function get(key) {
    var val;
    try {
        val = storage.isSupportLocal ? storage.localStorage.getItem(key) : storage._getCookie(key);
        if (val) return JSON.parse(val);
    } catch (e) {
        return val;
    }
};

/**
 * @description remove localstorage key
 * @param {String} key The key of storage
 * @return {NULL}
 */
storage.removelocalStorage = function remove(key) {
    if (storage.isSupportLocal) {
        storage.localStorage.removeItem(key);
    } else {
        storage._deleCookie(key, {path: '/'});
    }
};
/**
 * @description set key of val storage at localStorage
 * if browser support `window.localStorage`
 * @param {String} key The storage key
 * @param {String or Object} val the storage val is string or object
 * @return {Bool}
 */
storage.setsessionStorage = function set(key, val) {
    try {
        if (storage.isObject(val)) val = JSON.stringify(val);

        if (storage.isSupportLocal) {
            storage.sessionStorage.setItem(key, val);
        } else {
            storage.setCookie({
                name: key,
                value: val,
                expiresHours: 24 * 30,
                path: '/'
            });
        }
        return true;
    } catch (e) {
        console.log('storage key ' + key + ' is failed');
        return false;
    }
};

/**
 * @description get localStorage val by key
 * @param {String} key the key of localstorage
 * @return {String} return value of key
 */
storage.getsessionStorage = function get(key) {
    var val;
    try {
        val = storage.isSupportLocal ? storage.sessionStorage.getItem(key) : storage._getCookie(key);
        if (val) return JSON.parse(val);
    } catch (e) {
        return val;
    }
};

/**
 * @description remove localstorage key
 * @param {String} key The key of storage
 * @return {NULL}
 */
storage.removesessionStorage = function remove(key) {
    if (storage.isSupportLocal) {
        storage.sessionStorage.removeItem(key);
    } else {
        storage._deleCookie(key, {path: '/'});
    }
};
/**
 * @description is object method
 * @param {Object} obj The judge param
 * @return {Boolean}
 */
storage.isObject = function(obj) {
    return '[object Object]' === toString.call(obj);
};

/**
 * @description is Array
 * @param {Object | Array | String} val The judge param
 * @return {Boolean}
 */
storage.isArray = Array.isArray;

/**
 * 设置cookie
 * option[name] cookie名，必选
 * option.value: cookie值，必选
 * option.expiresHours: 过期时间，可选，默认为浏览器关闭即消失
 * option.path: cookie存放路径，可选。例如"/"、"/shop"。
 * 默认情况下,如果在某个页面创建了一个cookie,那么该页面所在目录中的其他页面也可以访问该cookie
 * 如果这个目录下还有子目录，则在子目录中也可以访问。
 * 例如在www.xxxx.com/html/a.html中所创建的cookie，
 * 可以被www.xxxx.com/html/b.html或www.xxx.com/html/some/c.html所访问，但不能被www.xxxx.com/d.html访问。
 * option.domain: 可访问该cookie的域名，可选。
 */
storage._setCookie = function(option) {
    var cookieStr = option.name + "=" + option.value;
    if (option.expiresHours) {
        var date = new Date();
        date.setTime(date.getTime() + option.expiresHours * 3600 * 1000);
        cookieStr = cookieStr + "; expires=" + date.toUTCString();
    }
    if (option.path) {
        cookieStr = cookieStr + "; path=" + option.path;
    }
    if (option.domain) {
        cookieStr = cookieStr + "; domain=" + option.domain;
    }
    document.cookie = cookieStr;
};

/**
 * 删除cookie
 * name: cookie名，必选
 * option.path: cookie存放路径，可选
 * option.domain: 可访问该cookie的域名，可选
 * 需要注意的是，设置cookie时，如果setCookie传了path、domain，删除时也必选传入这两个参数
 * 否则无法删除cookie
 * 另外，经测试，如设置了path、domain，删除时需在设置cookie的同一域下删除
 */
storage._deleteCookie = function(name, option) {
    var date = new Date();
    date.setTime(date.getTime() - 1000);
    document.cookie = name +
    "=88; expires=" +
    date.toUTCString() +
    (option.path ? ("; path=" + option.path) : "") +
    (option.domain ? ("; domain=" + option.domain) : "");
};

/**
 * @description 获取cookie中name对应的值
 */
storage._getCookie = function(name) {
    var cookies = document.cookie.split("; "),
        arr;
    for (var i = 0, len = cookies.length; i < len; i++) {
        arr = cookies[i].split("=");
        if (arr[0] == name) {
            return decodeURI(arr[1]);
        }
    }
    return "";
};
