<template>
    <div class="card project-card position-relative d-flex flex-column justify-content-center align-items-center shadow mx-2" @click="goto">
        <img class="mb-2" src="https://ffjwvmpxsrgtbegincmd.supabase.co/storage/v1/object/sign/planit/kanban.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGFuaXQva2FuYmFuLnN2ZyIsImlhdCI6MTY2NTM0MTIzNywiZXhwIjoxOTgwNzAxMjM3fQ.JfZAuBQZWzgQlSKUPvKjXN7mbba6w4hkTbzkVU99NBA" alt="">
        <p class="m-0 mt-2 fw-bold"> {{name}} </p>
        <div class="position-absolute action1">
            <button v-if="user.id == userId" class="btn btn-sm btn-danger mx-1" @click="conformDelete">
            <i class="fa-solid fa-trash"></i>
            </button>        
            <button class="btn btn-sm btn-primary secondary-btn" @click="editProject">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
        </div>
    </div>
</template>


<script>
import { store } from '../store';
import Notiflix from 'notiflix';
import router from "../router";
import { supabase } from '../supabaseClient'

export default {
    data(){
        return {
            user:store.user
        }
    },
    props:{
        name:String,
        id:String,
        userId:String,
    },
    methods:{
        goto(){
            console.log(this.id)
        },
        conformDelete(e){
            e.stopPropagation()
            this.delete()
        },
        async delete(){
            Notiflix.Notify.info(`Deleting project ${this.name}`)
            try{
                const { status , error } = await supabase
                .from('project')
                .delete()
                .eq('id', this.id).select()
                
                console.log(status)

                if (error) throw error

                if (status == 204) throw {message : "you can't delete this project" }
                
                Notiflix.Notify.success(`Project ${this.name} Deleted`)

                this.$emit("remove-project",this.id)
            }
            catch (error){
                Notiflix.Notify.failure(error.error_description || error.message)
            }
            finally{
            }
            
        },
        editProject(){
            router.push(`/projects/edit/${this.id}`)
        }
    }
}
</script>


<style scoped>

.card:hover .action1 , .card:hover .action2{
 display: unset;
}

.action1{
    top: -10px;
    right: 0;
    display: None;
}
.action2{
    top: -10px;
    right: 35px;
    display: None;
}

</style>