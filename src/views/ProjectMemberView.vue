<template>
    <div class="d-flex flex-wrap justify-content-between align-items-center my-2">
    <div class="d-flex flex-nowrap align-items-center">
        <h4 class="text-start fw-bold m-0"> Members </h4>
        <button class="btn btn-primary primary-btn ms-2 rounded-pill btn-sm">
            <i className="fa-solid fa-plus me-1"></i> Inivite member
        </button>
    </div>
    </div>
    <div class="d-flex flex-wrap justify-content-start align-items-start mt-2">
        <MemberCard v-for="m in data" :key="m.id" :member="m">

        </MemberCard>
    </div>
</template>


<script>

import MemberCard from '../components/MemberCard'
import { supabase } from '../supabaseClient'
import router from '../router'


export default {
    data(){
        return{
            data:[]
        }
    },
    props:{
        id:String
    },
    components:{
        MemberCard
    },
    mounted(){
        this.getMembers()
    },  
    methods:{
        async getMembers(){
            console.log(this.id)
            try{
               let { data , error} = await supabase.from("member").select().eq('project_id',this.id)

               if (error) throw error

               let members = await supabase.from("profile").select().in("user_id",data.map(e=>e.user_id))
               
               if (members.error) throw members.error
               
               this.data = members.data

            }
            catch(error){
                console.log(error)
            }
            finally{

            }
        }
    }
}

</script>