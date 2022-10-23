<template>
    <div class="d-flex flex-wrap justify-content-between align-items-center my-2">
        <div class="d-flex flex-nowrap align-items-center">
            <h4 class="text-start fw-bold m-0"> Statuses </h4>
            <button class="btn btn-primary primary-btn ms-2 rounded-pill btn-sm" @click="toggleStatusForm">
                <i className="fa-solid fa-plus me-1"></i> Add Status
            </button>
        </div>
    </div>
    <div class="d-flex justify-content-start align-items-start flex-nowrap w-100 mt-3" style="overflow-x:auto;max-width: calc(100vw - 240px); height:90%" @drop="containerDrop" @dragover="allowDrop" >
        <TaskContainer v-for="s in data" :status="s" :key="s.id" @status-delete="statusDelete" :demo="true" @open-form="toggleStatusForm" :tasks="task" :dragable="true"/>
    </div>
    <StatusForm v-if='openForm' @status-added="statusAdded" :project-id="id" :status-id="statusID" @close="toggleStatusForm" @status-updated="statusUpdated">
        </StatusForm>
</template>


<script>
import StatusForm from '../components/StatusForm'
import { supabase } from '../supabaseClient'
import TaskContainer from '../components/TaskContainer'

export default{
    data(){
        return{
            data:[],
            openForm:false,
            statusID:null,
            task:[{
                id:"cvjjredf",
                title:"demo",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                created_at:"13 Mar 2022"
            }]
        }
    },
    props:{
        id:String,
    },
    components:{
        StatusForm,
        TaskContainer
    },
    mounted(){
        this.getData()
    },
    methods:{
        toggleStatusForm(e,id=''){
                this.statusID=id
                this.openForm = !this.openForm
        },  
        async getData(){
            try{
                const{data , error} =await supabase.from('status').select().eq('project_id',this.id)

                if (error) throw error

                this.data = data
                console.log(data)
            }
            catch (error){
                console.log(error.message || error.error_description)
            }
            finally{

            }
        },
        statusAdded(role){
            this.data.push(role)
            this.toggleStatusForm()
        },
        statusDelete(role){
            this.data = this.data.filter(e => e.id != role)

        },
        statusUpdated(role){
            console.log("ok")
            this.data = this.data.map(e=>{
                if(e.id == role.id){
                    return role
                }
                return e
            })
            this.toggleStatusForm()
        }
        ,
        containerDrop(ev){
            ev.preventDefault();

            let thisdiv = ev.target;

            console.log(thisdiv)
        },
        allowDrop(ev) {
            ev.preventDefault();
        }
    
    }
    
}
</script>

