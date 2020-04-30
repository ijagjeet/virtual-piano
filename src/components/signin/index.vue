<template>
  <div
    class="reg"
    v-loading.body="loading"
  >
    <router-link to="/">
      <i class="mdi close">close</i>
    </router-link>

    <el-form class="form" :model="ruleForm" :rules="rules" ref="signInForm">
      <el-form-item label="Email" prop="email">
        <el-input type="email" v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="Password" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" auto-complete="off" />
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm" nativeType="button" type="primary">Sign in</el-button>
        <el-button type="text" class="signup" @click="goToSignup">or sign up</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { signin } from 'src/actions/user'

  export default {
    name: 'signin',
    data () {
      return {
        loading: false,
        ruleForm: {
          email: '',
          pass: ''
        },
        rules: Object.freeze({
          email: [
            { required: true, message: 'Please input email address', trigger: 'blur' },
            { type: 'email', message: 'Please input correct email address', trigger: 'blur' }
          ],
          pass: [
            { required: true, trigger: 'blur' }
          ]
        })
      };
    },
    methods: {
      goToSignup () {
        this.$router.push({ name: 'signup' })
      },
      submitForm () {
        this.$refs.signInForm.validate(this.validate)
      },
      validate: async function (valid) {
        if (valid) {
          this.loading = true

          const [ err ] = await to(signin(this.ruleForm.email, this.ruleForm.pass))

          this.loading = false

          if (err) {
            return this.$message.error(err.message)
          }

          this.$refs.signInForm.resetFields()
          this.$router.push('/')
          this.$message.success('Success sign in.')
        } else {
          return false;
        }
      }
    }
  }
</script>

<style scoped>
  .reg {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
  }

  .close {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    color: black;
  }

  .form {
    width: 400px;
  }

  .signup {
    margin-left: 20px;
  }
</style>
