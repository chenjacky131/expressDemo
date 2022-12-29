const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'api-data';
async function getCollection(){ //  获取数据库data表的数据
  await client.connect();
  const db = client.db(dbName);
  const collection = await db.collection('user');
  return collection;
}
async function findUser (name){ //  查找用户
  const collection = await getCollection();
  const res = await collection.findOne({userName: name});
  return res;
}
async function register (data){ //  注册
  const collection = await getCollection();
  const salt = await bcrypt.genSalt(10);
  const encPassword = await bcrypt.hash(data.password, salt);
  const res = await collection.insertOne({
    ...data,
    password: encPassword
  });
  return res;
}
module.exports = {
  register,
  findUser
}