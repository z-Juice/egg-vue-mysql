<template>
  <div class="layout-main activity-container">
    <LatoutTop name="活动管理">
      <router-link to="/activity/create" slot="layout-top-right">
        <el-button type="primary" icon="el-icon-document-add">发起活动</el-button>
      </router-link>
    </LatoutTop>

    <div class="layout-section">
       <div class="table">
        <el-table :data="lists">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="amount" label="用户数" />
          <el-table-column prop="integral" label="积分" />
          <el-table-column prop="prize" label="奖励" />
          <el-table-column prop="time" label="时间安排" />
        </el-table>
        
        <el-pagination
          background
          :hide-on-single-page="!total_count"
          @size-change="sizeChange"
          @current-change="pageChange"
          :current-page="page"
          :page-sizes="limits"
          :page-size="limit"
          layout="prev, pager, next, sizes, jumper"
          :total="total_count">
        </el-pagination>
       </div>

       <div class="preview">
         <div class="preview-head">
           <h3>活动示例</h3>
         </div>
         <div class="preview-body">
           <div class="preview-body-box">
              <div class="preview-body-btn">
                <span>Visit a page</span>
                <el-button type="primary" @click="previewShow = true">预览</el-button>
              </div>
              <img src="@/assets/images/visit_page_banner.png" alt="">
              <p>用户通过访问指定页面获得积分，并在活动结束按照积分池情况瓜分奖金。</p>
           </div>
         </div>

         <el-dialog
            title="Visit This Page to Enter（预览模式）"
            :visible.sync="previewShow"
            width="30%"
            :before-close="previewClose">
            <div>
              <p>点击下方按钮访问网页并获得积分：</p>
              <el-button type="primary" @click="previewLook">点击进入网页</el-button>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="previewShow = false">取 消</el-button>
              <el-button type="primary" :disabled="previewEndDis" @click="previewEnd">已经完成任务</el-button>
            </span>
          </el-dialog>
       </div>
    </div>
  </div>
</template>

<script>
import LatoutTop from '@/components/LatoutTop'

export default {
  name: 'Activity',
  components: {
    LatoutTop
  },
  data() {
    return {
      page: 0,
      limit: 5,
      limits: [5, 10, 20],
      lists: [{
        name: 123,
        status: 123,
        amount: 123,
        integral: 123,
        prize: 123,
        time: 123
      }],
      total_count: 1,
      previewShow: false,
      previewEndDis: true
    };
  },
  created() {
    // this.getList()
  },
  mounted() {
    
  },
  methods: {
    getList() {
      let offset = this.page ? (this.page-1)*this.limit : 0
      let params = new URLSearchParams();
      params.append('offset', offset);
      params.append('limit', this.limit);

      this.$http.get("/api/project/list", {
        params
      }).then(res => {
        if (res.data.code === 0) {
          this.total_count = res.data.data.total_count;
          this.projects = res.data.data.projects;
        }
      });
    },
    sizeChange(val) {
      this.limit = val
      this.getList()
    },
    pageChange(val) {
      this.page = val
      this.getList()
    },
    previewClose(done) {
      done();
    },
    previewLook() {
      window.open('https://www.baidu.com/')
      this.previewEndDis = false
    },
    previewEnd() {
      this.previewShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.activity-container {
  .layout-top {
    .el-button {
      padding: 0 16px;
      line-height: 30px;
    }
  }
  .table {
    padding: 30px 20px;
    background-color: #fff;
  }
  .preview {
    margin-top: 15px;
    background-color: #fff;
    .preview-head {
      padding: 26px 24px 14px;
      border-bottom: 1px solid #e9e9e9;
      h3 {
        line-height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #262626;
      }
    }
    .preview-body {
      padding: 24px 24px 36px 24px;
      .preview-body-box {
        width: 256px;
        font-size: 0;
        .preview-body-btn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          >span {
            font-size: 14px;
            color: #333;
          }
          .el-button {
            padding: 0 15px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 400;
          }
        }
        img {
          width: 100%;
          margin-bottom: 15px;
        }
        p {
          line-height: 20px;
          font-size: 14px;
          color: #333;
        }
      }
    }
  }
}
</style>
