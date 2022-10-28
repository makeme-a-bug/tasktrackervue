<template>
    <FormModal>
        <div class="d-flex secondary-bg p-3 rounded shadow" @click="click" id="role_form">
            <form class="form" >
            <h4 v-if="taskId" class="w-100 text-start mb-3"> Update Task </h4>
            <h4 v-else class="w-100 text-start mb-3"> Add Task </h4>
            <div class="mb-3 text-start w-100 d-flex flex-column">
                <label for="" class="mb-2"> Title </label>
                <input type="text" v-model="title" class="form-control" maxlength="15">
            </div>

            <div class="mb-3 text-start w-100 d-flex flex-column">
                <label for="" class="mb-2"> description </label>
                <textarea v-model="desc" rows="3" class="form-control"></textarea>
            </div>

            <div class="mb-3 text-start w-100 d-flex flex-column">
                <label for="" class="mb-2"> Starts on</label>
                <input type="date" v-model="starts_on" class="form-control">
            </div>

            <div class="mb-3 text-start w-100 d-flex flex-column">
                <label for=""> status </label>
                <select name="" id="" class="form-select">
                    <option v-for="s in statuses" :key="s.id" value="s.id"> {{s.name}}</option>
                </select>
            </div>


            <!-- <button v-if="taskId" class="btn btn-primary primary-btn w-100 mt-2" @click="update"> Update </button> -->
            <!-- <button v-else class="btn btn-primary primary-btn w-100 mt-2" @click="submit"> Add </button> -->
            </form>
            <!-- <div class="d-flex justify-content-center align-items-center flex-column preview ms-4">
                <div class="profile-img rounded-circle d-flex align-items-center justify-content-center mb-2" :style="`background-color:${color}`">
                    <i class="fa-solid fa-ribbon" ></i>
                </div>
                <h6 class="w-100 text-center fw-bold mt-2">{{name}}  </h6>
            </div> -->
        </div>
        
    </FormModal>
</template>

<script>
import FormModal from './FormModal'



export default {
    data(){
        return{
            title:'',
            desc:'',
            starts_on:'',
        }
    },
    components:{
        FormModal
    },
    props:{
        taskId:String,
        projectId:String,
        statuses:Array
    },
    mounted(){
        console.log(this.statuses)
    },
    methods:{
        click(e){
            e.stopPropagation()
        }

    }

}

</script>

<style scoped>
.form{
    min-width: 400px;
    height: min-content;
}

</style>