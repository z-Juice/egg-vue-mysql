const Service = require('egg').Service;

class User extends Service {
  // async index(id = 1, name = '', page = 1, pageSize = 10) {
  //   // //单条查询
  //   // let result = await this.app.mysql.get('users', { id: id });
  //   // result = { result };

  //   // //批量查询
  //   // let result = await this.app.mysql.select('users', {
  //   //   columns: ['id', 'userName'], //查询字段，全部查询则不写，相当于查询*
  //   //   where: {
  //   //     id: id,
  //   //     userName: name
  //   //   },
  //   //   limit: pageSize, //查询条数
  //   //   offset: pageSize*(page-1) //数据偏移量（分页查询使用）
  //   // })
  //   // result = JSON.stringify(result);
  //   // result = JSON.parse(result)

  //   // //插入
  //   // const result = await this.app.mysql.insert('users', {
  //   //   user_name: 'didi',
  //   //   password: '654321'
  //   // });

  //   // //更新
  //   // const result = await this.app.mysql.update('users', {
  //   //   id: id,
  //   //   user_name: name
  //   // }); // 更新 posts 表中的记录

  //   // //删除
  //   // const result = await this.app.mysql.delete('users', {
  //   //   id: id
  //   // });
  //   // console.log(result)
  //   return {};
  // }
  async create(obj) {
    const ctx = this.ctx;
    let getUser = {
      user_name: obj.user_name
    }
    obj.password = await ctx.service.utils.sha256(obj.password, obj.user_name)
    const user = await ctx.model.User.findOrCreate({
      where: getUser,
      defaults: obj
    })
    return user
  }

  async findOne(params) {
    const user = await this.ctx.model.User.findOne({
      where: params
    })
    return user
  }
  
  async findAll(obj) {
    const { app, ctx } = this;
    const { Op } = app.Sequelize;
    const pageSize = obj.pageSize || 10;
    const page = obj.page || 1;

    const user = await ctx.model.User.findAll({
      where: Object.keys(obj).length > 0 ? {
        [Op.or]: [
          { user_name: { [Op.like]: '%' + obj.user_name + '%' } },
          { phone: { [Op.like]: '%' + obj.phone + '%' } },
          { email: { [Op.like]: '%' + obj.email + '%' } },
          { password: { [Op.like]: '%' + obj.password + '%' } }
        ],
      } : {},
      limit: pageSize, //查询条数
      offset: pageSize*(page-1) //数据偏移量（分页查询使用）
    })
    return user
  }

  // 修改个人信息
  async edit(params) {
    const where = {
      user_id: params.user_id
    }
    return await this.ctx.model.User.update(params, { where: where })
  }

  // 修改密码
  async password(params) {
    const { ctx } = this;
    const where = {
      user_name: params.user_name
    }
    let password = await ctx.service.utils.sha256(params.password, params.user_name)
    return await ctx.model.User.update({
      password: password
    }, { where: where })
  }

  // 修改密码
  async delete(params) {
    return await this.ctx.model.User.destroy({
      where: params
    })
  }
}

module.exports = User;