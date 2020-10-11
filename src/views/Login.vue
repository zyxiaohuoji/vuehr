<template>
  <div>
    <el-form :rules="rules" :model="loginForm" class="loginContainer">
      <h3 class="loginTitle">系统登陆</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" auto-complete="off" aria-placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" aria-placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-checkbox class="loginRemeber" v-model="checked"></el-checkbox>
      <el-button type="primary" style="width: 100%;">登陆</el-button>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
          return{
            loginForm:{
              username: 'admin',
              password: '123'
            },
            checked:true,
            rules:{
                username:[{require: true, message: '请输入用户名', trigger: 'blur'}],
                password:[{require: true, message: '请输密码', trigger: 'blur'}]
            }
          }
        }
    }
</script>

<style>
  .loginContainer {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 150px auto;
    width: 350px;
    padding: 20px 25px 25px 20px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .loginTitle{
    margin: 15px auto 20px auto;
    text-align: center;
    color: #505458;
  }
  .loginRemeber{
    text-align: left;
    margin: 0px 0px 15px 0px;
  }
</style>