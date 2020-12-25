<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息修改</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="admin" label-width="90px">
      <el-form-item label='账号'>
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
    <!-- 修改管理员信息 -->
    <el-dialog title="修改管理员信息" :visible.sync="dialogInfo" width="50%" @close="infoDialogClose">
      <el-form ref="infoDialogRef" :model="admin2" :rules="infoDialogRules" label-width="90px">
        <el-form-item label="账号" prop="serialNumber">
          <el-input v-model="admin2.serialNumber" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="admin2.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="admin2.sex"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="infoSure">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      admin: {
        serialNumber: '',
        name: '',
        sex: '',
        password: ''
      },
      admin2: {
        serialNumber: '',
        name: '',
        sex: '',
        password: ''
      },
      dialogInfo: false,
      // 修改信息的验证规则
      infoDialogRules: {
        serialNumber: [
          { required: true, message: '请输入登录账号', trigger: ['blur', 'change'] }
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created () {
    this.getAdminInfo()
  },
  methods: {
    getAdminInfo () {
      const token = window.sessionStorage.getItem('token')
      this.$http.get(`/adminInfo?serialNumber=${token}`)
        .then(response => {
          // console.log('asf')
          // console.log(response)
          this.admin = response.data
          this.admin2 = this.admin
          this.$refs.form.resetFields()
        })
        .catch(error => {
          console.log(error)
          this.$message.error('请求管理员信息失败')
        })
    },
    modifyAdminInfo () {
      this.admin2 = this.admin
      this.dialogInfo = true
    },
    // 关闭信息修改对话框
    infoDialogClose () {
      this.$refs.infoDialogRef.resetFields()
      this.dialogInfo = false
    },
    // 信息修改确认
    infoSure () {
      this.$http.post('/modifyAdminInfo', this.admin2)
        .then(response => {
          this.$message.success('修改管理员信息成功')
          // console.log(response)
          this.getAdminInfo()
          this.dialogInfo = false
        })
        .catch(error => {
          this.$message.error('修改失败')
          console.log(error)
        })
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
