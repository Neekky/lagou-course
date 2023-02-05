<template>
  <div>
    <h1>3211222</h1>
    <p>{{ $route.params?.ids }}</p>
    <router-view />
  </div>
</template>

<script>
export default {
    name: "1233213",
    mounted() {
      console.log(this.$route)
    }
}
</script>

<style>

</style>