<template>
  <div class="layout-main create-container">
    <LatoutTop name="发起活动" />

    <div class="layout-section">
      <div class="form" :style="createStyle">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="100px"
          label-position="left"
        >
          <el-form-item prop="name" label="名称" required>
            <el-input
              ref="name"
              v-model="form.name"
              placeholder="E.g. 8750 SGC Token Give Away"
              name="name"
            />
          </el-form-item>

          <el-form-item label="日期" required>
            <el-form-item prop="start" class="el-form-item-2">
              <el-date-picker
                v-model="form.start"
                type="datetime"
                :picker-options="startDateDisabled"
                prefix-icon="el-icon-date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <div style="color: #aaa;">-</div>
            <el-form-item prop="end" class="el-form-item-2">
              <el-date-picker
                v-model="form.end"
                type="datetime"
                :picker-options="endDateDisabled"
                @focus="endDateFocus"
                prefix-icon="el-icon-date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="zone" class="el-form-item-2">
              <el-select v-model="form.zone" placeholder="请选择所在时区">
                <el-option
                  v-for="item in zones"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form-item>

          <el-form-item label="奖励" required>
            <el-form-item prop="pool" class="el-form-item-2" style="width: 50%;">
              <el-input
                ref="pool"
                type="number"
                v-model="form.pool"
                placeholder="请输入本期活动发放的奖励数量"
                name="pool"
              />
            </el-form-item>
          </el-form-item>

          <el-form-item class="create-activity-content" prop="activitys" label="活动模块" required>
            <ul>
              <CreateActivityBox v-for="item in form.activitys" :key="item.id" :activity="item" @activitysDel="activitysDel" @activitysEdit="activitysEdit" />
            </ul>
            <el-button
              icon="el-icon-plus"
              @click="activitysAdd"
            >Visit a Page</el-button>
          </el-form-item>

          <el-form-item prop="introduction" label="活动简介" required>
            <el-input
              ref="introduction"
              type="textarea"
              :rows="3"
              v-model="form.introduction"
              placeholder="请简要介绍活动规则、注意事项以及获取奖励的途径"
              name="introduction"
            />
          </el-form-item>

          <div class="create-btn">
            <el-button
              :loading="loading"
              type="primary"
              @click="submit"
            >确认发起</el-button>
            <el-button
              @click="cancel"
            >取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import LatoutTop from '@/components/LatoutTop'
import CreateActivityBox from '@/components/CreateActivityBox'

