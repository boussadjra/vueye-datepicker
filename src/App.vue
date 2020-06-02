<template>
  <div id="app">
    <vueye-datepicker v-model="date"/>

    <div>{{date.toLocaleDateString()}}</div>
  </div>
</template>

<script>
import VueyeDatepicker from "./components/VueyeDatepicker.vue";
export default {
  name: "App",
  data: () => ({
    date: new Date()
  }),
  methods: {},
  components: {
    VueyeDatepicker
  }
};
</script>

<style lang="scss">
#app {
  height: 100vh;
  width: 100%;
  padding: 20px;
  display: flex;

  justify-content: center;

  // align-items: center;
}
</style>
