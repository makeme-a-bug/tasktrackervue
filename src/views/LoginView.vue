/* eslint-disable */
<template>

  <MainWrapper add-classes="flex-column justify-content-center align-items-center">
        <div class="login-card p-4 shadow">
            <img src="https://ffjwvmpxsrgtbegincmd.supabase.co/storage/v1/object/sign/planit/full-logo.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGFuaXQvZnVsbC1sb2dvLnN2ZyIsImlhdCI6MTY2NTMzNTUxMCwiZXhwIjoxOTgwNjk1NTEwfQ.wt3xpzg11ns3K7Ks5p30yjOcI4cnO5lBaCGbMrwBC0Y" alt="">
            <form class="d-flex justify-content-start align-items-start flex-column">
                <label for="" class="text-danger text-center my-2" v-if="error"> E-mail or Password is incorrect </label>
                <div class="mb-3 text-start w-100">
                    <label for="" class="form-label">E-mail</label>
                    <input type="text" class="form-control form-control-lg" v-model="email" @input="changeHandler" required>
                </div>
                
                <div class="mb-3 text-start w-100">
                    <div class="d-flex flex-wrap justify-content-between align-items-center">
                    <label for="" class="form-label">Password</label>
                    <label for="" class="form-label secondary-text">Forgot password?</label>
                    </div>
                    <input type="password" class="form-control form-control-lg" v-model="password" @input="changeHandler" required>
                </div>
                
                <button class="btn btn-primary btn-lg w-100 mt-2 primary-btn" @click="submit" > <span v-if="loader"> <i class="fa-solid fa-circle-notch fa-spin"></i> Logging in </span> <span v-else> Log in </span>   </button>
            </form>
        </div>
        <div class="login-card p-4 shadow mt-2">
            <p class="m-0">Don’t have a Planit account ? <span class="primary-text fw-bold">Create now</span> </p>
        </div>
  </MainWrapper>

</template>

<script>
// @ is an alias to /src
import { supabase } from '../supabaseClient'
import router from "../router";
import MainWrapper from '../components/MainWrapper'

export default {
  name: "LoginView",
  data() {
    return {
      email: '',
      password:'',
      error:null,
      loader:false,
    }
  },
  components: {
    MainWrapper
  },
  methods:{
    async submit(e){
        e.preventDefault()
        console.log(this.email,this.password)
        try{
            this.loader = true
            const { user, session, error } = await supabase.auth.signIn({
            email: this.email,
            password: this.password,
            })

            if (error) throw error

            console.log(session,user)
            router.push(`/projects`)

        }
        catch (error){
            if("message" in error){
                this.error = error.message
            }
            else{
                alert(error.error_description)
            }
        } 
        finally{
            this.loader = false

        }  
    },
    changeHandler(){
        this.error = null
    }
  }
};
</script>

<style scoped>
.form-control{
    font-size: 14px;
    padding: 10px;
}
.form-control:focus{
    font-size: 14px;
    padding: 10px;
}
</style>