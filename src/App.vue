<template>
  <div id="app">
    <h2>Vueye Datepicker</h2>

    <vueye-datepicker v-model="date" color="#4466ee" :customFormatter="customFormatter"/>

    <div>
      <pre>
    {{date}}
    </pre>
    </div>
  </div>
</template>

<script>
import VueyeDatepicker from "./components/VueyeDatepicker.vue";
export default {
  name: "App",
  data: () => ({
    date: {
      value: new Date(),
      formattedValue: ""
    }
  }),
  methods: {
    customFormatter(date) {
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      let weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];

      const _month = date.getMonth();
      const _weekday = date.getDay();
      let day = date.getDate();
      switch (day) {
        case 1:
          day = "1st";
          break;
        case 2:
          day = "2nd";
          break;
        case 3:
          day = "3rd";
          break;
        default:
          day = day + "th";
          break;
      }
     let _dateString = `${weekdays[_weekday]} ${
        months[_month]
      }, ${day} ${date.getFullYear()}`;
      return _dateString;
    }
  },
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
  flex-direction: column;
  // justify-content: center;
  align-items: center;
}
pre {
  margin-top: 20px;
  padding: 10px;
  color: #fff;
  background: #310244;
}
</style>
