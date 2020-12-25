<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息修改</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 用户信息框 -->
    <el-form ref="form" :model="user" label-width="90px" class="el-form1">
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
          <el-button @click="openInfo">修改用户信息</el-button>
          <el-button @click="openPassword">修改密码</el-button>
      </el-form-item>
    </el-form>
    <!-- 修改信息对话框 -->
    <el-dialog title="修改用户信息" :visible.sync="dialogInfo" width="50%" @close='infoDialogClose' class="el-form2">
      <el-form ref="infoDialogRef" :model="userr" :rules="infoDialogRules" label-width="90px">
        <el-form-item label="账号" prop="serialNumber">
          <el-input v-model="userr.serialNumber" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userr.password" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userr.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="userr.sex"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-input v-model="userr.college"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="userr.major"></el-input>
        </el-form-item>
        <el-form-item label="宿舍" prop="dormitory">
          <el-input v-model="userr.dormitory"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="infoSure">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改密码对话框 -->
    <el-dialog title="修改密码" :visible.sync="dialogPassword" width="50%" @close='passwordDialogClose'>
      <el-form ref="passwordDialogRef" :model="user" :rules="passwordDialogRules" label-width="90px">
        <el-form-item label="密码" prop="password">
          <el-input v-model="userr.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="passwordSure">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        serialNumber: '',
        name: '',
        sex: '',
        college: '',
        major: '',
        dormitory: '',
        password: '',
        birthday: ''
      },
      userr: {
        serialNumber: '',
        name: '',
        sex: '',
        college: '',
        major: '',
        dormitory: '',
        password: '',
        birthday: ''
      },
      dialogInfo: false,
      dialogPassword: false,
      // 修改信息的验证规则
      infoDialogRules: {
        serialNumber: [
          { required: true, message: '请输入登录账号', trigger: ['blur', 'change'] }
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] }
        ]
      },
      // 修改密码的验证规则
      passwordDialogRules: {
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      const token = window.sessionStorage.getItem('token')
      this.$http.get(`/userInfo?serialNumber=${token}`)
        .then(response => {
          // console.log('asf')
          // console.log(response)
          this.user = response.data
          this.userr = this.user
          this.$refs.form.resetFields()
        })
        .catch(error => {
          console.log(error)
          this.$message.error('请求用户信息失败')
        })
    },
    // 关闭信息修改对话框
    infoDialogClose () {
      this.$refs.infoDialogRef.resetFields()
      this.dialogInfo = false
    },
    // 关闭密码修改对话框
    passwordDialogClose () {
      this.$refs.passwordDialogRef.resetFields()
      this.dialogPassword = false
    },
    // 打开信息修改对话框
    openInfo () {
      this.userr = this.user
      this.dialogInfo = true
    },
    // 打开密码修改对话框
    openPassword () {
      this.userr = this.user
      this.dialogPassword = true
    },
    // 信息修改确认
    infoSure () {
      this.$http.post('/modifyUserInfo', this.userr)
        .then(response => {
          this.$message.success('修改用户信息成功')
          // console.log(response)
          this.getUserInfo()
          this.dialogInfo = false
        })
        .catch(error => {
          this.$message.error('修改失败')
          console.log(error)
        })
    },
    // 密码修改确认
    passwordSure () {
      this.$http.post(`modifyUserPassword?serialNumber=${this.user.serialNumber}&newPassword=${this.userr.password}`)
        .then(response => {
          this.$message.success('修改密码成功')
          this.getUserInfo()
          this.dialogPassword = false
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
.el-form1 {
  margin-top: 30px;
}
.el-form2 {
  margin-top: 10px;
}
.el-form-item {
  margin-top: 1px;
}
.btns {
  display: flex;
  justify-content: flex-end;
}

</style>
