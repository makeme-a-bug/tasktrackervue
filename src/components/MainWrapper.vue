<template>
    <Header/>
    <div v-bind:class="`h-100-60 d-flex primary-bg ${addClasses}`">
        <slot />
    </div>
</template>

<script>
import Header from '../components/Header'

export default {
  props: {
    addClasses: String
  },
  components:{
        Header
    }
}

</script>

