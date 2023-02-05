<template>
    <div>
      <h1>user-abc-page1</h1>
      <a href="/">A标签</a>
      <router-link to="/">routerlink</router-link>
      <button @click="onClick">首页</button>
    </div>
</template>
  
  <script>
  export default {
      name: "abcuser",
      methods: {
        onClick() {
          console.log("cla");
          this.$router.push("/");
        }
      }
  }
  </script>
  
  <style>
  
  </style>