const express = require('express');
const { route } = require('./router.js'); //  路由处理
const app = express();
const port = 3030;
app.use(express.json()) //  解析content-type:application/json的数据到req.bodys
route(app);
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});