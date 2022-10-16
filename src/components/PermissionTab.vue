<template> 
    <div :class="`permission d-flex flex-nowrap justify-content-center align-items-center ${!!active && 'active'} rounded-pill px-2 py-1 m-1`" @click="togglePermission">
        <p class="m-0"> {{permission.name}} </p>
    </div>
</template>


<script>
export default {  
    props:{
        permission:Object,
        active:Boolean
    },
    methods:{
        togglePermission(){
            this.$emit("togglePermission",this.permission.id)
        }
    }



}
</script>


<style scoped>
.permission{
    color:black;
    background: rgba(128, 128, 128, 0.623);
    cursor: pointer;
    font-size: 13px;
}
.permission.active{
    color:#34996c;
    background: #34996c30;
}
</style>
