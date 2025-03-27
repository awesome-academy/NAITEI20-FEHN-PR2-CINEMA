<template>
  <div class="max-w-[40vw] relative">
    <h2 class="text-2xl font-bold mb-6">Đăng ký tài khoản</h2>
    <form @submit.prevent="handleRegister">
      <div class="grid grid-cols-2 gap-4 font-[300] mb-4">
        <div>
          <label class="block text-sm">Họ *</label>
          <input v-model="lastName" type="text" class="w-full mt-2 border border-gray-200 p-2 rounded focus:outline-none" required />
        </div>
        <div>
          <label class="block text-sm">Tên đệm và tên *</label>
          <input v-model="firstName" type="text" class="w-full mt-2 border border-gray-200 p-2 rounded focus:outline-none" required />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 font-[300] mb-4">
        <div class="mb-3">
          <label class="block text-sm mb-2">Giới tính *</label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="gender" value="Nam" class="peer hidden" />
              <span class="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center
                          peer-hover:bg-black peer-checked:bg-primary"></span>
              Nam
            </label>

            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="gender" value="Nữ" class="peer hidden" />
              <span class="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center
                          peer-hover:bg-black peer-checked:bg-primary"></span>
              Nữ
            </label>

            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="gender" value="Khác" class="peer hidden" />
              <span class="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center
                          peer-hover:bg-black peer-checked:bg-primary"></span>
              Khác
            </label>
          </div>
        </div>

        <div class="mb-3">
          <label class="block text-sm">Địa chỉ email *</label>
          <input v-model="email" type="email" class="w-full mt-2 border border-gray-200 p-2 rounded focus:outline-none" required />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-sm">Mật khẩu *</label>
          <input v-model="password" type="password" class="w-full mt-2 border border-gray-200 p-2 rounded focus:outline-none" required />
        </div>
        <div>
          <label class="block text-sm">Nhập lại mật khẩu *</label>
          <input v-model="confirmPassword" type="password" class="w-full mt-2 border border-gray-200 p-2 rounded focus:outline-none" required />
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-sm">Số điện thoại *</label>
        <input v-model="phone" type="text" class="w-full mt-2 border border-gray-200 p-2 rounded focus:outline-none" required />
      </div>

      <div class="mb-4">
        <label class="block text-sm mb-2">Ngày sinh *</label>
        <div class="grid grid-cols-3 gap-4">
          <select v-model="birthDay" class="w-full mt-2 border border-gray-200 p-2 rounded focus:outline-none">
            <option value="" disabled>Chọn ngày</option>
            <option v-for="n in 31" :key="n">{{ n }}</option>
          </select>
          <select v-model="birthMonth" class="w-full mt-2 border border-gray-200 p-2 rounded focus:outline-none">
            <option value="" disabled>Chọn tháng</option>
            <option v-for="n in 12" :key="n">{{ n }}</option>
          </select>
          <select v-model="birthYear" class="w-full mt-2 border border-gray-200 p-2 rounded focus:outline-none">
            <option value="" disabled>Chọn năm</option>
            <option v-for="n in 80" :key="n">{{ 2026 - n }}</option>
          </select>
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-sm">Tỉnh/Thành phố *</label>
        <select v-model="city" class="w-full mt-2 border border-gray-200 p-2 rounded focus:outline-none">
          <option value="" disabled>Chọn Tỉnh/Thành phố</option>
          <option>Hà Nội</option>
          <option>TP Hồ Chí Minh</option>
          <option>Đà Nẵng</option>
        </select>
      </div>

      <div class="mb-4 text-sm">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="agree" required class="peer hidden" />
          <span class="w-5 h-5 rounded border border-gray-400 flex items-center justify-center 
                      peer-hover:bg-black peer-checked:bg-primary">
          </span>
          Tôi đã đọc, hiểu và đồng ý với các <a href="#" class="text-primary">điều khoản</a>
        </label>
      </div>

      <div class="mb-4 text-sm">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="newsletter" class="peer hidden" />
          <span class="w-5 h-5 rounded border border-gray-400 flex items-center justify-center 
                      peer-hover:bg-black peer-checked:bg-primary">
          </span>
          Nhận thông tin chương trình khuyến mãi
        </label>
      </div>

      <button type="submit" class="w-full bg-primary text-white font-bold p-2 rounded-lg mt-8 hover:bg-green-600 transition cursor-pointer">ĐĂNG KÝ</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { register } from "../../utils/api";
import { useRouter } from "vue-router";

const router = useRouter();

const lastName = ref("");
const firstName = ref("");
const gender = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const phone = ref("");
const birthDay = ref("");
const birthMonth = ref("");
const birthYear = ref("");
const city = ref("");
const agree = ref(false);
const newsletter = ref(false);

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Mật khẩu nhập lại không khớp!");
    return;
  }

  try {
    const newUser = {
      name: `${lastName.value} ${firstName.value}`,
      gender: gender.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      date_of_birth: `${birthYear.value}-${birthMonth.value.padStart(2, '0')}-${birthDay.value.padStart(2, '0')}`,
      city: city.value,
      role: "user",
      avatar_url: "https://placeimg.com/200/200/people",
    };

    const user = await register(newUser);
    console.log("Đăng ký thành công:", user);
    alert("Đăng ký thành công!");
    router.push("/");
  } catch (error) {
    alert(error.message);
  }
};
</script>

