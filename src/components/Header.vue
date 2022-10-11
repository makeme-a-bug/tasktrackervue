<template class="primary-bg">
    <div class="d-flex justify-content-between align-items-center header-div px-2" v-if="loggedIn">
        <div class="nav-start">
            <img  class="logo" src="https://ffjwvmpxsrgtbegincmd.supabase.co/storage/v1/object/sign/planit/logo.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGFuaXQvbG9nby5zdmciLCJpYXQiOjE2NjUzMzk2NzksImV4cCI6MTk4MDY5OTY3OX0.m9e8r7FkxQiKR5y_KTmw7QObcMsjTeWrdcHzJGl_KyY" alt="">
        </div>
        <div class="nav-middle">
            <router-link to="/projects" class="header-link mx-2">Projects</router-link>
            <router-link to="/projects" class="header-link mx-2">Tasks</router-link>
        </div>
        <div class="nav-end">
            <dropdown-menu menu-title="Vue Dropdown Menu" dark-mode="auto" :menuItems="items">

            </dropdown-menu>
            <!-- <button class="btn btn-primary primary-btn mx-2" style="cusor:pointer" @click="logout"> Log out</button> -->
        </div>
    </div>
    <div v-else class="d-flex justify-content-between align-items-center header-div px-2 small-header mx-auto">
        <div class="nav-start">
            <img  class="full-logo" src="https://ffjwvmpxsrgtbegincmd.supabase.co/storage/v1/object/sign/planit/full-logo.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGFuaXQvZnVsbC1sb2dvLnN2ZyIsImlhdCI6MTY2NTMzNTUxMCwiZXhwIjoxOTgwNjk1NTEwfQ.wt3xpzg11ns3K7Ks5p30yjOcI4cnO5lBaCGbMrwBC0Y" alt="">
        </div>
        <div class="nav-middle">
        </div>
        <div class="nav-end">
            <router-link to="/login" class="header-link mx-2">Log in</router-link>
        </div>
    </div>


</template>


<script>
import { supabase } from '../supabaseClient'
import router from "../router";
import DropdownMenu from '../components/DropdownMenu.vue'

export default{
    data(){
        return{
            loggedIn:false,
            items:[{
                icon:"fa-solid fa-right-from-bracket",
                text:"Log out"  ,
                action:this.logout
            },{
                icon:"fa-solid fa-user",
                text:"Account"  ,
                action:()=>{ router.push('/me')}
            }]
        }
    },
    components:{
       DropdownMenu 
    },
    mounted(){
        const user = supabase.auth.user()
        if (!!user){
            this.loggedIn = true
        }
    },
    methods:{
        async logout(){
            try{
                const { error } = await supabase.auth.signOut()
                if (error) throw error

                router.push('/login')
            }
            catch{
                if('message' in error){
                    alert(message)
                }
                else{
                    alert(error.error_description)
                }
            }
            finally{

            }

        }
    }
}
</script>
