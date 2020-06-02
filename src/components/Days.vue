<template>
  <div class="ve-dp-body--days">
    <div class="ve-dp-body--days__month">
      <div class="ve-dp-body--months__year--prev" @click="prev">
        <icon name="chevron-left" fill="#666"/>
      </div>
      <div>{{month.label}}</div>

      <div class="ve-dp-body--months__year--next" @click="next">
        <icon name="chevron-right" fill="#666"/>
      </div>
    </div>
    <div class="ve-dp-body--days__values">
      <div
        v-for="(weekday, index) in weekdaysInitial"
        :key="'wd'+index"
        class="ve-dp-body--days__values--wday"
      >{{weekday}}</div>

      <div
        v-for="(day, index) in days"
        :key="index"
        :style="{'grid-column-start':day.dayOfWeek+1}"
        class="ve-dp-body--days__values--item"
        @click="$emit('select-day', day)"
      >{{day.index}}</div>
    </div>
  </div>
</template>

<script>
import Icon from "./icons";
export default {
  name: "days",
  props: ["month", "weekdaysInitial"],

  computed: {
    days() {
        let monthString =this.month.value.substr(0,this.month.value.lastIndexOf('-'))

      return [
        ...Array(new Date(...monthString.split("-"), 0).getDate())
      ].map((day, i) => {
        return {
          index: i + 1,
          value: `${monthString}-${i + 1}`,
          dayOfWeek: new Date(`${monthString}-${i + 1}`).getDay()
        };
      });
    }
  },
  methods: {
    next() {
      let date = new Date(this.month.value);
      let currentMonth = date.getMonth();
      let nextMonth = currentMonth + 1;
      let year = date.getFullYear();
      if (nextMonth > 11) {
        nextMonth = 0;
        year++;
      }

      this.$emit("next-month", year,nextMonth);
    },
    prev() {

       let date = new Date(this.month.value);
      let currentMonth = date.getMonth();
      let prevMonth = currentMonth - 1;
      let year = date.getFullYear();
      if (prevMonth <0) {
        prevMonth = 11;
        year--;
      }

      this.$emit("next-month", year,prevMonth);
    },

  },
  components: {
    Icon
  }
};
</script>

<style>
</style>
