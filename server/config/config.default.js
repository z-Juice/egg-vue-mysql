/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1586682333250_9236';

  // 中间件
  config.middleware = [
    'params',
    'notFound',
    'error'
  ];

  // 只对 /api 前缀的 url 路径生效
  config.error = {
    match: '/api',
  },

    // 添加 view 配置
    config.view = {
      root: path.join(appInfo.baseDir, 'app/view'),
      mapping: {
        '.html': 'nunjucks',
      },
    };

  // mysql
  // config.mysql = {
  //   client: {
  //     // host
  //     host: '127.0.0.1',
  //     // 端口号
  //     port: '3306',
  //     // 用户名
  //     user: 'root',
  //     // 密码
  //     password: '123456',
  //     // 数据库名
  //     database: 'egg_db',
  //   },
  //   // 是否加载到 app 上，默认开启
  //   app: true,
  //   // 是否加载到 agent 上，默认关闭
  //   agent: false,
  // };
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'egg_db',
    username: 'root', //账号
    password: '123456', //密码
  };

  //跨域
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['http://www.baidu.com', 'http://localhost:3000'], // 配置白名单
  };
  config.cors = {
    // origin: '*',//允许所有跨域访问，注释掉则允许上面 白名单 访问
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // redis
  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: 'auth',
      db: 0,
    }
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
