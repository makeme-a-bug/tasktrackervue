<template>
    <div class="d-flex flex-wrap justify-content-between align-items-center my-2">
        <div class="d-flex flex-nowrap align-items-center">
            <h4 class="text-start fw-bold m-0"> Main </h4>
            <!-- <button class="btn btn-primary primary-btn ms-2 rounded-pill btn-sm" @click="toggleStatusForm">
                <i className="fa-solid fa-plus me-1"></i> Add Status
            </button> -->
        </div>
    </div>
    <div class="d-flex flex-nowrap justify-content-start align-items-center">
        <div class="d-flex justify-content-start align-items-start flex-nowrap w-100 mt-3" style="overflow-x:auto;max-width: calc(100vw - 220px); height:90%" @drop="containerDrop" @dragover="allowDrop" >
            <TaskContainer v-for="s in statuses" :status="s" :key="s.id" :tasks="tasks.filter(e=> e.status_id == s.id)"/>
        </div>
    </div>
</template>



<script>
import TaskContainer from '../components/TaskContainer'
import { supabase } from '../supabaseClient'

export default{
    data(){
        return{
            statuses: [],
            tasks:[]
        }
    },
    props:{
        id:String
    },
    components:{
        TaskContainer
    },

    mounted(){
        this.getStatuses()
        this.getTasks()
    },

    methods:{
        async getStatuses(){
            try{
                const{data , error} =await supabase.from('status').select().eq('project_id',this.id)

                if (error) throw error

                this.statuses = data
            }
            catch (error){
                console.log(error.message || error.error_description)
            }
            finally{

            }
        },

        async getTasks(){
            try{
                const{data , error} =await supabase.from('task').select().eq('project_id',this.id)

                if (error) throw error

                this.tasks = data
            }
            catch (error){
                console.log(error.message || error.error_description)
            }
            finally{

            }
        }
    }
}

</script>

