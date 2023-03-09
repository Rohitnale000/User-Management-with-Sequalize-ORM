const { Sequelize,DataTypes } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('UserManagement', 'postgres', 'rohit', {
  host: 'localhost',
  logging:false,
  dialect: 'postgres'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


  const db={}
  db.sequelize=Sequelize;
  db.sequelize=sequelize;



  db.User= require("../Model/user")(sequelize,DataTypes)
  db.address=require("../Model/address")(sequelize,DataTypes)
  db.states=require("../Model/states.js")(sequelize,DataTypes)

  //db.User.hasOne(db.address);
  db.User.hasOne(db.address, {
    foreignKey: 'user_id'
  });
  //db.address.belongsTo(db.User);

  db.User.hasOne(db.states, {
    foreignKey: 'user_id'
  });
  //db.states.belongsTo(db.User);

  db.sequelize.sync({ force: false });
  console.log("All models were synchronized successfully.");



  module.exports=db;