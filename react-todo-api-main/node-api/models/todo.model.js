module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todo", {
    name: {
      type: Sequelize.STRING,
    },
    done: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Todo;
};
