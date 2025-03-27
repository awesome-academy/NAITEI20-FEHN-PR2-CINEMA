<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { getUserById } from "../../utils/api";
import { X } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const user = ref(null);

onMounted(async () => {
  try {
    const userId = route.params.id;
    user.value = await getUserById(userId);
  } catch (error) {
    console.error("Không thể tải dữ liệu user:", error);
  }
});

const closeProfile = () => {
  router.push("/users"); // Điều hướng về danh sách users
};
</script>

<template>
  <div v-if="user" class="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div class="relative bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg">
      <button @click="closeProfile" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        <X class="w-5 h-5" />
      </button>

      <div class="text-center">
        <div class="w-24 h-24 mx-auto rounded-full overflow-hidden">
          <img 
            :src="user.avatar_url || '/images/bhd-logo.png'" 
            :alt="user.name" 
            class="w-full h-full object-cover"
            @error="(e) => e.target.src = '/images/bhd-logo.png'"
          />
        </div>
        <h2 class="text-xl font-semibold mt-4">{{ user.name }}</h2>
        <p class="text-gray-500 dark:text-gray-400">{{ user.email }}</p>
      </div>
    </div>
  </div>
</template>
