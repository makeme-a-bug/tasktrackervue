<template>
    <div class="h-100-70 task-cont rounded me-3">
        
    </div>
</template>



<script>

export default {
    props:{
        tasks:Array,
        status:String
    },
    methods:{

    }

}
</script>

<style scoped>

.task-cont{
    max-width: 300px;
    min-width: 250px;
    width: 100%;
    border:1px solid #80808045;
    height: calc(100vh - 140px);
}

</style>