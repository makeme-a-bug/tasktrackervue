<template>

    <div class="position-relative item text-start" @click="action">
         <p class="m-0"><i :class="`${icon} me-2`"></i> {{text}}</p>
    </div>


</template>


<script>
export default{
    props:['icon',"text","action"]
}
</script>


<style scoped>
.item{
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
}
.item:hover{
    background-color: #34996c;
    color: white;
}
.item p{
    font-size: 18px;
    font-weight: 500;
}
</style>
