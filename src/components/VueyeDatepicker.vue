<template>
  <div class="ve-dp-wrapper">
    <div class="ve-dp-input">
      <input
        type="text"
        :value="date.value"
        @focus="showPicker"
      >
      <icon
        name="calendar"
        fill="#666"
        height="24px"
        width="24px"
        class="ve-dp-input__append"
        :class="{'ve-dp-input__append--active':pickerShown}"
      />
    </div>
    <transition name="drop">
      <div class="ve-dp" v-if="pickerShown">
        <div class="ve-dp-title">
          <h2>{{date.label}}</h2>
        </div>
        <div class="ve-dp-body">
          <Years
            v-if="date.type==='years'"
            :year="date.value"
            :years="years"
            @select-year="selectYear"
            @next-year="nextYear"
            @prev-year="prevYear"
          />
          <Months
            v-else-if="date.type==='months'"
            :months="months"
            :year="date.value"
            @select-year="selectYear"
            @select-month="selectMonth"
          />
          <Days
            v-else-if="date.type==='days'"
            :month="date"
            :weekdaysInitial="weekdaysInitial"
            @prev-month="selectMonth"
            @next-month="selectMonth"
            @select-day="selectDay"
          />
        </div>
        <div class="ve-dp-footer">
          <div class="ve-dp-footer__actions">
            <span>CANCEL</span>
            <span>OK</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import useDate from "./@use/useDate.js";
import Years from "./Years";
import Months from "./Months";
import Days from "./Days";
import Icon from "./icons";
import { ref } from "@vue/composition-api";
export default {
  name: "vueye-datepicker",
  props: ["value","defaultDate"],
  setup(props, context) {
    const { defaultDate } = props;
    const {
      weekdaysInitial,
      setWeekdays,
      date,
      years,
      months,
      changeView
    } = useDate( new Date());

    const pickerShown = ref(false);

    function selectYear(_year) {
      changeView("months", _year);
    }
    function nextYear(_year) {
      changeView("years", _year);
    }
    function prevYear(_year) {
      changeView("years", _year);
    }
    function selectMonth(_year, index) {
      changeView("days", _year, index + 1);
    }
    function selectDay(day) {
      changeView("days", ...day.value.split("-"));
      hidePicker();
      console.log("------day--------------");
      console.log(day);
      console.log("--------------------");
      context.emit("input", new Date(day.value));
    }

    function showPicker() {
      pickerShown.value = true;
    }

    function hidePicker() {
      pickerShown.value = false;
    }
    return {
      weekdaysInitial,
      date,
      years,

      selectYear,
      prevYear,
      nextYear,
      months,
      selectMonth,
      selectDay,
      pickerShown,
      showPicker,
      hidePicker
    };
  },
  components: {
    Years,
    Months,
    Days,
    Icon
  }
};
</script>

<style lang="scss" src="./style.scss">
</style>
