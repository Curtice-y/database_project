<template>
    <div>
      <el-table :data="tradeList" :border="true">
      <el-table-column label="商品id" prop="id" width="80px"></el-table-column>
      <el-table-column label="名称" prop="name" width="120px"></el-table-column>
      <el-table-column label="价格" prop="price" width="85px"></el-table-column>
      <el-table-column label="图片" prop="picture" width="85px"></el-table-column>
      <el-table-column label="描述" prop="description" width="150px"></el-table-column>
      <el-table-column label="卖家" prop="seller" width="100px"></el-table-column>
      <el-table-column label="买家" prop="buyer" width="100px"></el-table-column>
    </el-table>
    </div>
</template>

<script>
export default {
  data () {
    return {
      tradeList: []
    }
  },
  created () {
    this.getTradeList()
  },
  methods: {
    getTradeList () {
      this.$http.get('/allTrade')
        .then(response => {
          console.log(response)
          this.tradeList = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
