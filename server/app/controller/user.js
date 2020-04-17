const Controller = require('egg').Controller;

class User extends Controller {
  // 注册
  async register() {
    const { ctx } = this;
    let body = ctx.request.body;
    await ctx.service.user.create(body).then(async (data) => {
      if (data[0]) {
        ctx.body = {
          status: 0,
          data: data
        }
      } else {
        ctx.body = {
          status: 1,
          message: '账号已经被注册'
        }
      }
    })
  }

  // 登陆
  async login() {
    const { app, ctx } = this;
    // 过期时间
    let time = 3600 * 24 * 30
    let user_name = ctx.request.body.user_name
    let password = ctx.request.body.password
    // 加密密码
    password = await ctx.service.utils.sha256(ctx.request.body.password, ctx.request.body.user_name)
    // 查询用户
    await ctx.service.user.findOne({ user_name: user_name, password: password }).then(async (data) => {
      console.log(data)
      if (data) {
        // 生成token
        let token = await ctx.service.verif.createToken({ _id: data.user_id }, time)
        // 保存用户信息到cookie
        ctx.cookies.set('t', token, {
          maxAge: time * 1000,
          path: '/',
          // domain: 'www.dubo.world',
          domain: 'localhost',
          httpOnly: false,
        });
        ctx.cookies.set('uid', data.user_id, {
          maxAge: time * 1000,
          path: '/',
          // domain: 'www.dubo.world',
          domain: 'localhost',
          httpOnly: false,
        });
        // 保存token到redis
        await app.redis.set(data.user_id, token)
        // 设置token过期时间
        await app.redis.expire(data.user_id, time)
        ctx.body = {
          status: 0,
          data: data
        }
      } else {
        ctx.body = {
          status: 1,
          message: '账号或密码错误，请重试！'
        }
      }
    })
  }

  // 退出登陆
  async logout() {
    const { ctx } = this
    await ctx.cookies.set('uid', null, {
      path: '/',
      // domain: 'www.dubo.world',
      domain: 'localhost',
      httpOnly: false,
    })
    await ctx.cookies.set('t', null, {
      path: '/',
      // domain: 'www.dubo.world',
      domain: 'localhost',
      httpOnly: false,
    })
    ctx.body = {
      status: 0,
      data: {}
    }
  }

  // 查询一个用户
  async info() {
    const { ctx } = this
    let user_id = ctx.query.user_id
    if (!/[1-9][0-9]*/.test(body.user_id)) {
      ctx.body = {
        status: 1,
        message: 'user_id为空'
      }
      return
    }
    await ctx.service.user.findOne({ user_id: user_id }).then(async (res) => {
      if(res){
        ctx.body = {
          status: 0,
          data: res
        }
      }else{
        ctx.body = {
          status: 1,
          message: '没有该用户'
        }
      }
    })
  }

  // 获取所有用户
  async lists() {
    const { ctx } = this
    let body = {}
    ctx.query.user_name != undefined ? body.user_name = ctx.query.user_name : null
    ctx.query.phone != undefined ? body.phone = ctx.query.phone : null
    ctx.query.email != undefined ? body.email = ctx.query.email : null
    ctx.query.age != undefined ? body.age = ctx.query.age : null
    ctx.query.page ? body.page = ctx.query.page : null
    ctx.query.pageSize ? body.pageSize = ctx.query.pageSize : null
    await ctx.service.user.findAll(body).then(async (res) => {
      ctx.body = {
        status: 0,
        data: res
      }
    })
  }

  // 修改个人信息
  async edit() {
    let { ctx } = this
    const body = ctx.request.body
    if (!/[1-9][0-9]*/.test(body.user_id)) { //必传
      ctx.body = {
        status: 1,
        message: 'user_id不合法'
      }
      return
    }
    if (body.phone && !/^1\d{10}$/.test(body.phone)) {
      ctx.body = {
        status: 1,
        message: '手机号不合法'
      }
      return
    }
    if (body.email && !/^[.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(body.email)) {
      ctx.body = {
        status: 1,
        message: '邮箱不合法'
      }
      return
    }
    if (body.age && !/\d+/.test(body.age)) {
      ctx.body = {
        status: 1,
        message: '年龄不合法'
      }
      return
    }
    let params = {}
    body.phone != undefined ? params.phone = body.phone : null
    body.email != undefined ? params.email = body.email : null
    body.age != undefined ? params.age = body.age : null
    
    await ctx.service.user.edit(params).then(async data => {
      // 修改成功后再做对应的操作
      if (data[0]) {
        ctx.body = {
          status: 0,
          data: {}
        }
      } else {
        ctx.body = {
          status: 1,
          message: '服务器错误'
        }
      }
    })
  }

  // 修改密码
  async password() {
    let { ctx } = this
    const body = ctx.request.body
    if (!/^\S{6,16}$/.test(body.password)) {
      ctx.body = {
        status: 1,
        message: '旧密码不合法'
      }
      return
    }
    if (!/^\S{6,16}$/.test(body.newPassword)) {
      ctx.body = {
        status: 1,
        message: '新密码不合法'
      }
      return
    }
    // let t = ctx.cookies.get('t')
    let user_id = await ctx.service.verif.verifToken(ctx.request.header.t)
    let user = await ctx.service.user.findOne({ user_id: user_id._id })
    let password = await ctx.service.utils.sha256(body.password, user.user_name)

    await ctx.service.user.findOne({ user_name: user.user_name, password: password }).then(async (data) => {
      if(data){
        await ctx.service.user.password({
          user_name: user.user_name,
          password: body.newPassword
        }).then(async data1 => {
          // 修改成功后再做对应的操作
          if (data1[0] === 1) {
            ctx.body = {
              status: 0,
              data: {}
            }
          } else if (data1[0] === 0) {
            ctx.body = {
              status: 1,
              message: '新密码和旧密码相同'
            }
          } else {
            ctx.body = {
              status: 1,
              message: '服务器错误'
            }
          }
        })
      }else{
        ctx.body = {
          status: 1,
          message: '密码错误，请重试！'
        }
      }
    })
    
  }

  //删除用户
  async delete() {
    const { ctx } = this
    const user_id = ctx.request.body.user_id
    if (!/[1-9][0-9]*/.test(user_id)) {
      ctx.body = {
        status: 1,
        message: 'user_id为空'
      }
      return
    }
    await ctx.service.user.delete({ user_id: user_id }).then(async (res) => {
      console.log(res)
      if(res){
        ctx.body = {
          status: 0,
          data: {}
        }
      }else{
        ctx.body = {
          status: 1,
          message: '没有该用户'
        }
      }
    })
  }
}

module.exports = User;