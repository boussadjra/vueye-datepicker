<template>
  <div class="ve-dp-body--months">
    <div class="ve-dp-body--months__year">
      <div class="ve-dp-body--months__year--prev" @click="prev">
        <icon name="chevron-left" fill="#666"/>
      </div>
    <div>
      {{year}}
    </div>
        <div class="ve-dp-body--months__year--next" @click="next">
        <icon name="chevron-right" fill="#666"/>
      </div>
    </div>
    <div class="ve-dp-body--months__values">
      <div
        v-for="(month, index) in monthsShort"
        :key="index"
        class="ve-dp-body--months__values--item"
        :class="{'ve-dp-body--months__values--item--active':index===new Date().getMonth()}"
        @click="selectMonth(index)"
      >{{month}}</div>
    </div>
  </div>
</template>

<script>
import Icon from "./icons";

export default {
  name: "months",
  props: ["months", "year"],
  computed: {
    monthsShort() {
      return this.months.map(m => m.substring(0, 3));
    }
  },
  methods: {
      selectMonth(index){
          this.$emit('select-month',this.year,index)
      },
       next(){
          let _year=this.year+1
          this.$emit('select-year',_year)

      },prev(){
          let _year=this.year-1
          this.$emit('select-year',_year)

      }
  },
  components: {
    Icon
  }
};
</script>

<style>
</style>
