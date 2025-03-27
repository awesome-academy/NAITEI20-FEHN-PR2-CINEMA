<template>
  <div class="container mx-auto max-w-[72vw] p-6">
    <template v-if="cinemaData">
      <CinemaInfo :cinema="cinemaData" />
    </template>
    <template v-else>
      <p class="text-gray-500 text-lg font-semibold text-center mt-10">Không tìm thấy rạp...</p>
    </template>

    <div class="mt-10">
      <h2 class="text-2xl font-bold text-primary flex items-center">
        <span class="border-l-5 border-gray-700 h-8 mr-3"></span>
        LỊCH CHIẾU
      </h2>
      <div class="grid grid-cols-9 mt-6">
        <ShowTime :selectedDate="selectedDate" :cinemaId="cinemaId" class="col-span-6"/>
        <CalendarInfo @date-selected="onDateSelected" class="mb-10 ml-auto col-span-3" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent, ref } from "vue";
import { useRoute } from "vue-router";
import cinemas from "@/db/cinemas.json";

export default {
  components: {
    CinemaInfo: defineAsyncComponent(() => import("~/components/CinemaInfo.vue")),
    CalendarInfo: defineAsyncComponent(() => import("~/components/Calendar.vue")),
    ShowTime: defineAsyncComponent(() => import("~/components/ShowTime.vue")),
  },
  setup() {
    const route = useRoute();
    const cinemaId = parseInt(route.params.id);
    const cinemaData = cinemas.find((cinema) => cinema.id === cinemaId);

    const today = new Date();
    const selectedDate = ref(today);

    const onDateSelected = (date) => {
      selectedDate.value = date;
    };

    return { cinemaData, selectedDate, onDateSelected, cinemaId };
  },
};
</script>
