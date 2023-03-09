module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // Model attributes are defined here
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      user_fname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_mname: {
        type: DataTypes.STRING,
      },
      user_lname: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      user_date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      user_gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_delete: {
        type: DataTypes.ENUM("0", "1"),
        allowNull: false,
        defaultValue: "0",
      },
    },
    {
      // Other model options go here
      tableName: "users",
    }
  );
  return User
};
