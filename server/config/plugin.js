'use strict';

/** @type Egg.EggPlugin */
module.exports = { // had enabled by egg
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks'
  },
  cors: { //跨域
    enable: true,
    package: 'egg-cors',
  },
  // mysql: { //mysql
  //   enable: true,
  //   package: 'egg-mysql',
  // },
  sequelize: { //mysql
    enable: true,
    package: 'egg-sequelize',
  },
  redis: { //redis
    enable: true,
    package: 'egg-redis',
  }
};
