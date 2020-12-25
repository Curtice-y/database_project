<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息修改</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label='ID'>
        <span>{{admin.serialNumber}}</span>
      </el-form-item>
      <el-form-item label='姓名'>
        <span>{{admin.name}}</span>
      </el-form-item>
      <el-form-item label='性别'>
        <span>{{admin.sex}}</span>
      </el-form-item>
      <el-form-item class='btns'>
          <el-button @click="modifyAdminInfo"> 修改管理员信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      admin: {
        serialNumber: '',
        name: 'aaa',
        sex: '',
        password: ''
      }
    }
  },
  created () {
    this.getAdminInfo()
  },
  methods: {
    getAdminInfo () {
    },
    modifyAdminInfo () {
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  margin-top: 50px;
}
.el-form-item {
  margin-top: 1px;
}
.btns {
  display: flex;
  justify-content: flex-end;
}

</style>
