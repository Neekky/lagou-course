<template>
  <div>
    <h1>About page</h1>
    <li v-for="item in a" :key="item.id">
      {{ item.name }}
    </li>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "vue";

const fetchData = async () => {
  const res = await axios({
    method: "GET",
    url: "http://zcwl.work/koa2-zhihu-api/users/find",
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded',
      // "Access-Control-Allow-Origin": "*",
    },
  });
  return res.data.data;
};

const a = await fetchData();
console.log(a)

const { data, pending, error, refresh } = await useAsyncData("users", () =>
  $fetch("http://zcwl.work/koa2-zhihu-api/users/find")
);
</script>

<style></style>