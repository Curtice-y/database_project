<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>上架商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="commodityRef" :model="commodity" label-width="90px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="commodity.name"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="commodity.price"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="picture">
        <el-input v-model="commodity.picture"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="commodity.description"></el-input>
      </el-form-item>
      <el-form-item label="买家" prop="buyer">
        <el-input v-model="commodity.buyer"></el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button @click="sell">确认发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commodity: {
        name: '',
        price: '',
        picture: 'none',
        description: '',
        seller: '',
        buyer: ''
      }
    }
  },
  created () {
    this.setSeller()
  },
  methods: {
    sell  () {
      this.$http.post('/sell', this.commodity)
        .then(response => {
          console.log(response)
          this.$message.success('发布成功')
        })
        .catch(error => {
          this.$message.error('发布失败, 价格应为double数值')
          console.log(error)
        })
    },
    setSeller () {
      this.commodity.seller = window.sessionStorage.getItem('token')
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  margin-top: 30px;
}
</style>
