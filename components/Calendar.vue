<script setup>
import { ref, computed } from "vue";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-vue-next";
import { defineEmits } from "vue";

const emit = defineEmits(["date-selected"]);

// Ngày hiện tại
const today = new Date();
const selectedDate = ref(new Date(today));

// Danh sách tháng & năm
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

// Trạng thái mở popup chọn tháng/năm
const showMonthPicker = ref(false);
const showYearPicker = ref(false);

// Lấy danh sách tháng
const months = computed(() => {
  const currentDate = new Date();
  return Array.from({ length: 12 }, (_, i) => ({
    label: `Tháng ${i + 1}`,
    value: i,
    disabled: currentYear.value === currentDate.getFullYear() && i < currentDate.getMonth()
  }));
});

// Lấy danh sách năm (5x3 với năm hiện tại ở vị trí 9)
const years = computed(() => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const startYear = currentYear - 8; 

  return Array.from({ length: 15 }, (_, i) => ({
    value: startYear + i,
    disabled: startYear + i < currentYear 
  }));
});

// Chuyển đổi ngày đầu tiên về chuẩn thứ 2 (Monday = 0, Chủ Nhật = 6)
const getMondayBasedIndex = (day) => (day === 0 ? 6 : day - 1);

// Tạo danh sách ngày của tháng hiện tại
const daysInMonth = computed(() => {
  const firstDayOfWeek = getMondayBasedIndex(new Date(currentYear.value, currentMonth.value, 1).getDay());
  const lastDate = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
  const prevLastDate = new Date(currentYear.value, currentMonth.value, 0).getDate();

  let days = [];
  for (let i = firstDayOfWeek; i > 0; i--) {
    days.push({ day: prevLastDate - i + 1, disabled: true, isToday: false });
  }
  for (let i = 1; i <= lastDate; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i);
    const isToday = date.toDateString() === today.toDateString();
    days.push({ day: i, disabled: date < today && !isToday, isToday });
  }
  return days;
});

// Chọn ngày
const selectDate = (day) => {
  if (!day.disabled) {
    selectedDate.value = new Date(currentYear.value, currentMonth.value, day.day);
    emit("date-selected", selectedDate.value); // Emit ngày được chọn
  }
};

// Chọn tháng
const selectMonth = (month) => {
  const selectedMonth = months.value.find((m) => m.value === month);
  if (!selectedMonth.disabled) {
    currentMonth.value = month;
    showMonthPicker.value = false;
  }
};

// Chọn năm
const selectYear = (year) => {
  const selectedYear = years.value.find((y) => y.value === year);
  if (!selectedYear.disabled) {
    currentYear.value = year;
    showYearPicker.value = false;
  }
};
</script>

<template>
  <div class="w-100 p-5 bg-[#e5e2d6] rounded-2xl h-fit">
    <div class="relative border border-[#bab295] rounded-sm p-4 text-sm">
      <!-- Header -->
      <div class="flex justify-between items-center text-base text-gray-900 -mt-2 mb-3">
        <button @click="currentMonth = (currentMonth + 11) % 12">
          <ChevronLeft class="w-6 h-6 text-gray-600 rounded-full hover:bg-white cursor-pointer" />
        </button>

        <div class="flex-1 flex justify-center">
          <!-- Chọn tháng -->
          <div @click="showMonthPicker = !showMonthPicker" class="px-2 py-1 hover:bg-white rounded-lg cursor-pointer flex-1 text-center uppercase transition">
            {{ months[currentMonth].label }}
          </div>

          <!-- Chọn năm -->
          <div @click="showYearPicker = !showYearPicker" class="px-2 py-1 hover:bg-white rounded-lg cursor-pointer flex-1 text-center transition">
            {{ currentYear }}
          </div>
        </div>

        <button @click="currentMonth = (currentMonth + 1) % 12">
          <ChevronRight class="w-6 h-6 text-gray-600 rounded-full hover:bg-white cursor-pointer" />
        </button>
      </div>

      <!-- Picker Tháng -->
      <div v-if="showMonthPicker" class="absolute top-0 bottom-0 left-0 right-0 bg-white text-base rounded-lg border border-gray-200 z-10">   
        <div class="w-full h-7/8 p-3 grid grid-cols-3 gap-x-4 gap-y-6">
          <div
            v-for="month in months"
            :key="month.value"
            @click="selectMonth(month.value)"
            class="flex items-center justify-center cursor-pointer rounded-sm transition-all"
            :class="{
              'bg-gray-100 !cursor-not-allowed': month.disabled,
              'bg-[#3f4a66] text-white': month.value === currentMonth,
              'hover:bg-gray-100': month.value !== currentMonth && !month.disabled
            }"
          >
            {{ month.label }}
          </div>
        </div>
        
        <!-- Icon Đóng -->
        <div class="col-span-3 flex items-center justify-center h-1/8 cursor-pointer hover:bg-gray-200" @click="showMonthPicker = false">
          <CalendarIcon class="w-5 text-gray-500" />
        </div>
      </div>

      <!-- Picker Năm -->
      <div v-if="showYearPicker" class="absolute top-0 bottom-0 left-0 right-0 bg-white text-base rounded-lg border border-gray-200 z-10">
        <div class="w-full h-7/8 p-3 grid grid-cols-3 gap-x-4 gap-y-6">
          <div
            v-for="year in years"
            :key="year.value"
            @click="selectYear(year.value)"
            class="flex items-center justify-center cursor-pointer rounded-sm transition-all"
            :class="{
              'bg-gray-100 !cursor-not-allowed': year.disabled,
              'bg-[#3f4a66] text-white': year.value === currentYear,
              'hover:bg-gray-100': year.value !== currentYear && !year.disabled
            }"
          >
            {{ year.value }}
          </div>
        </div>

        <!-- Icon Đóng -->
        <div class="col-span-5 flex items-center justify-center h-1/8 cursor-pointer hover:bg-gray-200" @click="showYearPicker = false">
          <CalendarIcon class="w-5 text-gray-500" />
        </div>
      </div>

      <!-- Grid Ngày -->
      <div class="grid grid-cols-7 text-center mt-3 gap-y-0.5 gap-x-2">
        <!-- Headers -->
        <div v-for="day in ['2', '3', '4', '5', '6', '7', 'CN']" :key="day" class="font-bold text-gray-900">
          {{ day }}
        </div>

        <!-- Days -->
        <div
          v-for="(day, index) in daysInMonth"
          :key="index"
          class="p-2 rounded-md transition cursor-pointer relative group border border-transparent"
          :class="{
            'text-gray-400 !cursor-not-allowed': day.disabled,
            '!bg-[#3f4a66] text-white': selectedDate.getDate() === day.day && !day.disabled,
            'border !border-gray-500': day.isToday && selectedDate.getDate() !== day.day,
            'hover:bg-white': !day.disabled 
          }"
          @click="selectDate(day)"
        >
          {{ day.day }}
        </div>
      </div>
    </div>
  </div>
</template>
