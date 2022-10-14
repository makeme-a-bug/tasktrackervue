<template>
    <div class="card project-card position-relative d-flex flex-column justify-content-center align-items-center shadow mx-2" @click="goto">
        <img class="mb-2" src="https://ffjwvmpxsrgtbegincmd.supabase.co/storage/v1/object/sign/planit/kanban.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGFuaXQva2FuYmFuLnN2ZyIsImlhdCI6MTY2NTM0MTIzNywiZXhwIjoxOTgwNzAxMjM3fQ.JfZAuBQZWzgQlSKUPvKjXN7mbba6w4hkTbzkVU99NBA" alt="">
        <p class="m-0 mt-2 fw-bold"> {{name}} </p>
        <button class="btn btn-sm btn-danger position-absolute action1" @click="conformDelete">
            <i class="fa-solid fa-trash"></i>
        </button>        
        <button class="btn btn-sm btn-primary secondary-btn position-absolute action2">
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
    </div>
</template>


<script>
import Notiflix from 'notiflix';
import router from "../router";
import { supabase } from '../supabaseClient'

export default {
    props:{
        name:String,
        id:String,
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
                const { error } = await supabase
                .from('project')
                .delete()
                .eq('id', this.id)
                

                console.log(await supabase
                .from('project')
                .delete()
                .eq('id', this.id))

                if (error) throw error
                
                Notiflix.Notify.success(`Project ${this.name} Deleted`)

                this.$emit("remove-project",this.id)
            }
            catch (error){
                alert(error.error_description || error.message)
            }
            finally{
            }
            
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