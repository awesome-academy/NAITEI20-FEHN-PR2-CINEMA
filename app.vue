<script setup>
import "primeicons/primeicons.css";
import SidebarProvider from "~/components/admin/SidebarProvider.vue";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const checkLoginStatus = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("user") !== null;
  }
  return false;
};

onMounted(() => {
  if (!checkLoginStatus() && route.path.startsWith("/tickets")) {
    alert("Chưa đăng nhập!");
    setTimeout(() => {
      router.replace("/auth");
    }, 2000);
  }
});
</script>

<template>
  <SidebarProvider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </SidebarProvider>
</template>
