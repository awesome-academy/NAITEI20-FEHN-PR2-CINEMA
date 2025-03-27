<template>
  <div class="container mx-auto max-w-[72vw] p-6">
    <template v-if="movieData">
      <MovieInfo :movie="movieData" />
    </template>
    <template v-else>
      <p class="text-gray-500 text-lg font-semibold text-center mt-10">Không tìm thấy phim...</p>
    </template>
    <div class="mt-10">
      <h2 class="text-2xl font-bold text-primary flex items-center">
        <span class="border-l-5 border-gray-700 h-8 mr-3"></span>
        LỊCH CHIẾU
      </h2>
      <div class="grid grid-cols-9 mt-6">
        <ShowTime :selectedDate="selectedDate" :movieId="movieId" class="col-span-6"/>
        <CalendarInfo @date-selected="onDateSelected" class="mb-10 ml-auto col-span-3" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent, ref } from "vue";
import { useRoute } from "vue-router";
import movies from "@/db/movies.json";

export default {
  components: {
    MovieInfo: defineAsyncComponent(() => import("~/components/MovieInfo.vue")),
    CalendarInfo: defineAsyncComponent(() => import("~/components/Calendar.vue")),
    ShowTime: defineAsyncComponent(() => import("~/components/ShowTime.vue")),
  },
  setup() {
    const route = useRoute();
    const movieId = parseInt(route.params.id);
    const movieData = movies.find((movie) => movie.id === movieId);

    const today = new Date();
    const selectedDate = ref(today);

    const onDateSelected = (date) => {
      selectedDate.value = date;
    };

    return { movieData, selectedDate, onDateSelected, movieId };
  },
};
</script>
