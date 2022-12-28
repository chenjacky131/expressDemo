


const { insertData, findData, deleteData, updateData } = require('./db.js');
const handleFindDataRoute = async (res) => {
  const data = await findData();
  res.end(JSON.stringify(data ? data: {msg: '暂无数据'}))
}
const handleSetDataRoute = async (req, res) => {
  const {name, age, number} = req.body;
  const exist = await findData(name);
  if(exist){
    res.end(JSON.parse({msg:'数据已存在'}))
  }else{
    const data = await insertData({name, age, number});
    res.end(JSON.stringify(data))        
  }
}
const handleDeleteDataRoute = async (req, res) => {
  const { id } = req.body;
  const result = await deleteData(id);
  res.end(JSON.stringify(result));
}
const handleUpdateDataRoute = async (req, res) => {
  const { _id, name, age, number } = req.body;
  const result = await updateData({
    id: _id,
    name: name,
    age: age,
    number, number
  });
  res.end(JSON.stringify(result));
}
const handleCrossOrigin = (app) => {  //  处理跨域
  app.all('*', (req, res, next) => {
    //  设置允许跨域的域名
    res.header('Access-Control-Allow-origin', '*');
    //  允许的header类型 
    res.header('Access-Control-Allow-Headers', 'content-type');
    //  允许跨域的请求方式
    res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
    if(req.method === 'OPTIONS'){
      res.sendStatus(200);  //  让options尝试快速结束
    }else{
      next();
    }
  });
}
function route(app){
  handleCrossOrigin(app);
  app.get('/findData', (_req,res) => {
    handleFindDataRoute(res); 
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
}
exports.route = route