# require-styles-webpack

### HtmlWebpackPlugin Template:

```html
<html>
  <head></head>
  <body>
    <div class="header">Some template stuff</div>
    ${require('./body')}
  </body>
</html>
```

### body/index.js:

```javascript
import style from './style.styl'; // this line causes the error
import tpl from './tpl.html';

export default tpl;
```

