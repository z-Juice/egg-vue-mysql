<template>
  <div class="layout-main user-container">
    <LatoutTop name="用户管理" />

    <div class="layout-section">
      <div class="table">
        <div class="table-action">
          <el-input placeholder="请输入用户邮箱" v-model="searchValue" @keyup.enter.native="search">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
          <el-button type="primary" @click="exportData"><img src="@/assets/images/icon/user_export.png" />导出用户数据</el-button>
        </div>

        <el-table :data="lists">
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="twitter" label="Twitter" />
          <el-table-column prop="status" label="订阅状态" />
          <el-table-column prop="time" label="最后登录时间" />
          <el-table-column prop="total" label="奖励总额" />
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
    </div>
  </div>
</template>

<script>
import LatoutTop from '@/components/LatoutTop'

export default {
  name: 'User',
  components: {
    LatoutTop
  },
  data() {
    return {
      page: 0,
      limit: 10,
      limits: [5, 10, 20],
      lists: [{
        email: 123,
        twitter: 123,
        status: 123,
        time: 123,
        total: 123
      }],
      total_count: 20,
      searchValue: ''
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
    search() {
      this.getList()
    },
    exportData(_id) {
      let params = new URLSearchParams();
      params.append("project_id", _id);
      params.append("is_enable", 1);
      params.append("auto_review", 1); //自动审核

      this.$http.post("/api/project/update", params).then(res => {
        if (res.data.code === 0) {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.getList();
        }
      });
    },
  }
}
</script>

<style lang="less">
.user-container {
  .table-action {
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
    >.el-input {
      width: 330px;
      .el-input__inner {
        height: 36px;
        line-height: 36px;
        &:focus {
          border-color: #357CE1;
        }
      }
      .el-input-group__append {
        border: 1px solid #357CE1;
        .el-button {
          line-height: 34px;
          padding: 0 15px;
          background-color: #357CE1;
          border-radius: 0;
          i {
            font-size: 16px;
            font-weight: 900;
            color: #fff;
          }
        }
      }
    }
    >.el-button {
      padding: 0 16px;
      span {
        display: flex;
        align-items: center;
        img {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>

<style lang="less" scoped>
.user-container {
  .table {
    padding: 30px 20px;
    background-color: #fff;
  }
}
</style>
