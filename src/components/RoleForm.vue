<template>
    <FormModal @close="closeForm">
        <div class="d-flex secondary-bg p-3 rounded shadow" @click="click" id="role_form">
            <form class="form" >
            <h4 v-if="roleId" class="w-100 text-start mb-3"> Update Role </h4>
            <h4 v-else class="w-100 text-start mb-3"> Add Role </h4>
            <div class="mb-3 text-start w-100 d-flex flex-column">
                <label for="" class="mb-2"> Name </label>
                <input type="text" v-model="name" class="form-control">
            </div>

            <div class="mb-3 text-start w-100 d-flex flex-column">
                <label for="" class="mb-2"> Color </label>
                <input type="color" v-model="color" class="form-control">
            </div>

            <button v-if="roleId" class="btn btn-primary primary-btn w-100 mt-2" @click="update"> Update </button>
            <button v-else class="btn btn-primary primary-btn w-100 mt-2" @click="submit"> Add </button>
            </form>
            <div class="d-flex justify-content-center align-items-center flex-column preview ms-4">

                <div class="profile-img rounded-circle d-flex align-items-center justify-content-center mb-2" :style="`background-color:${color}`">
                    <i class="fa-solid fa-ribbon" ></i>
                </div>
                <h6 class="w-100 text-center fw-bold mt-2">{{name}}  </h6>
            </div>
        </div>
        
        
    </FormModal>

</template>

<script>

import FormModal from './FormModal'
import { supabase } from '../supabaseClient'
import Notiflix from 'notiflix';

export default{
    props:{
        projectId:String,
        roleId:String
    },
    data(){
        return{
            name:"",
            color:"#000000",
        }
    },
    components:{
        FormModal
    },
    mounted(){
        this.getRole()
    },
    methods:{
        click(e){
            e.stopPropagation()
        },
        async getRole(){
            console.log(this.roleId)
            if (!!this.roleId){
                Notiflix.Block.arrows("#role_form")

                try{
                    const { data,error } = await supabase
                    .from('role')
                    .select().eq('id',this.roleId)


                    if (error) throw error

                    this.name = data[0].name
                    this.color = data[0].color

                }
                catch (error){

                }
                finally{
                    Notiflix.Block.remove("#role_form")
                }
            }
        },
        async submit(e){
            e.preventDefault()
            Notiflix.Block.arrows("#role_form")
            try{
                const { data,error } = await supabase
                .from('role')
                .insert({color:this.color, name: this.name ,project_id:this.projectId}).select()

                if (error) throw error

                this.$emit("roleAdded",data[0])

                Notiflix.Notify.success("Role Added")

            }
            catch (error){
                console.log(error.message || error.error_description)
                Notiflix.Notify.failure("Role not Added")

            }
            finally{
                Notiflix.Block.remove("#role_form")

            }
            
        },
        async update(e){
            e.preventDefault()
            Notiflix.Block.arrows("#role_form")
            try{
                const { data,error } = await supabase
                .from('role')
                .update({color:this.color, name: this.name}).eq('id',this.roleId).select()

                if (error) throw error

                this.$emit("roleUpdated",data[0])

                Notiflix.Notify.success("Role Updated")

            }
            catch (error){
                console.log(error.message || error.error_description)
                Notiflix.Notify.failure("Role not Updated")

            }
            finally{
                Notiflix.Block.remove("#role_form")

            }
            
        },
        
    }

}


</script>




<style scoped>

.form{
    min-width: 300px;
    height: min-content;
}
.profile-img{
    font-size: 40px;
    background: #34996c;
    color: white;
    width: 80px;
    height: 80px;
}

.preview{
    min-width: 200px;
    border-left: 0.5px solid #d1d1d1;

}

</style>