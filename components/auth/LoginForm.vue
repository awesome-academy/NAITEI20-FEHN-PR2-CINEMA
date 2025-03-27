<template>
  <div class="max-w-[25vw] relative">
    <h2 class="text-2xl font-bold mb-6">Đăng nhập tài khoản</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3 font-[300]">
        <label class="block text-sm">Email *</label>
        <input v-model="email" type="email" class="w-full mt-2 border border-gray-200 p-2 rounded focus:outline-none" placeholder="Tài khoản hoặc địa chỉ email" required />
      </div>
      <div class="mb-3 font-[300]">
        <label class="block text-sm">Mật khẩu *</label>
        <input v-model="password" type="password" class="w-full mt-2 border border-gray-200 p-2 rounded focus:outline-none" placeholder="Mật khẩu" required />
      </div>
      <a href="#" class="absolute text-primary text-sm right-0">Quên mật khẩu?</a>
      <button type="submit" class="w-full bg-primary font-bold text-base text-white p-2 rounded-lg mt-8 hover:bg-green-600 transition cursor-pointer">ĐĂNG NHẬP</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { login } from "../../utils/api";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = async () => {
  try {
    const user = await login(email.value, password.value);
    if (user) {
      console.log("Đăng nhập thành công:", user);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/");
    } else {
      console.error("Sai email hoặc mật khẩu");
      alert("Sai email hoặc mật khẩu");
    }
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
  }
};
</script>
