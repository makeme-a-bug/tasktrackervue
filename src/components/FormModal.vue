<template>
    <div class="position-fixed modal d-flex justify-content-center align-items-center" @click="close">
        <slot></slot>
    </div>
</template>

<script>

export default{
    methods:{
        close(){
            console.log("formmodal close")
            this.$emit("close")
        }
    }
}

</script>



<style scoped>
    .modal{
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background: #a5a5a552;
    }
</style>