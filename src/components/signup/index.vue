<template>
  <div
    class="reg"
    v-loading.body="loading"
  >
    <router-link to="/">
      <i class="mdi close">close</i>
    </router-link>

    <el-form class="form" :model="ruleForm" :rules="rules" ref="regForm">
      <el-form-item label="Email" prop="email">
        <el-input type="email" v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="Password" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" auto-complete="off" />
      </el-form-item>
      <el-form-item label="Confirm Password" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" />
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm" nativeType="button" type="primary">Sign up</el-button>
        <el-button type="text" class="signin" @click="goToSignin">or sign in</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { signup } from 'src/actions/user'

  export default {
    name: 'signup',
    data () {
      return {
        loading: false,
        ruleForm: {
          email: '',
          pass: '',
          checkPass: ''
        },
        rules: Object.freeze({
          email: [
            { required: true, message: 'Please input email address', trigger: 'blur' },
            { type: 'email', message: 'Please input correct email address', trigger: 'blur' }
          ],
          pass: [
            { required: true, validator: this.validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true, validator: this.validatePass2, trigger: 'blur' }
          ],
        })
      };
    },
    methods: {
      goToSignin () {
        this.$router.push({ name: 'signin' })
      },
      submitForm (e) {
        this.$refs.regForm.validate(this.validate)
      },
      validate: async function (valid) {
        if (valid) {
          this.loading = true

          const [ err ] = await to(signup(this.ruleForm.email, this.ruleForm.checkPass))

          this.loading = false

          if (err) {
            return this.$message.error(err.message)
          }

          this.$refs.regForm.resetFields()
          this.$router.push('/')
          this.$message.success('Success sign up.')
        } else {
          return false;
        }
      },
      validatePass (rule, value, callback) {
        if (value === '') {
          callback(new Error('Please input the password'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.regForm.validateField('checkPass')
          }
          callback()
        }
      },
      validatePass2 (rule, value, callback) {
        if (value === '') {
          callback(new Error('Please input the password again'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('Two inputs don\'t match!'))
        } else {
          callback()
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

  .signin {
    margin-left: 20px;
  }
</style>