export default {
  name: 'Create',
  components: {
    LatoutTop,
    CreateActivityBox
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入活动名称'));
      }else if (Math.ceil(value.replace(/[^\x00-\xff]/g, "**").length) > 40) {// eslint-disable-line
        callback(new Error('活动名称过长'));
      } else {
        callback();
      }
    }
    const validateIntro = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入活动简介'));
      }else if (Math.ceil(value.replace(/[^\x00-\xff]/g, "**").length) > 200) {// eslint-disable-line
        callback(new Error('活动简介过长'));
      } else {
        callback();
      }
    }
    const validateStart = (rule, value, callback) => {
      if(!(value instanceof Date)){
        callback(new Error('请选择日期'));
      } else if(this.form.end) {
        if (value.getTime() > this.form.end.getTime()) {
          callback(new Error('开始时间不能晚于结束时间'));
        }
      } else {
        callback();
      }
    }
    const validateEnd = (rule, value, callback) => {
      if(!(value instanceof Date)){
        callback(new Error('请选择日期'));
      } else if(this.form.start) {
        if (value.getTime() < this.form.start.getTime()) {
          callback(new Error('结束时间不能早于开始时间'));
        }
      } else {
        callback();
      }
    }
    const validateActivitys = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请添加活动'));
      } else {
        if(this.activitysOKID.length != this.form.activitys.length){
          callback(new Error('活动填写不完整'));
        }else{
          callback();
        }
      }
    }
    return {
      createStyle: '',
      form: {
        name: '',
        start: '',
        end: '',
        zone: '',
        pool: '',
        activitys: [],
        introduction: ''
      },
      rules: {
        name: [
          { validator: validateName, trigger: ['blur', 'change'] }
        ],
        start: [
          { validator: validateStart, trigger: ['blur', 'change'] }
        ],
        end: [
          { validator: validateEnd, trigger: ['blur', 'change'] }
        ],
        zone: [
          { required: true, message: '请选择所在时区', trigger: 'change' }
        ],
        pool: [
          { required: true, message: '请输入发送奖励数量', trigger: ['blur', 'change'] },
          { pattern: /^\d+(\.{0,1}\d{0,8})$/, message: '数量不正确', trigger: ['blur', 'change'] }
        ],
        activitys: [
          { validator: validateActivitys, trigger: 'blur' }
        ],
        introduction: [
          { validator: validateIntro, trigger: ['blur', 'change'] }
        ]
      },
      startDateDisabled: {},
      endDateDisabled: {},
      zones: [{
        value: -12,
        label: '(GMT-12:00) International Date Line West'
      },{
        value: -11,
        label: '(GMT-11:00) American Samoa'
      },{
        value: -10,
        label: '(GMT-10:00) Hawaii'
      },{
        value: -9,
        label: '(GMT-09:00) Alaska'
      },{
        value: -8,
        label: '(GMT-08:00) Tijuana'
      },{
        value: -7,
        label: '(GMT-07:00) Arizona'
      },{
        value: -6,
        label: '(GMT-06:00) Guadalajara'
      },{
        value: -5,
        label: '(GMT-05:00) Bogota'
      },{
        value: -4,
        label: '(GMT-04:00) Caracas'
      },{
        value: -3,
        label: '(GMT-03:30) Newfoundland'
      },{
        value: -2,
        label: '(GMT-02:00) Mid-Atlantic'
      },{
        value: -1,
        label: '(GMT-01:00) Azores'
      },{
        value: 0,
        label: '(GMT+00:00) London'
      },{
        value: 1,
        label: '(GMT+01:00) Berlin'
      },{
        value: 2,
        label: '(GMT+02:00) Athens'
      },{
        value: 3,
        label: '(GMT+03:00) Baghdad'
      },{
        value: 4,
        label: '(GMT+04:00) Baku'
      },{
        value: 5,
        label: '(GMT+05:00) Karachi'
      },{
        value: 6,
        label: '(GMT+06:00) Almaty'
      },{
        value: 7,
        label: '(GMT+07:00) Hanoi'
      },{
        value: 8,
        label: '(GMT+08:00) Beijing'
      },{
        value: 9,
        label: '(GMT+09:00) Tokyo'
      },{
        value: 10,
        label: '(GMT+10:00) Canberra'
      },{
        value: 11,
        label: '(GMT+11:00) Magadan'
      },{
        value: 12,
        label: '(GMT+12:00) Auckland'
      },{
        value: 13,
        label: '(GMT+13:00) Samoa'
      }],
      activitysID: 0,
      activitysOKID: [],
      loading: false,
    };
  },
  created() {
    this.startDateDisabled.disabledDate = (time) => {
      return (time.getTime() + 24 * 3600 * 1000) < Date.now()
    }
    this.endDateDisabled.disabledDate = (time) => {
      return (time.getTime() + 24 * 3600 * 1000) < Date.now()
    }
  },
  mounted() {
    //设置页面高度
    this.createStyle = `height:${window.innerHeight-104}px;`;
  },
  methods: {
    endDateFocus() {
      if(this.form.start){
        this.endDateDisabled.disabledDate = (time) => {
          return time.getTime() < this.form.start.getTime()
        }
      }
    },
    activitysAdd() {
      this.activitysID++
      this.form.activitys.push({
        title: '',
        url: '',
        id: this.activitysID
      })
      this.$refs.form.validateField('activitys');
    },
    activitysDel(id) {
      const idx = this.activitysOKID.indexOf(id)
      if(idx > -1) this.activitysOKID.splice(idx, 1)
      this.form.activitys = this.form.activitys.filter(ele => {
        if(ele.id === id){
          return false
        }
        return true
      })
      this.$refs.form.validateField('activitys');
    },
    activitysEdit(obj) {
      if(obj.res){
        this.activitysOKID.push(obj.id)
      }else{
        let idx = this.activitysOKID.indexOf(obj.id)
        if(idx > -1) this.activitysOKID.splice(idx, 1)
      }
      this.$refs.form.validateField('activitys');
    },
    submit() {
      console.log(this.form)
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
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
.create-container {
  .el-form {
    .el-form-item {
      margin-bottom: 40px;
      .el-form-item__label {
        line-height: 36px;
      }
      .el-form-item__content {
        display: flex;
        line-height: 36px;
        >div {
          &:first-child {
            margin-left: 0;
          }
          margin-left: 20px;
        }
        >.el-input {
          width: 50%;
        }
        .el-input__icon {
          line-height: 36px;
        }
        .el-select {
          .el-input {
            width: 100%;
          }
        }
        .el-button {
          padding: 0 20px;
          line-height: 34px;
        }
        .el-form-item__error {
          margin-left: 0;
          line-height: 16px;
        }
      }
    }
    .el-form-item-2 {
      margin-bottom: 0;
      .el-form-item__content {
        .el-input {
          width: 100%;
        }
        .el-date-editor {
          width: 210px;
        }
      }
    }
    .create-activity-content {
      .el-form-item__content {
        display: block;
        .el-button {
          border-style: dashed;
        }
      }
    }
    .el-input {
      input {
        height: 36px;
        line-height: 36px;
      }
    }
  }
}
</style>

<style lang="less" scoped>
.create-container {
  .form {
    height: 100%;
    padding: 30px 25% 30px 30px;
    background-color: #fff;
    .el-form {
      width: 100%;
      max-width: 900px;
      .create-btn {
        display: flex;
        justify-content: center;
        .el-button {
          width: 100px;
          margin: 0 10px;
          padding: 0;
          line-height: 34px;
        }
      }
    }
  }
}
</style>
