<template>
    <div class="d-flex flex-wrap justify-content-between align-items-center">
    <h4 class="text-start fw-bold"> Roles </h4>
    <button class="btn btn-primary primary-btn" @click="toggleRoleForm">
        <i className="fa-solid fa-plus me-1"></i> Add Role
    </button>

    </div>
    <div class="d-flex flex-wrap justify-content-start align-items-start mt-2">
        <RoleCard v-for="m in data" :key="m.id" :role="m" @open-form="toggleRoleForm">

        </RoleCard>
    </div>
    <RoleForm v-if="openForm" @role-added="roleAdded" @role-updated="roleUpdated" :project-id="id" :role-id="roleId" @close="toggleRoleForm"></RoleForm>
</template>


<script>

import RoleCard from '../components/RoleCard'
import { supabase } from '../supabaseClient'
import RoleForm from '../components/RoleForm'
import router from '../router'


export default {
    data(){
        return{
            data:[],
            openForm:false,
            roleId:''
        }
    },
    props:{
        id:String
    },
    components:{
        RoleCard,
        RoleForm
    },
    mounted(){
        this.getRoles()
    },  
    methods:{
        async getRoles(){
            console.log(this.id)
            console.log(this.roleId)
            try{
               let { data , error} = await supabase.from("role").select().eq('project_id',this.id)

               if (error) throw error
               
               this.data = data

            }
            catch(error){
                console.log(error)
            }
            finally{

            }
        },
        toggleRoleForm(e,id=''){
            this.roleId=id
            this.openForm = !this.openForm
        },
        roleAdded(role){
            this.data.push(role)
            this.toggleRoleForm()

        },
        roleUpdated(role){
            this.data = this.data.map(e=>{
                if(e.id == role.id){
                    return role
                }
                return e
            })
            this.toggleRoleForm()

        }
    }
}

</script>