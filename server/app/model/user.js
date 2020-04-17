'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, UUID, UUIDV4 } = app.Sequelize;

  const User = app.model.define('users', {
    user_id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // account: {
    //   type: STRING,
    //   unique: true
    // },
    password: STRING,
    user_name: STRING(30),
    phone: {
      type: STRING,
      defaultValue: ''
    },
    email: {
      type: STRING,
      defaultValue: ''
    },
    age: {
      type: INTEGER,
      defaultValue: 0
    },
    create_time: {
      type: DATE,
      defaultValue: DATE.NOW
    },
    update_time: {
      type: DATE,
      defaultValue: DATE.NOW
    }
  }, {
    timestamps: false,
    // 默认作用域
    defaultScope: {
      attributes: {
        // 排除密码，不返回密码
        exclude: ['password']
      }
    }
  });
  return User;
};