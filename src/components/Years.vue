<template>
  <div class="ve-dp-body--years">
    <div class="ve-dp-body--years__item ve-dp-body--years__prev--up" @click="prev">
      <icon name="chevron-left" fill="#666"/>
    </div>
    <div
      v-for="(_year, index) in years"
      :key="index"
      class="ve-dp-body--years__item"
      :class="{'ve-dp-body--years__item--active':year===_year}"
      @click="selectYear(_year)"
    >{{_year}}</div>

    <div class="ve-dp-body--years__item ve-dp-body--years__next--down" @click="next">
      <icon name="chevron-left" fill="#666"/>
    </div>
  </div>
</template>

<script>
import Icon from "./icons";
export default {
  name: "years",
  props: {
    years: {
      type: Array,
      default: () => {
        let _years = [];
        for (let i = 0; i < 5; i++) {
          _years.push(new Date().getFullYear() - 2 + i);
        }
        return _years;
      }
    },
    year: String | Number,
  },
  methods: {
      selectYear(_year){
          this.$emit('select-year',_year)
      },
      next(){
          let _year=this.year+1
          this.$emit('next-year',_year)

      },prev(){
          let _year=this.year-1
          this.$emit('prev-year',_year)

      }
  },
  components: {
    Icon
  }
};
</script>

<style>
</style>
