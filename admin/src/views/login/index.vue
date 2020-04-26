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
        <h3>Login</h3>
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
          :type="passwordType"
          placeholder="不少于8位,需包含字母和数字"
          name="password"
          @keyup.enter.native="login"/>
        <i class="el-icon-view" @click="showPwd"></i>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        class="login-btn"
        @click.native.prevent="login"
      >立即登录</el-button>

      <div class="login-tips">
        <p>还未拥有账号? <router-link to="/register">立即注册</router-link></p>
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
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9@.]{4,16}$/, message: '账号格式不对', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^(?=.*[a-zA-Z])(?=.*\d)[\S]{6,16}$/, message: '密码不少于8位,需包含字母和数字', trigger: 'blur' }
        ]
      },
      loading: false,
      passwordType: 'password'
    };
  },
  mounted() {
    //设置页面高度
    this.layoutStyle = `height:${window.innerHeight}px;`;
  },
  methods: {
    showPwd() { //显示隐藏密码
      if (this.passwordType === 'password') {
        this.passwordType = 'text';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    login() {
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
    padding: 20vh 35px 0;
    margin: 0 auto;
    .title-container {
      h3 {
        margin-bottom: 40px;
        font-size: 26px;
        color: @dark_gray;
        text-align: center;
      }
    }
    .el-form-item {
      .el-icon-view {
        position: absolute;
        right: 10px;
        top: 0;
        line-height: 45px;
        font-size: 16px;
        font-weight: 900;
        color: #ddd;
        cursor: pointer;
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
