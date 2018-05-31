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
**config-list:**
- baseUrl 基础url
- timeout 超时
- headers 头部
- transformRequest  param 转换


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
// 头部 中间层
```