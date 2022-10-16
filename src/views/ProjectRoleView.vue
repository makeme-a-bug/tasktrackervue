<template>
    <div class="d-flex flex-wrap justify-content-between align-items-center my-2">
    <div class="d-flex flex-nowrap align-items-center">
        <h4 class="text-start fw-bold m-0"> Roles </h4>
        <button class="btn btn-primary primary-btn ms-2 rounded-pill btn-sm" @click="toggleRoleForm">
            <i className="fa-solid fa-plus me-1"></i> Add Role
        </button>
    </div>
    </div>
    <div class="d-flex flex-wrap justify-content-start align-items-start mt-4">
        <RoleCard v-for="m in data" :key="m.id" :role="m" @open-form="toggleRoleForm" @role-delete="roleDelete">

        </RoleCard>
    </div>
    <RoleForm v-if="openForm" @role-added="roleAdded" @role-updated="roleUpdated" :project-id="id" :role-id="roleId" @close="toggleRoleForm" :permissions="permissions"></RoleForm>
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
            roleId:'',
            permissions:[],
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
        this.getPermissions()
    },  
    methods:{
        async getRoles(){
            console.log(this.id)
            console.log(this.roleId)
            try{
               let { data , error} = await supabase.from("role").select("*,permission(*)").eq('project_id',this.id)

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
        ,
        roleDelete(role){
            this.data = this.data.filter(e => e.id != role)

        },
        async getPermissions(){
            try{
                const {data,error} = await supabase.from('permission').select()

                if (error) throw error


                this.permissions = data
                
            }
            catch{

                console.log(error.message || error.error_description)

            }
        }
    }
}

</script>