const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { express: jwt } = require('express-jwt');
const secretKey = 'ocean';
const { register, findUser } = require('../dbHandler/dbRegisterAndLogin.js');
const handleRegister = async (req, res) => {
  const { name, password, confirmPassword } = req.body;
  const userNamePattern = /^[a-zA-Z0-9_-]{4,16}/;
  const passwordPattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,18}$/
  if(!userNamePattern.test(name)){
    res.end(JSON.stringify({
      code: -1,
      msg: '用户名格式不正确(正确的用户名格式为4-16位包含字母、数字、下划线或减号)'
    }))
  }else if(password !== confirmPassword){
    res.end(JSON.stringify({
      code: -1,
      msg: '确认密码与密码不一致'
    }))
  }else if(!passwordPattern.test(password)){
    res.end(JSON.stringify({
      code: -1,
      msg: '密码格式不正确(正确的密码格式为6-18位包含字母和数字)'
    }))
  }else{
    const exist = await findUser(name);
    if(exist){
      res.end(JSON.stringify({
        code: -1,
        msg: '用户已存在'
      }));
    }else{
      const result = await register({
        userName: name,
        password: password
      });
      if(result.acknowledged){
        res.end(JSON.stringify({
          code: 0,
          msg: '注册成功'
        }));        
      }      
    }
  }
}
const handleLogin = async (req, res) => {
  const { name, password } = req.body;  
  const user = await findUser(name);
  if(!user){
    res.end(JSON.stringify({
      code: -1,
      msg: '用户不存在'
    }));
  }else{
    const flag = await bcrypt.compare(password, user.password);
    if(!flag){      
      res.end(JSON.stringify({
        code: -1,
        msg: '密码错误'
      }));
    }else{
      if(req.session.user){
        res.end(JSON.stringify({
          code: -1,
          msg: '已经登录'
        }));
      }else{
        req.session.user = user;
        res.end(JSON.stringify({
          code: 0,
          msg: '登录成功',
          user: user.userName,
          token: jwt.sign({username: user.userName}, secretKey, { expiresIn: `${60 * 60 * 2}s`})
        }));        
      }
    }
  }
}
const handleLogout = async (req, res) => {
  const user = req.session.user;
  if(user){
    req.session.destroy();
    res.end(JSON.stringify({
      code: 0,
      msg:'登出成功'
    }))
  }
}
module.exports = {
  handleRegister,
  handleLogin,
  handleLogout
}