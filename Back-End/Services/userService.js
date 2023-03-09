const db = require("../Model/connection.js");
const bcrypt = require('bcrypt');
const { where } = require("sequelize");
const saltRounds = 10;
const User = db.User;
const Address = db.address;
const States = db.states;

//to display all the records
exports.displayUserDataService = async () => {
  const data = await User.findAll({
    // include: [
    //   {
    //     model: Address,
    //     required:true//for inner join
    //   },
    //   {
    //     model: States,
    //     required:true
    //   },
    // ],

    include: { all: true }, //it include all model which is related with USER model
    where: { user_delete: "0" },
  });
  return data;
};

//insert data into database
exports.insertUserDataService = async (bodyData) => {
  const hash = bcrypt.hashSync(bodyData.user_password, saltRounds);
  try {
    await db.sequelize.transaction(async (t) => {
      const userDataOfApi = await User.create(
        {
          user_fname: bodyData.user_fname,
          user_mname: bodyData.user_mname,
          user_lname: bodyData.user_lname,
          user_gender: bodyData.user_gender,
          user_date_of_birth: bodyData.user_date_of_birth,
          user_email: bodyData.user_email,
          user_username: bodyData.user_username,
          user_password:hash ,
        },
        { transaction: t }
      );

      const addressDataOfApi = await Address.create(
        {
          address: bodyData.address,
          street: bodyData.street,
          landmark: bodyData.landmark,
          city: bodyData.city,
          pincode: bodyData.pincode,
          user_id: userDataOfApi.user_id,
        },
        { transaction: t }
      );

      const stateDataOfApi = await States.create(
        {
          user_state: bodyData.user_state,
          user_id: userDataOfApi.user_id,
        },
        { transaction: t }
      );
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};

exports.getSingleDataService = async (reqParamsEmail) => {
  try {
    console.log(reqParamsEmail);
    const data = await User.findAll({
    include: { all: true },
    where: { user_email: reqParamsEmail },
    });
    //const stringifyData = JSON.stringify(data);
    console.log(data);
    let result = DataFormatting(data);
    return result;
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUserDataService = async (reqParam) => {
  try {
    const data = await User.update(
      { user_delete: "1" },
      { where: { user_id: reqParam } }
    );
    return true;
  } catch (error) {
    console.log(error);
  }
};

exports.updateUserDataService = async (reqParamId, bodyData) => {
  const hash = bcrypt.hashSync(bodyData.user_password, saltRounds);
  bodyData.user_password = hash
  await db.sequelize.transaction(async (t) => {
    const UserDataOfApi = await User.update(
      bodyData,
      { where: { user_id: reqParamId } },
      { transaction: t }
    );

    const addressDataOfApi = await Address.update(
      bodyData,
      { where: { user_id: reqParamId } },
      { transaction: t }
    );

    const stateDataOfApi = await States.update(
      bodyData,
      { where: { user_id: reqParamId } },
      { transaction: t }
    );
  });
  return true;
};

const DataFormatting = (data) => {
  let arr = [];
  let getUser;
  let getAddress;
  let getStates;
  for (let i = 0; i < data.length; i++) {
    getUser = data[i];
    getAddress = data[i].address;
    getStates = data[i].state;

    let responseObj = {
      user_id:getUser.user_id,
      user_fname: getUser.user_fname,
      user_mname: getUser.user_mname,
      user_lname: getUser.user_lname,
      user_gender: getUser.user_gender,
      user_date_of_birth: getUser.user_date_of_birth,
      user_email: getUser.user_email,
      user_username: getUser.user_username,
      user_password: getUser.user_password,
      address: getAddress.address,
      street: getAddress.street,
      landmark: getAddress.landmark,
      user_state: getStates.user_state,
      city: getAddress.city,
      pincode: getAddress.pincode,
    };

    arr.push(responseObj);
  }

  return arr;
};

exports.paginationDataService = async (page, limit) => {
  // page = parseInt(page);
  // limit = parseInt(limit);
  let offset = (page - 1) * limit;

  try {
    const data = await User.findAll({
      where: { user_delete: "0" },
      include: [
        {
          model: Address,
          required: true, //for inner join
        },
        {
          model: States,
          required: true,
        },
      ],
      limit,
      offset,
    });

    const count = await User.count(
      { where:{user_delete:'0'}}
    );
   // console.log(count);
    //console.log(data);
    let result = DataFormatting(data);
    //console.log(result);
    return { data1: result, totalCount:count };
  } catch (error) {
    console.log(error);
  }
};
