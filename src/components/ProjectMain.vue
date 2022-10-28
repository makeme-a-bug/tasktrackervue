<template>
    <MainWrapper add-classes="flex-nowrap">
        <div class="side-bar h-100-60 d-flex flex-column" id="side_bar">
            <div class="d-flex justify-content-start align-items-center section">
                <img src="https://ffjwvmpxsrgtbegincmd.supabase.co/storage/v1/object/sign/planit/kanban.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGFuaXQva2FuYmFuLnN2ZyIsImlhdCI6MTY2NTM0MTIzNywiZXhwIjoxOTgwNzAxMjM3fQ.JfZAuBQZWzgQlSKUPvKjXN7mbba6w4hkTbzkVU99NBA" alt="" class="img my-3 mx-2" />
                <div className="d-flex flex-column ms-1">
                    <p class='m-0 mb-1 fw-normal fw-bold'>{{!!project && project.name}}</p>
                </div>
            </div>
            <div class="section mt-3 w-100 d-flex justify-content-between align-items-center flex-column pb-3">
                <button class="btn btn-primary btn-sm primary-btn rounded-pill me-auto ms-3 px-3" @click="toggleForm">
                    <i className="fa-solid fa-plus me-1"></i> Create Task
                </button>
                <router-link :to="`/project/${id}`" class="text-start mt-3 link" exact>
                    <i className="fa-solid fa-house-chimney-window mx-2"></i> Main project
                </router-link>
                <router-link :to="`/project/${id}/myTasks`" class="text-start mt-2 link">
                    <i className="fa-solid fa-list-check mx-2"></i> My Tasks
                </router-link>
            </div>
            <div class="section mt-3 w-100 d-flex justify-content-between align-items-center flex-column pb-3">
                <router-link :to="`/project/${id}/members`" class="text-start mt-2 link">
                    <i className="fa-solid fa-users mx-2"></i> Members
                </router-link>
                <router-link :to="`/project/${id}/roles`" class="text-start mt-2 link">
                    <i className="fa-solid fa-ribbon mx-2"></i> Roles
                </router-link>
                <router-link :to="`/project/${id}/statuses`" class="text-start mt-2 link">
                    <i className="fa-solid fa-ribbon mx-2"></i> Statuses
                </router-link>
            </div>
            <div class="section mt-3 w-100 d-flex justify-content-between align-items-center flex-column pb-3">
                <router-link :to="`/project/${id}/notifications`" class="text-start mt-2 link">
                    <i className="fa-solid fa-bell mx-2"></i> Notifications
                </router-link>
                <router-link :to="`/project/${id}/roles`" class="text-start mt-2 link">
                    <i className="fa-solid fa-inbox mx-2"></i> Archived tasks
                </router-link>
                <router-link to="/projects" class="text-start mt-2 link text-danger">
                    <i className="fa-solid fa-box-archive mx-2"></i> Archive project
                </router-link>
            </div>
            
        </div>
        <div class="main-content h-100-60 p-2">
            <router-view @open-task-form="toggleForm"/>
        </div>
        <TaskForm @close="toggleForm" v-if="openForm" :project-id="id" :statuses="statuses"/>
    </MainWrapper>
</template>

<script>
import MainWrapper from './MainWrapper.vue'
import Notiflix from 'notiflix';
import {store} from '../store'
import { supabase } from '../supabaseClient'
import TaskForm from './TaskForm'

export default {
    data(){
        return{
            project:null,
            taskId:null,
            openForm:false,
            statuses:[],
        }
    },
    props: {
        id:String,
    },
    mounted(){
        this.getProject()
        this.getStatus()
    },
    components:{
        MainWrapper,
        TaskForm
    },
    methods:{
        toggleForm(e,id=''){
            this.taskId=id
            this.openForm = !this.openForm
        },
        async getStatus(){
            try{
                const { data , error } = await supabase
                .from('status').select().eq("project_id",this.id)
                
                if (error) throw error
                
                this.statuses = data

            }
            catch (error){
                alert(error.error_description || error.message)
            }
            finally{
            }
        },
        async getProject(){
            Notiflix.Block.arrows("#side_bar")
            try{
                const { data , error } = await supabase
                .from('project').select().eq("id",this.id)
                

                if (error) throw error
                
                this.project = data[0]
                console.log(this.project.name,"lmao")

            }
            catch (error){
                alert(error.error_description || error.message)
            }
            finally{
                Notiflix.Block.remove("#side_bar")
            }
        },
    }
}

</script>


<style scoped>
.side-bar{
    max-width: 200px;
    min-width: 200px;
    width:100%;
    border-right:1px solid #80808045;
    background: #F4F4F4;
}
.main-content{
    width: 100%;
}
.img{
    width: 40px;
    height: 40px;
}
.section{
    border-bottom: 0.5px solid #d1d1d1;
}
.link{
    color:#2F2E41;
    text-decoration: none;
    font-size: 1rem;
    margin: 0 10px ;
    width:calc(100% - 20px);
    padding: 10px 5px;
    border-radius: 5px;
    font-weight:500;
}
.link:hover{
    color:#2F2E41;
    text-decoration: none;
    
    /* background: rgba(68, 175, 105, 0.21);
     */
     background-color: rgba(155, 155, 155, 0.2);
}
.link.router-link-active{
    color: #2F2E41;
    text-decoration: none;
    background-color:#44AF6950;


}
</style>