const vUtil = function () {};
let p = vUtil.prototype;
p.flatten = function (data) {
  var result = {};

  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++) {
        if (cur[i].hasOwnProperty('nodeep')) {
          result[prop + "[" + i + "]"] = cur[i];
          continue
        }
        recurse(cur[i], prop + "[" + i + "]");
      }
      if (l == 0) {
        result[prop] = [];
      }
    } else {
      var isEmpty = true;
      for (var p in cur) {
        isEmpty = false;
        if (cur[p].hasOwnProperty('nodeep')) {
          result[prop ? prop + "." + p : p] = cur[p];
          continue
        }
        recurse(cur[p], prop ? prop + "." + p : p);

      }
      if (isEmpty && prop)
        result[prop] = {};
    }
  }
  recurse(data, "");
  return result;
}
p.getClientSize = function () {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  };
}
p.getUnicodeLength = function (str) {
  return str.replace(/[^\x00-\xff]/g, "11").length;
}
p.showInputError = function (obj) {
  let errorItem = document.querySelector(`.error_${obj.code}`);
  let inputItem = document.querySelector(`[aria-name=${obj.code}]`);
  let scrollItem = document.querySelector(`[aria-scroll-name=${obj.code}]`)
  if (inputItem) {
    handleDom.addClass(inputItem, 'error');
  }
  if (errorItem) {
    errorItem.innerHTML = obj.msg;
    Velocity(errorItem, {
      opacity: 1
    }, {
      delay: 200
    });
  }
  if (scrollItem) {
    Velocity(scrollItem, 'scroll', {
      duration: 200,
      mobileHA: false
    });
  }
}
p.filterInit = function (filter) {
  var filterInit = [];
  _.forEach(filter, (item, index) => {
    if (_.isArray(item.value)) {
      var filterObj = {};
      filterObj.key = item.key;
      filterObj.value = [];
      var itemName = item.name;
      _.forEach(item.value, (itemObj, Objindex) => {
        filterObj.value.push({
          name: itemName[Objindex],
          value: itemObj
        })
      })
      filterInit.push(filterObj);
    } else {
      filterInit.push(item);
    }
  })
  return filterInit;
}
p.filterPost = function (filter) {
  var postFilter = {};
  _.forEach(filter, (item, index) => {
    postFilter[`filter[${index}][key]`] = item.key;
    if (_.isArray(item.value)) {
      postFilter[`filter[${index}][value]`] = [];
      _.forEach(item.value, (itemValue) => {
        postFilter[`filter[${index}][value]`].push(itemValue);
      })
    } else {
      postFilter[`filter[${index}][value]`] = item.value
    }
  })
  return postFilter;
}
p.updateLoading = function (flag) {
  if (flag) {
    if ($('.pms_loading')) {
      $('.pms_loading').remove();
    }
    $('body').append(`
    <div class="pms_loading">
      <div class="pms_loading_main icon-spin">
        <i class="pms_icon">&#xe601;</i>
      </div>
    </div>`)
  } else {
    if ($('.pms_loading')) {
      $('.pms_loading').remove();
    }
  }
}
p.updateEditSuccess = function (flag) {
  if (flag) {
    if ($('.success_tips')) {
      $('.success_tips').remove();
    }
    $('body').append(`
    <div class="success_tips">
            <div class="tip_container text_center">
                <i class="pms_icon">&#xe622;</i>
                <p>保存成功</p>
            </div>
        </div>`);

  } else {
    if ($('.success_tips')) {
      $('.success_tips').remove();
    }
  }
}
p.addUrlQuery = function (str) {
  var queryStr = '';
  var sessionValue = (SESSION_VALUE == '' ? Cookies.get(SESSION_KEY) : SESSION_VALUE);
  var tokenValue = (TOKEN_VALUE == '' ? Cookies.get(TOKEN_KEY) : TOKEN_VALUE);
  if (str.indexOf('?') > -1) {
    queryStr = str + `&${SESSION_KEY}=${sessionValue}&${TOKEN_KEY}=${tokenValue}`
  } else {
    queryStr = str + `?${SESSION_KEY}=${sessionValue}&${TOKEN_KEY}=${tokenValue}`
  }
  return queryStr;
}
p.pad = function (val, len) {
  val = String(val);
  len = len || 2;
  while (val.length < len) {
    val = '0' + val;
  }
  return val;
}
let newUtil = new vUtil();
export default newUtil