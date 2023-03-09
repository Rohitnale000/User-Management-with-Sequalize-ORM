module.exports = (sequelize, DataTypes) => {
  const states = sequelize.define(
    "states",
    {
      // Model attributes are defined here
      state_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      user_state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      tableName: "user_states",
    }
  );
  return states;
};
