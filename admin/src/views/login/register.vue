<template>
  <div class="login-container" :style="layoutStyle">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="login-form"
      label-position="top"
    >
      <div class="title-container">
        <h3>Registration</h3>
      </div>

      <el-form-item prop="account" label="账号">
        <el-input
          prefix-icon="el-icon-user"
          ref="account"
          v-model="form.account"
          placeholder="账号"
          name="account" />
      </el-form-item>

      <el-form-item prop="password" label="密码">
        <el-input
          prefix-icon="el-icon-lock"
          ref="password"
          v-model="form.password"
          type="password"
          placeholder="不少于8位,需包含字母和数字"
          name="password" />
      </el-form-item>

      <el-form-item prop="name" label="项目名称">
        <el-input
          prefix-icon="el-icon-document"
          ref="name"
          v-model="form.name"
          placeholder="可以在注册后随时修改"
          name="name"/>
      </el-form-item>

      <el-form-item prop="url" label="项目网站URL">
        <el-input
          prefix-icon="el-icon-link"
          ref="url"
          v-model="form.url"
          placeholder="可以在注册后随时修改"
          name="url" />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        class="login-btn"
        @click.native.prevent="register"
      >创建账号</el-button>

      <div class="login-tips">
        <p>已经拥有账号? <router-link to="/login">立即登录</router-link></p>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      layoutStyle: '',
      form: {
        account: '',
        password: '',
        name: '',
        url: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9@.]{4,16}$/, message: '账号格式不对', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^(?=.*[a-zA-Z])(?=.*\d)[\S]{6,16}$/, message: '密码不少于8位,需包含字母和数字', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入项目网站URL', trigger: 'blur' },
          { type: 'url', message: '网址格式不对', trigger: 'blur' }
        ],
      },
      loading: false
    };
  },
  mounted() {
    //设置页面高度
    this.layoutStyle = `height:${window.innerHeight}px;`;
  },
  methods: {
    register() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('user/login', this.form).then(() => {
            this.$router.push({ path: this.$route.query.redirect || '/' });
            this.loading = false;
          }).catch(() => {
            this.loading = false;
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.login-container {
  .el-form-item {
    .el-form-item__label {
      line-height: 32px;
      color: #eee;
      &::before {
        display: none;
      }
    }
    .el-form-item__content {
      line-height: 45px;
      .el-input {
        input {
          height: 45px;
          line-height: 45px;
        }
        .el-input__icon {
          font-size: 16px;
          font-weight: 900;
        }
      }
      .el-form-item__error {
        line-height: 16px;
      }
    }
  }
}
</style>

<style lang="less" scoped>
@dark_gray: #eee;

.login-container {
  background-color: #2d3a4b;
  overflow: hidden;
  .login-form {
    width: 520px;
    padding: 15vh 35px 0;
    margin: 0 auto;
    .title-container {
      h3 {
        margin-bottom: 40px;
        font-size: 26px;
        color: @dark_gray;
        text-align: center;
      }
    }
    .login-btn {
      width: 100%;
      margin: 20px 0;
      padding: 0 20px;
      line-height: 40px;
    }
    .login-tips {
      text-align: right;
      font-size: 14px;
      color: @dark_gray;
      a {
        color: #357ce1;
      }
    }
  }
}
</style>
