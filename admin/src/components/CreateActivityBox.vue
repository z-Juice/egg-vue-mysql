
<template>
  <li class="activity-box">
    <div class="activity-box-head">
      <h4>Visit a Page</h4>
      <el-button type="primary" icon="el-icon-delete" @click="del">删除</el-button>
    </div>
    <div class="activity-box-body">
      <el-form :model="activity" :rules="rules" ref="activityForm">
        <el-form-item
          label="Title"
          label-width="50px"
          prop="title">
          <el-input
            ref="title"
            v-model="activity.title"
            placeholder="Visit This Page To Enter"
            name="title"
            @blur="blur"
          />
        </el-form-item>
        <el-form-item
          label="Link URL"
          label-width="80px"
          prop="url">
          <el-input
            ref="url"
            v-model="activity.url"
            placeholder="https://example.com"
            name="url"
            @blur="blur"
          />
        </el-form-item>
      </el-form>
    </div>
  </li>
</template>

<script>
export default {
  name: 'CreateActivityBox',
  props: {
    activity: {
      type: Object,
      default: function() {
        return {
          title: '',
          url: '',
          id: 0
        }
      }
    }
  },
  data() {
    const validateTitle = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入活动名称'));
      }else if (Math.ceil(value.replace(/[^\x00-\xff]/g, "**").length) > 40) {// eslint-disable-line
        callback(new Error('活动名称过长'));
      } else {
        callback();
      }
    }
    return {
      rules: {
        title: [
          { validator: validateTitle, trigger: ['blur', 'change'] }
        ],
        url: [
          { required: true, message: '请添加活动链接', trigger: 'blur' },
          { type: 'url', message: '活动链接格式不对', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    del() {
      this.$emit('activitysDel', this.activity.id)
    },
    blur() {
      this.$refs.activityForm.validate(valid => {
        if (valid) {
          this.$emit('activitysEdit', {
            id: this.activity.id,
            res: true
          })
        } else {
          this.$emit('activitysEdit', {
            id: this.activity.id,
            res: false
          })
        }
      });
    }
  }
};
</script>

<style lang="less">
.activity-box-body {
  .el-form-item {
    width: 48%;
    margin-bottom: 20px !important;
    &.is-success{
      .el-input__inner {
        border-color: #DCDFE6;
        &:focus {
          border-color: #357CE1;
        }
      }
    }
    .el-form-item__label {
      &::before {
        display: none;
      }
    }
    .el-form-item__content {
      .el-input {
        width: 100% !important;
      }
    }
  }
}
</style>

<style lang="less" scoped>
.activity-box {
  margin-bottom: 20px;
  border: 1px solid #DCDFE6;
  .activity-box-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 46px;
    padding: 0 15px;
    border-bottom: 1px solid #DCDFE6;
    background-color: #fafafa;
    h4 {
      font-size: 14px;
      font-weight: normal;
    }
    .el-button {
      padding: 0 10px !important;
      line-height: 28px !important;
    }
  }
  .activity-box-body {
    padding: 15px;
    .el-form {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>