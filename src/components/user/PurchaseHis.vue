<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人信息</el-breadcrumb-item>
            <el-breadcrumb-item>购买记录</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table :data="recordList" :border="true">
            <el-table-column label="商品id" prop="id" width="80px"></el-table-column>
            <el-table-column label="名称" prop="name" width="120px"></el-table-column>
            <el-table-column label="价格" prop="price" width="85px"></el-table-column>
            <el-table-column label="图片" prop="picture" width="85px"></el-table-column>
            <el-table-column label="描述" prop="none" width="150px"></el-table-column>
            <el-table-column label="卖家" prop="seller" width="100px"></el-table-column>
            <el-table-column label="买家" prop="buyer" width="100px"></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  data () {
    return {
      recordList: []
    }
  },
  created () {
    this.getRecordList()
  },
  methods: {
    getRecordList () {
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 30px;
}
</style>
