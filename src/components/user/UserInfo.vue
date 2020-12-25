<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息修改</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label='ID'>
        <span>{{user.serialNumber}}</span>
      </el-form-item>
      <el-form-item label='姓名'>
        <span>{{user.name}}</span>
      </el-form-item>
      <el-form-item label='性别'>
        <span>{{user.sex}}</span>
      </el-form-item>
      <el-form-item label='学院'>
        <span>{{user.college}}</span>
      </el-form-item>
      <el-form-item label='专业'>
        <span>{{user.major}}</span>
      </el-form-item>
      <el-form-item label='宿舍'>
        <span>{{user.dormitory}}</span>
      </el-form-item>
      <el-form-item label='密码'>
        <span>{{user.password}}</span>
      </el-form-item>
      <el-form-item label='生日'>
        <span>{{user.birthday}}</span>
      </el-form-item>
      <el-form-item class='btns'>
          <el-button>修改用户信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        serialNumber: '',
        name: 'aaa',
        ser: '',
        college: '',
        major: '',
        dormitory: 'sss',
        password: '',
        birthday: ''
      }
    }
  },
  created () {
  },
  methods: {
    getUserInfo () {
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
