<template>
    <MainWrapper add-classes="justify-content-start align-items-start flex-column">
        <h3 class="w-100 mt-3 text-start fw-bold px-2">
            All Projects
        </h3>
        <div class="d-flex">
            <ProjectCard v-for="p in projects" :key="p.id" :name="p.name" :id="p.id"/>
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

        this.projects = data

    }
  }
}
</script>
