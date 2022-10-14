<template>
    <MainWrapper add-classes="justify-content-start align-items-start flex-column">
        <div class="d-flex w-100 flex-wrap justify-content-between align-items-center px-2">
          <div class="start">
            <h3 class="mt-3 text-start fw-bold ">
            All Projects
            </h3>
          </div>
          <div class="end">
            <router-link to="/projects/add">
              <button class="btn btn-primary primary-btn">
              <i class="fa-solid fa-plus"></i> Add Project
              </button>
            </router-link>
            
          </div>
        </div>
        
        <div class="d-flex">
            <ProjectCard v-for="p in projects" :key="p.id" :name="p.name" :id="p.id" @remove-project="removeProject"/>
        </div>
    </MainWrapper>
</template>


<script>
import { supabase } from '../supabaseClient'
import MainWrapper from '../components/MainWrapper'
import ProjectCard from '../components/ProjectCard'

export default {
  data(){
    return {
        projects:[]
    }
  },
  props: {
    addClasses: String
  },
   components: {
    MainWrapper,
    ProjectCard,
  },
  mounted() {
    this.getProjects()    
  }
  ,
  methods:{
    async getProjects(){
        const { data, error } = await supabase
        .from('project')
        .select()

        console.log(error,data)
        this.projects = data

    }
    ,
    removeProject(id){
      this.projects = this.projects.filter(e => e.id != id)
    }
  }
}
</script>
