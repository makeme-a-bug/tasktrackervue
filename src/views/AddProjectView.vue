<template>
    <MainWrapper>
        <div class="col-lg-3 col-md-4 col-sm-6 secondary-bg p-2 px-3" id="project_form">
            <form action="" class="mt-2">
                <div class="d-flex flex-column w-100 text-start">
                    <label for="" class="form-label w-100"> Name </label>
                    <input type="text" class="form-control" v-model="name" placeholder="Enter the name of the project">
                </div>
                <!-- <div class="d-flex flex-column w-100">
                    <label for=""> description </label>
                    <input type="text" value="" placeholder="Enter the name of the project">
                </div> -->
                <button class="btn btn-primary primary-btn w-100 mt-4" @click="submit"> <i class="fa-solid fa-plus"></i> Add </button>
            </form>
        </div>
    </MainWrapper>
</template>

<script>
import { supabase } from '../supabaseClient'
import MainWrapper from '../components/MainWrapper'
import router from "../router";
import Notiflix from 'notiflix';
import {store} from '../store'


export default{
    data(){
        return{
            name:"",
            user:store.user
        }
    },
    components:{
        MainWrapper
    },
    mounted(){
        
    },
    methods:{
        async submit(e){
            e.preventDefault()
            Notiflix.Block.arrows("#project_form")
            try{
                const { error } = await supabase
                .from('project')
                .insert({ user_id: this.user.id , name: this.name })

                if (error) throw error
                
                router.push('/projects')

            }
            catch (error){
                alert(error.error_description || error.message)
            }
            finally{
                Notiflix.Block.remove("#project_form")
            }
            
            console.log(this.name)
        },
    }
}

</script>