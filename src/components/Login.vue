<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登陆表单区 -->
      <el-form ref="loginFormRef" :model= "loginForm" :rules="loginFormRules" label-width="80px"  class="Login_form">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="serialNumber">
          <el-input v-model="loginForm.serialNumber"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button @click="studentLogin">学生登录</el-button>
          <el-button @click="adminLogin">管理员登录</el-button>
          <el-button type="primary" @click="dialogVisible = true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 注册对话框 -->
    <el-dialog title="注册" :visible.sync="dialogVisible" width="50%" @close='dialogClose' :append-to-body="true">
      <el-form ref="dialogFormRef" :model="dialogForm" :rules="dialogFormRules" label-width="90px">
        <el-form-item label="账号" prop="serialNumber">
          <el-input v-model="dialogForm.serialNumber"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="dialogForm.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="dialogForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-input v-model="dialogForm.college"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="dialogForm.major"></el-input>
        </el-form-item>
        <el-form-item label="宿舍" prop="dormitory">
          <el-input v-model="dialogForm.dormitory"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSure">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>""

<script>
export default {
  data () {
    // 绑定对象
    return {
      // 登录表单的绑定对象
      loginForm: {
        serialNumber: '201808',
        password: '123456'
      },
      // 表单的验证规则
      loginFormRules: {
        serialNumber: [
          { required: true, message: '请输入登录账号', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: ['blur', 'change'] }
        ]
      },
      // 是否显示对话框
      dialogVisible: false,
      dialogForm: {
        serialNumber: '',
        password: '',
        name: '',
        sex: '',
        college: '',
        major: '',
        dormitory: ''
      },
      // 注册的验证规则
      dialogFormRules: {
        serialNumber: [
          { required: true, message: '请输入登录账号', trigger: ['blur', 'change'] }
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    // 学生登录
    studentLogin () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        this.$http.get(`/user?serialNumber=${this.loginForm.serialNumber}&password=${this.loginForm.password}`)
          .then(response => {
            // console.log(response)
            this.$message.success('登录成功')
            window.sessionStorage.setItem('token', response.data.serialNumber)
            this.$router.push('/home')
          })
          .catch(error => {
            this.$message('账号或密码错误')
            console.log(error)
          })
      })
    },
    // 管理员登录
    adminLogin () {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return
        this.$http.get(`/admin?serialNumber=${this.loginForm.serialNumber}&password=${this.loginForm.password}`)
          .then(response => {
            // console.log(response)
            this.$message.success('登录成功')
            window.sessionStorage.setItem('token', response.data.serialNumber)
            this.$router.push('/console')
          })
          .catch(error => {
            this.$message.error('账号或密码错误')
            console.log(error)
          })
      })
    },
    // 点击注册按钮
    register () {
      this.dialogVisible = true
    },
    // 对话框关闭
    dialogClose () {
      this.dialogVisible = false
      this.$refs.dialogFormRef.resetFields()
    },
    // 点击对话框的确认
    dialogSure () {
      this.$refs.dialogFormRef.validate(valid => {
        if (!valid) return
        this.$http.post('/register', this.dialogForm)
          .then(response => {
            this.$message.success('注册成功')
            this.dialogClose()
          })
          .catch(error => {
            this.$message.error('注册失败')
            console.log(error)
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 背景
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
// 登录盒
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%; // 移动全图的50%距离
  top: 50%;
  transform: translate(-50%, -50%); // 移动自身的50%距离
  // 图标
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute; // 绝对定位, 进行页面上的位移
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
}
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.Login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
