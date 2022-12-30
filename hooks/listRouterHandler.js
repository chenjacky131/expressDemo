const { insertData, findData, findSingleData, deleteData, updateData } = require('../dbHandler/dbList.js');
const handleFindDataRoute = async (_req,res) => {
  const data = await findData();
  res.end(JSON.stringify(data ? data: {msg: '暂无数据'}))
}
const handleFindSingleDataRoute = async (req,res) => {
  const {id} = req.params;
  const result = await findSingleData(id);
  res.end(JSON.stringify(result))
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
module.exports = {
  handleFindDataRoute,
  handleSetDataRoute,
  handleDeleteDataRoute,
  handleUpdateDataRoute,
  handleFindSingleDataRoute
}