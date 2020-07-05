<template>
  <div class="ve-dp-wrapper">
    <div class="ve-dp-input">
      <input type="text" :value="inputValue" @focus="showPicker">
      <icon
        name="close"
        fill="#888"
        height="20px"
        width="20px"
        class="ve-dp-input__close"
        :class="{'ve-dp-input__close--active':pickerShown}"
        @click.native="clear"
      />
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
          <icon
            @click.native="hidePicker"
            name="chevron-right"
            fill="#eee"
            height="16px"
            width="16px"
            class="ve-dp-close"
          />
          <h2>{{date.label}}</h2>
        </div>
        <div class="ve-dp-body">
          <Years
            v-if="date.type==='years'"
            :year="date.value"
            :years="years"
            @select-year="selectYear"
            @next-year="selectYear"
            @prev-year="selectYear"
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
        <!--<div class="ve-dp-footer">
          <div class="ve-dp-footer__actions">
            <span>CANCEL</span>
            <span>OK</span>
          </div>
        </div>-->
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
import { ref, computed, watch } from "@vue/composition-api";
import { formatDate } from "./Helpers";
export default {
  name: "vueye-datepicker",
  props: ["value", "color", "format", "customFormatter"],
  setup(props, context) {
    const { value, color, format, customFormatter } = props;
    const {
      weekdaysInitial,
      setWeekdays,
      date,
      years,
      months,
      changeView
    } = useDate(value.value ? new Date(value.value) : new Date());

    const pickerShown = ref(false);

    const inputValue = computed({
      get() {
        if (date.value.type === "years" || date.value.type === "months") {
          return formatDate(
            new Date(
              typeof date.value.value === "number"
                ? new String(date.value.value)
                : date.value.value.toString()
            ),
            format,
            customFormatter
          );
        }
        return formatDate(new Date(date.value.value), format, customFormatter);
      },

      set(val) {
        date = val;
      }
    });

    watch("props.color", () => {
      color
        ? document.documentElement.style.setProperty("--primary", color)
        : document.documentElement.style.setProperty("--primary", "#5118ac");
    });
    watch(date, (newVal, oldVal) => {
      emitVal();
    });
    /*** functions */
    function selectYear(_year) {
      changeView("months", _year);

      emitVal();
    }

    function selectMonth(_year, index) {
      changeView("days", _year, index + 1);
      emitVal();
    }
    function selectDay(day) {
      changeView("days", ...day.value.split("-"));
      hidePicker();
      emitVal();
    }
    function emitVal() {
      context.emit("input", {
        formattedValue: inputValue.value,
        value: new Date(
          typeof date.value.value === "number"
            ? new String(date.value.value)
            : date.value.value.toString()
        )
      });
    }
    function showPicker() {
      pickerShown.value = true;
    }

    function hidePicker() {
      pickerShown.value = false;
    }

    function clear() {
  changeView('years',new Date().getFullYear())
    }
    return {
      weekdaysInitial,
      date,
      years,

      selectYear,

      months,
      selectMonth,
      selectDay,
      pickerShown,
      showPicker,
      hidePicker,
      inputValue,
      clear
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
