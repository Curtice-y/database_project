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
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button @click="studentLogin">学生登录</el-button>
          <el-button @click="adminLogin">管理员登录</el-button>
          <el-button type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>""

<script>
export default {
  data () {
    // 绑定对象
    return {
      // 登录表单的绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 表单的验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录用户名', trigger: ['blur', 'change'] },
          { min: 3, message: '用户名最少需要 3 个字符', tigger: ['blur', 'change'] },
          { max: 10, message: '用户名不得超过 10 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: ['blur', 'change'] },
          { min: 6, message: '密码最少需要 6 个字符', trigger: ['blur', 'change'] },
          { max: 10, message: '密码不得超过 10 个字符', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    studentLogin () {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return
        this.$message.success('登陆成功')
        this.$router.push('/home')
      })
    },
    adminLogin () {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return
        this.$message.success('登陆成功')
        this.$router.push('/console')
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
