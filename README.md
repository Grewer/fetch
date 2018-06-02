## Fetch

> 秉承着少即是多的原理封装了该插件,他拥有post和get两个主要api,并且兼容FormData

封装 ajax 插件

### Download


#### browser
```html
// download it 
<script src="dist/fetch.min.js"></script>
```

#### npm
```bash
npm install gfetch -- save 
```

```js
import fetch from 'gfetch'
fetch.config.baseUrl = 'http://api.com'
fetch.config.timeout = 5000

// or in Vue 
import fetch from 'gfetch'
Vue.use(fetch, config => {
  config.baseUrl = 'http://api.com'
  config.timeout = 5000
})
```
**config-table:**

param | explain | type
------| --------| ----
baseUrl | 基础url,请求时会加到URL前面| string
timeout | 超时时间,默认10000 | number
headers | 头部请求setRequestHeader,默认空| obj 
transformRequest | 对于数据的转换(get,post会自动转数据) |Function(data)
responseType | 数据返回类型,默认json | string
withCredentials | 请求时是否带上cookie,默认false | boolean

### Usege

```js
// get
fetch.get('get/name',{id:1}).then(response=>{
  // do sth
}).catch(error=>{
  // do sth
})
// post
fetch.post('get/name',{id:2}).then(response=>{}).catch(error=>{})

//FormData
let data = new FormData()
data.append('name','formdata')
fetch.post('htmldemo/phprev/', data).then(response => {}).catch(err => {})

// 中间层
fetch.interceptor.success = res => {
   console.log('res', res)
   return res
}

fetch.interceptor.fail = err => {
   console.log('err', err)
   return err
}


// in Vue
// after use

// script
this.$get().then(res=>{}).catch(err=>{})
this.$post().then(res=>{}).catch(err=>{})
```