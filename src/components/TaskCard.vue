<template>
    <div class='w-100 d-flex flex-column shadow-sm rounded p-3 task mt-2'>
        <div class="d-flex justify-content-between align-items-center">
            <label for="" class="sm-badge rounded px-2 py-1"> {{task.id}} </label>
            <div class="color-bulb rounded-circle" :style="`background-color:${status.color}`">
            </div>
        </div>
        <h5 class="w-100 text-start mt-2"> {{task.title}} </h5>
        <p class="m-0 mt-2 text-start w-100 description">
            {{task.description}}
        </p>
        <div class="d-flex justify-content-start align-items-center mt-2">
            <label for="" class="sm-badge rounded px-2 py-1"> {{task.created_on}} </label>
            
        </div>
        <hr>
    </div>
</template>



<script>

export default {
    props:{
        task:Object,
        status:Object,
    }
}
</script>


<style scoped>

.task{
    background: white;
}

.sm-badge{
    background-color: #B8B8B821;
    color:#777777;
    font-size: 14px;
    font-weight:500;
}

.color-bulb{
    width:15px;
    height:15px;
}
.description{
    font-size:13px;
    color:#777777;
    max-width: 75ch;
    max-height: 75ch;
}
</style>
