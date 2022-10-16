<template>
    <div class="h-100-70 task-cont rounded me-3 p-2 d-flex flex-column">
        <div class="d-flex  justify-content-between align-items-center w-100">
        <div class="d-flex align-items-center">
        <p class="fw-bold text-capitalize text-start m-0 me-2">
            {{status.name}}
        </p>
        <i class="fa-solid fa-pen action" @click="openForm" v-if="demo"></i>
        </div>
        <i class="fa-solid fa-trash delete text-danger action my-auto" @click="Delete" v-if="demo"></i>
        </div>
        
        <TaskCard v-for="t in tasks" :key="t.id" :status="status" :task="t" />


    </div>
</template>



<script>
import { supabase } from '../supabaseClient'
import Notiflix from 'notiflix';
import TaskCard from "../components/TaskCard"

export default {
    props:{
        tasks:Array,
        status:Object,
        demo:Boolean
    },
    components:{
        TaskCard 
    },
    methods:{
        async Delete(){
            try{
                const {data, error} = await supabase.from("status").delete().eq("id",this.status.id)

                if (error) throw error

                this.$emit("StatusDelete",this.status.id)

                Notiflix.Notify.success("Status deleted")
            }
            catch(error){
                console.log(error.message || error.error_description)
                Notiflix.Notify.failure("Status not deleted")

            }
            finally{

            }
        },
        openForm(){
            this.$emit("openForm",null,this.status.id)
        },
    }

}
</script>

<style scoped>

.task-cont{
    max-width: 450px;
    min-width: 250px;
    width: 100%;
    border:1px solid #80808045;
    height: calc(100vh - 140px);
    background: #F4F4F4;
}

.action{
    display: None;
    cursor: pointer;
    font-size:14px;
}

.task-cont:hover .action{
    display: unset;
}

.action:hover{
    color:#34996c
}

</style>