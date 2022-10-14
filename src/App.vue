<template>
  <router-view />
</template>


<script>

import { store } from './store'
import { supabase } from './supabaseClient'

export default {
    setup() {
      supabase.auth.onAuthStateChange((event, session) => {
        if(!!session){
          store.user = session.user
        }
        else{
          store.user = null
        }
        console.log(event)
      })

      return {
        store,
      }
      
    },
    mounted(){
      this.getUser()
    },
    methods:{
        async getUser(){
          try{
            const{user,error} = await supabase.auth.getUser()
            console.log(user,'app')
              if (error) throw error

              store.user = user
          }
          catch(error){
            
          }
        }
      }
  }

</script>



