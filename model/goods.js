var Sequelize=require("sequelize");
var config=require("../config.js");
/*创建mysql连接*/
console.log(config)
var sequelize=new Sequelize(config.database,config.user,config.password,{
  host:config.host,
  dialect:"mysql",
  // port:{
  //   max: 5,
  //   min: 0,
  //   idle: 30000
  // }
});
var sequelize2=new Sequelize(config.database,config.user,config.password,{
  host:config.host,
  dialect:"mysql",
  // port:{
  //   max: 5,
  //   min: 0,
  //   idle: 30000
  // }
});
/*创建mysql model即数据表到ORM的映射*/
var goods=sequelize.define("goods",{
  id:{
    type:Sequelize.INTEGER(10).UNSIGNED,
    primaryKey:true
  },
  url:Sequelize.STRING(50),
  text:Sequelize.STRING(50),
  price:Sequelize.INTEGER(10).UNSIGNED,
  saleNum:Sequelize.INTEGER(10).UNSIGNED
},{
  timestamps:false,
});

var login=sequelize2.define("gt",{
  user:Sequelize.STRING(20),
  password:{
    primaryKey:true,
    type:Sequelize.INTEGER(10)
  }
},{
  timestamps:false,
  underscored: true,
  freezeTableName: true
})
module.exports={
  Goods:goods,
  Login:login
}
