<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import cinemas from "@/db/cinemas.json";
import movies from "@/db/movies.json";
import showtimes from "@/db/showtimes.json";

const props = defineProps({
  selectedDate: [String, Date],
});

const route = useRoute();
const currentId = computed(() => Number(route.params.id));
const isMoviePage = computed(() => route.path.startsWith("/movies/"));
const isCinemaPage = computed(() => route.path.startsWith("/cinemas/"));

// Chuẩn hóa `selectedDate` thành Date object để tránh lỗi
const normalizedSelectedDate = computed(() => {
  return props.selectedDate instanceof Date ? props.selectedDate : new Date(props.selectedDate);
});

// Xử lý dữ liệu showtimes
const enhancedShowtimes = computed(() =>
  showtimes.map(show => {
    const showDate = new Date(show.start_time);
    const formattedDate = showDate.toLocaleDateString("sv-SE");

    return {
      ...show,
      movie: movies.find(m => m.id === show.movie_id) || {},
      cinema: cinemas.find(c => c.id === show.cinema_id) || {},
      formattedDate,
      localTime: showDate.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    };
  })
);

// Lọc và nhóm showtimes
const groupedShowtimes = computed(() => {
  if (!normalizedSelectedDate.value) return {};
  const selectedFormattedDate = normalizedSelectedDate.value.toLocaleDateString("sv-SE");

  const filteredShowtimes = enhancedShowtimes.value.filter(show =>
    (isMoviePage.value ? show.movie_id === currentId.value : show.cinema_id === currentId.value) &&
    show.formattedDate === selectedFormattedDate
  );

  // Sắp xếp theo thời gian start_time tăng dần
  filteredShowtimes.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

  return filteredShowtimes.reduce((acc, show) => {
    const key = isMoviePage.value ? show.cinema?.name : show.movie?.title;
    acc[key] = acc[key] || [];
    acc[key].push(show);
    return acc;
  }, {});
});

</script>

<template>
  <div class="bg-white p-6 rounded-xl border border-gray-200 w-full h-fit">
    <template v-if="Object.keys(groupedShowtimes).length">
      <div v-for="(times, key) in groupedShowtimes" :key="key" class="mb-6 p-4">
        <div v-if="times.length" class="flex items-center mb-2">
          <img 
            src="../assets//images/bhd_logo.png"
            alt="Logo" 
            class="w-12 h-12 rounded-full mr-3 object-cover"
          />
          <div class="hover:text-primary cursor-pointer">
            <h3 class="text-lg" :class="{ 'uppercase': isCinemaPage }">
              {{ key }}
            </h3>
            <p v-if="isMoviePage">
              {{ times[0]?.cinema?.location }}
            </p>
            <p v-else>
              {{ times[0]?.cinema?.name }}
            </p>
          </div>
        </div>

        <div class="flex flex-wrap gap-4">
          <div 
            v-for="time in times" 
            :key="time.id" 
            class="mt-2 group cursor-pointer"
          >
            <router-link 
              :to="`/tickets/${time.movie.id}/2`"
              class="w-44 px-4 py-3 bg-[#454D6A] text-white flex justify-center items-center rounded-sm group-hover:bg-primary cursor-pointer"
            >
              {{ time.localTime }}
            </router-link>
            <div class="flex gap-2 mt-2 justify-center">
              <p class="border border-yellow-500 bg-black text-white uppercase px-2 py-1 text-[10px] rounded">
                {{ time.audio_type }}
              </p>
              <p class="px-2 py-1 bg-green-500 text-white rounded text-[10px]">
                {{ time.format }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <p v-else class="text-gray-700">Không có suất chiếu nào. Vui lòng chọn ngày khác.</p>
  </div>
</template>
