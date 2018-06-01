## Fetch

封装 ajax 插件

light ajax plugin 

### Download

#### browser
```html
<script src="fetch.js"></script>
```
#### webpack 

```js
import fetch from 'fetch'
fetch.config.baseUrl = 'http://api.com'
fetch.config.timeout = 5000
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
```