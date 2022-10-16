<template>
    <div class="role-card d-flex justify-content-center secondary-bg align-items-center flex-column rounded shadow me-3 position-relative">
        <i class="fa-solid fa-trash delete text-danger action" @click="deleteRole"></i>
        <div class="profile-img rounded-circle d-flex align-items-center justify-content-center mb-2" :style="`background-color:${role.color}`">
            <i class="fa-solid fa-ribbon" ></i>
        </div>
        <h6 class="w-100 text-center fw-bold mt-2">{{role.name}} <i class="fa-solid fa-pen action" @click="openForm"></i> </h6>
    </div>
</template>


<script>
import { supabase } from '../supabaseClient'
import Notiflix from 'notiflix';


export default{
    data(){
        return{
            permissions:[]
        }
    },
    props:{
        role:Object
    },
    methods:{
        openForm(){
            this.$emit("openForm",null,this.role.id)
        },
        async deleteRole(){
            try{
                const {data, error} = await supabase.from("role").delete().eq("id",this.role.id)

                if (error) throw error

                this.$emit("roleDelete",this.role.id)

                Notiflix.Notify.success("Role deleted")
            }
            catch(error){
                console.log(error.message || error.error_description)
                Notiflix.Notify.success("Role not deleted")

            }
            finally{

            }
        }
    }
}

</script>


<style scoped >
.role-card{
    max-width: 200px;
    min-width: 150px;
    width: 100%;
    min-height: 200px;
}

.action{
    display: None;
    cursor: pointer;
}

.role-card:hover .action{
    display: unset;
}

.action:hover{
    color:#34996c
}

.profile-img{
    font-size: 40px;
    background: #34996c;
    color: white;
    width: 80px;
    height: 80px;
}

.delete{
    position: absolute;
    top:10px;
    right: 10px;
}

.permission-text{
    font-size:11px;
}

</style>