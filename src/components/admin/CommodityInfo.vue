<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="recordList" :border="true">
      <el-table-column label="商品id" prop="id" width="80px"></el-table-column>
      <el-table-column label="名称" prop="name" width="120px"></el-table-column>
      <el-table-column label="价格" prop="price" width="85px"></el-table-column>
      <el-table-column label="图片" prop="picture" width="85px"></el-table-column>
      <el-table-column label="描述" prop="description" width="150px"></el-table-column>
      <el-table-column label="卖家" prop="seller" width="100px"></el-table-column>
      <el-table-column label="买家" prop="buyer" width="100px"></el-table-column>
    </el-table>
    <el-button @click="dialogVisible = true">下架商品</el-button>
    <el-dialog title="下架商品ID" :visible.sync="dialogVisible" :append-to-body="true" @close='dialogClose'>
        <el-form label-width="90px">
          <el-form-item label="商品ID">
            <el-input v-model="unSellId"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button @click="unSell">确定</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      recordList: [],
      unSellId: '',
      dialogVisible: false
    }
  },
  created () {
    this.getRecordList()
  },
  methods: {
    getRecordList () {
      this.$http.get('/commodityList')
        .then(response => {
          // console.log(response)
          this.recordList = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    unSell () {
      this.$http.post(`/adminUnSell?id=${this.unSellId}`)
        .then(response => {
          console.log(response)
          this.$message.success('删除成功')
          this.dialogClose()
          this.getRecordList()
        })
        .catch(error => {
          console.log(error)
          this.$message.error('删除失败')
        })
    },
    dialogClose () {
      this.dialogVisible = false
      this.unSellId = ''
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 30px;
}
.el-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
