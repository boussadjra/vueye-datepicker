import { ref, computed, watch } from '@vue/composition-api';
const useDate = (_date, type) => {
	/***year */
	const year = ref(_date.getFullYear());
	/***month */

	const months = ref([
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]);

	const monthsShort = computed(() => months.value.map(m => m.substring(0, 3)));
	/**week */
	const weekdays = ref(new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'));
	const weekdaysShort = computed(() => weekdays.value.map(wd => wd.substring(0, 3)));
	const weekdaysInitial = computed(() => weekdays.value.map(wd => wd.charAt(0)));

	/**date */
	const date = ref({
		type: type ? type : 'years',
		value:_date,
		label: _date.getFullYear(),
	});

	/*********** */

	function changeView(_type, _year,_month,_day=1) {
		
		switch (_type) {
			case 'years':
				date.value = {
					type: _type,
					value: _year,
					label: _year,
				};
				break;
				case 'months':
					date.value = {
						type: _type,
						value: _year,
						label: _year,
					};
					break;
					case 'days':
						date.value = {
							type: _type,
							// value:`${_year}-${_month+1}`,}
							value:`${_year}-${_month}-${_day}`,
							label:`${months.value[_month-1]} ${_year}`
						};
						break;
			default:
				break;
		}
	}
	/*** setters */
	
	function setWeekdays(_weekdays) {
		weekdays.value = _weekdays;
	}

	/**** setters end */

	/***
	 * return
	 *
	 */
	return {
		years: computed(() => {
			let _years = [];
			for (let i = 0; i < 5; i++) {
				_years.push(date.value.label - 2 + i);
			}
			console.log('--------computed years------------')
			console.log(_years)
			console.log('--------------------')
			return _years;
		}),
		weekdays: computed(() => weekdays.value),
		months: computed(() => months.value),
		monthsShort,
		weekdaysShort,
		weekdaysInitial,
		setWeekdays,
		date,
		changeView
	};
};

export default useDate;
