<template>
    <div class="member-card d-flex justify-content-center secondary-bg align-items-center flex-column rounded shadow">
        <div class="profile-img rounded-circle d-flex align-items-center justify-content-center mb-2">
            <i class="fa-solid fa-user"></i>
        </div>
        <h6 class="w-100 text-center fw-bold mt-2"> {{member.first_name}} {{member.last_name}}</h6>
    </div>
</template>


<script>

export default{
    props:{
        member:Object
    },
}

</script>


<style scoped >
.member-card{
    max-width: 200px;
    min-width: 150px;
    width: 100%;
    min-height: 200px;
}

.profile-img{
    font-size: 40px;
    background: #34996c;
    color: white;
    width: 80px;
    height: 80px;
}

</style>