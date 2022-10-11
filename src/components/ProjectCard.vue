<template>
    <div class="project-card d-flex flex-column justify-content-center align-items-center shadow mx-2" @click="goto">
        <img class="mb-2" src="https://ffjwvmpxsrgtbegincmd.supabase.co/storage/v1/object/sign/planit/kanban.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGFuaXQva2FuYmFuLnN2ZyIsImlhdCI6MTY2NTM0MTIzNywiZXhwIjoxOTgwNzAxMjM3fQ.JfZAuBQZWzgQlSKUPvKjXN7mbba6w4hkTbzkVU99NBA" alt="">
        <p class="m-0 mt-2 fw-bold"> {{name}} </p>
    </div>
</template>


<script>
import router from "../router";
export default {
    props:{
        name:String,
        id:String,
    },
    methods:{
        goto(){
            console.log(this.id)
        }
    }
}
</script>
