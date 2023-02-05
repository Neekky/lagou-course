<template>
    <div>
      <h1>foo component</h1>
      <li v-for="item in data" :key="item.id">
        name: {{ item.name }}
      </li>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  
  const fetchData = async () => {
    const res = await axios({
      method: "GET",
      url: "http://zcwl.work/koa2-zhihu-api/users/find"
    });
    return res.data.data;
  };
  
  const data = await fetchData();
  </script>
  
  <style></style>