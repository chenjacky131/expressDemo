const express = require('express');
const session = require('express-session');
const { route } = require('./router.js'); //  路由处理
const app = express();
const port = 3030;
app.use(session({
  name:'express',
  resave: true,
  saveUninitialized: false,
  secret: 'ocean'
}))
app.use(express.json()); //  解析content-type:application/json的数据到req.body
route(app);
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});