<template>
  <div>
    Hello Nuxt.js！
    <router-link to="/about">to about</router-link>
    <Foo />
  </div>
</template>

<script>
import Foo from "@/components/Foo";

export default {
  name: "homepage",
  components: {
    Foo
  }
};
</script>

<style></style>
