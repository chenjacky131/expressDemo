const { handleFindDataRoute, handleSetDataRoute, handleDeleteDataRoute, handleUpdateDataRoute} = require('./hooks/listRouterHandler.js');
const { handleRegister, handleLogin, handleLogout } = require('./hooks/userRouterHandler.js');
const handleCrossOrigin = (app) => {  //  处理跨域
  app.all('*', (req, res, next) => {
    //  设置允许跨域的域名
    res.header('Access-Control-Allow-origin', '*');
    //  允许的header类型 
    res.header('Access-Control-Allow-Headers', 'content-type');
    //  允许跨域的请求方式
    res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
    //  设置中文编码
    res.set({
      'Content-Type': 'application/json;charset=utf-8'
    });
    if(!req.session.user && req.url !== '/login'){
      res.end(JSON.stringify({
        code: -1,
        msg: '未登录'
      }))
    }
    if(req.method === 'OPTIONS'){
      res.sendStatus(200);  //  让options尝试快速结束
    }else{
      next();
    }
  });
}

function route(app){
  handleCrossOrigin(app);
  app.get('/findData', (req,res) => {
    handleFindDataRoute(req, res); 
  });
  app.post('/setData', (req, res) => {
    handleSetDataRoute(req,res)
  });
  app.post('/deleteData', (req, res) => {
    handleDeleteDataRoute(req,res)
  });
  app.post('/updateData', (req, res) => {
    handleUpdateDataRoute(req,res)
  });
  app.post('/register', (req, res) => {
    handleRegister(req,res)
  });
  app.post('/login', (req, res) => {
    handleLogin(req,res)
  });
  app.post('/logout', (req, res) => {
    handleLogout(req,res)
  });
}
exports.route = route