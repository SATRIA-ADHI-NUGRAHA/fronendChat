<template>
  <div class="container-fluid" style="background: #E5E5E5;">
    <div class="box-form">
      <div class="d-flex justify-content-center pt-4">
        <div class="card m-5">
          <div>
           <h2><b>Login</b></h2>
          </div>
          <div class="card-body m-3">
            <h5>Hi, Welcome back!</h5>
            <form @submit.prevent="onLogin()">
              <div class="form-group">
                <label for="username">Email</label>
                <input v-model="form.email" type="email" class="form-control" id="username" aria-describedby="emailHelp" placeholder="username" required>
                <div class="form-border"></div>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <b-input-group>
                  <input v-model="form.password" type="password" class="form-control" id="password" placeholder="input your password" required>
                  <b-input-group-append class="pt-3">
                    <b-icon icon="eye"></b-icon>
                  </b-input-group-append>
                  <div class="form-border"></div>
                </b-input-group>
              </div>
              <h6 class="pb-3" style="text-align: right;"><router-link to="/">Forgot password ?</router-link></h6>
              <button type="submit" class="p-2 btn btn-primary btn-block">Login</button>
              <h6 class="pt-4">---------------  Login with  ---------------</h6>
              <button type="submit" class="p-2 mt-4 btn btn-outline-primary btn-block"><img class="google" src="../assets/google.png" alt=""> Google</button>
              <h6 class="pt-4">Don’t have an account? <router-link to="/register">Sign Up</router-link></h6>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      actionLogin: 'users/login'
    }),
    onLogin () {
      this.actionLogin(this.form).then((response) => {
        // console.log(response)
        if (response === 'berhasil login') {
          this.$router.push({
            path: '/',
            query: {
              username: this.form.email
            }
          })
        // window.location = '/'
        } else {
          alert(response)
        }
      }).catch((err) => {
        alert(err)
      })
    }
  }
}
</script>

<style scoped>
.card {
  padding-top: 30px;
  width: 400px;
  height: 700px;
  border-radius: 30px;
}
h2, h6 {
  text-align: center;
}
.btn {
  border-radius: 30px;
}
.form-control {
    border: 0px;
}
.form-border {
    background: -webkit-linear-gradient(right, #a6f77b, #2ec06f);
    height: 1px;
    width: 100%;
}
.google {
  width: 15px;
  height: 15px;
  margin-right: 10px;
  margin-bottom: 4px;
}
</style>
