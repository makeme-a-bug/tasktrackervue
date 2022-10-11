<template>
    <MainWrapper add-classes="justify-content-start align-items-center flex-column">
        <div class="d-flex profile-div secondary-bg p-4 mx-auto flex-column shadow rounded mt-3">
            <h3 class="w-100 text-start fw-bold mb-3">
                Account Information
            </h3>
            <form class="mt-3">
                 <div class="mb-3 d-flex flex-wrap justify-content-between text-start">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-8">
                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="user.email">
                    </div>
                </div>
                <div class="mb-3 d-flex flex-wrap justify-content-between text-start">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-8">
                    <input type="password" class="form-control" id="inputPassword">
                    </div>
                </div>
            </form>
        </div>
         <div class="d-flex mt-4 profile-div secondary-bg p-4 mx-auto flex-column shadow rounded">
            <h3 class="w-100 text-start fw-bold mb-3">
                Profile
            </h3>
            <form class="mt-3">
                 <div class="mb-3 d-flex flex-wrap justify-content-between text-start">
                    <label for="staticEmail" class="col-sm-2 col-form-label">First Name</label>
                    <div class="col-sm-8">
                    <input type="text" class="form-control" id="staticEmail" v-model="first_name">
                    </div>
                </div>
                <div class="mb-3 d-flex flex-wrap justify-content-between text-start">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Last Name</label>
                    <div class="col-sm-8">
                    <input type="text" class="form-control" id="inputPassword" v-model="last_name ">
                    </div>
                </div>
                <div class="w-100 mt-3 d-flex">
                    <button class="btn btn-primary primary-btn ms-auto" @click="updateProfile">
                        <span v-if="loader"> <i class="fa-solid fa-circle-notch fa-spin"></i> Updating </span> <span v-else> Update </span>
                    </button>
                </div>
            </form>
        </div>
    </MainWrapper>
</template>


<script>
import { supabase } from '../supabaseClient'
import MainWrapper from '../components/MainWrapper'
import router from "../router";
import Notiflix from 'notiflix';

export default {
    data(){
        return{
            user : {},
            fist_name:'',
            last_name:'',
            loader:null,
        }
    },
    components:{
    MainWrapper
    },
    mounted(){
        this.getUser()
    },
    methods:{
        getUser(){
            try{
               const user  = supabase.auth.user()
               
               if(!!!user) throw {message:"You might be logged out"}
            
                this.user = user
                this.getProfile()
               
            }
            catch (error){
                alert(error.error_description|| error.message)
            }
            finally{

            }
        }
        ,
        async getProfile(){
            try{
               const { data, error } = await supabase
                .from('profile').select()
                .eq('user_id', this.user.id)
               
               if(error) throw error
            
               let profile = data[0]
               this.last_name = profile.last_name
               this.first_name = profile.first_name
               
            }
            catch (error){
                alert(error.error_description|| error.message)
            }
            finally{

            }
        }
        ,
        async updateProfile(e){
            e.preventDefault()
            try{
                this.loader = true
                console.log(this.first_name)
               const { data, error } = await supabase
                .from('profile')
                .update({ first_name: this.first_name ,last_name: this.last_name})
                .match({ user_id: this.user.id })
               
               if(error) throw error
            
                this.profile = data[0]
                console.log(data)
                Notiflix.Notify.success("Profile updated" , {
                    position : "right-bottom"
                })
               
            }
            catch (error){
                alert(error.error_description|| error.message)
            }
            finally{
                this.loader = false
            }
        }
    }

}
</script>


<style scoped>
.profile-div{
    min-width: 300px;
    max-width: 700px;;
    width:100%;
}

</style>