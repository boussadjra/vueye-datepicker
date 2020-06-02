# Vueye Datepicker

It's a simple date picker created using Vue.js and the vue-composition-api plugin

# Installation

    npm i vueye-datepicker --save

# Usage

```js
<template>
  <div id="app">
    <vueye-datepicker v-model="date"/>
  </div>
</template>

<script>
import VueyeDatepicker from "vueye-datepicker";
export default {
  name: "App",
  data: () => ({
    date: new Date()
  }),
  components: {
    VueyeDatepicker
  }
};
</script>
```
# Demo

[Date picker Demo](https://boussadjra.github.io/vueye-datepicker/)


