<template>
  <div class="layout-main config-container">
    <LatoutTop name="网站配置" />

    <div class="layout-section">
      <div class="form" :style="configStyle">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item prop="name" label="项目名称">
            <el-input
              ref="name"
              v-model="form.name"
              placeholder="E.g. WeBounty"
              name="name"
            />
          </el-form-item>

          <el-form-item prop="url" label="网站URL">
            <el-input
              ref="url"
              v-model="form.url"
              placeholder="https://example.com"
              name="url"
            />
          </el-form-item>

          <el-button
            :loading="loading"
            type="primary"
            class="config-btn"
            @click="submit"
          >保存配置</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import LatoutTop from '@/components/LatoutTop'

export default {
  name: 'Config',
  components: {
    LatoutTop
  },
  data() {
    return {
      configStyle: '',
      form: {
        name: '',
        url: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入项目网站URL', trigger: 'blur' },
          { type: 'url', message: '网址格式不对', trigger: 'blur' }
        ]
      },
      loading: false,
    };
  },
  created() {
    // this.getList()
  },
  mounted() {
    //设置页面高度
    this.configStyle = `height:${window.innerHeight-104}px;`;
  },
  methods: {
    submit() {
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
    },
  }
}
</script>

<style lang="less">
.config-container {
  .el-form {
    .el-form-item {
      margin-bottom: 40px;
      .el-form-item__label {
        line-height: 36px;
      }
      .el-form-item__content {
        line-height: 36px;
        .el-input {
          input {
            height: 36px;
            line-height: 36px;
          }
        }
        .el-form-item__error {
          line-height: 16px;
        }
      }
    }
  }
}
</style>

<style lang="less" scoped>
.config-container {
  .form {
    height: 100%;
    padding: 30px 20px;
    background-color: #fff;
    .el-form {
      width: 460px;
      .config-btn {
        display: block;
        margin: 40px auto;
        padding: 0 20px;
        line-height: 34px;
      }
    }
  }
}
</style>
