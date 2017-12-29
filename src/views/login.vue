<template>
  <section class="login">
    <div class="login-content">
      <div class="input-group m-b-20">
        <span class="input-group-addon">
          <i class="md md-person"></i>
        </span>
        <div class="fg-line">
          <input type="text" class="form-control" v-model="username" placeholder="用户名" data-type="username-input">
        </div>
      </div>
      <div class="input-group m-b-20">
        <span class="input-group-addon">
          <i class="mdi mdi-key"></i>
        </span>
        <div class="fg-line">
          <input type="password" class="form-control" v-model="password" placeholder="密码" data-type="password-input">
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="checkbox">
        <label><input type="checkbox" value="">
          <i class="input-helper"></i>保持登录状态</label>
      </div>
      <button class="btn-login" @click="onBtnLogin">
        <i class="md md-arrow-forward"></i>
      </button>
    </div>
  </section>
</template>

<script>
import { login } from '../api/login';

export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onBtnLogin() {
      login({ username: this.username, password: this.password })
        .then(() => {
          this.$router.replace({ name: 'home' });
        })
        .catch(error => console.error(error));
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  // background-color: gray;
  position: relative;
  text-align: center;
  width: 100%;
  height: 100%;
  .login-content {
    background: #fff;
    box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
    border-radius: 2px;
    padding: 35px 55px 35px;
    width: 500px;
    height: 200px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    vertical-align: middle;
    position: absolute;
    text-align: left;
    .input-group {
      width: 100%;
    }
    .btn-login {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      position: absolute !important;
      line-height: 38px;
      top: 50%;
      margin-top: -25px;
      right: -25px;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
      color: #ffffff;
      background-color: #f44336;
    }
  }
}
.login:before {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #00bcd4;
  content: '';
  z-index: 0;
}
</style>
