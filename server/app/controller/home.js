'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // const id = ctx.query.id;
    // const name = ctx.query.name;
    // const page = ctx.query.page;
    // const pageSize = ctx.query.pageSize;
    // let result = await ctx.service.home.index(id, name, page, pageSize);
    // ctx.body = result;
    await ctx.render('index.html');
  }
}

module.exports = HomeController;
