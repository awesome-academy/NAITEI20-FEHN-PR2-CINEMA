<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left w-1/12 sm:px-6">ID</th>
            <th class="px-5 py-3 text-left w-3/12 sm:px-6">User</th>
            <th class="px-5 py-3 text-left w-3/12 sm:px-6">Email</th>
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">Phone</th>
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">Role</th>
            <th class="px-5 py-3 text-left w-1/12 sm:px-6">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr  v-for="user in users" :key="user.id" class="border-t border-gray-100 dark:border-gray-800">
            <td class="px-5 py-4 sm:px-6">{{ user.id }}</td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 overflow-hidden rounded-full">
                  <img :src="user.avatar_url" @error="(e) => e.target.src = defaultAvatar" :alt="user.name" class="w-full h-full object-cover" />
                </div>
                <div>
                  <span class="block font-medium text-gray-800 dark:text-white/90">
                    {{ user.name }}
                  </span>
                  <span class="block text-gray-500 text-sm dark:text-gray-400">
                    {{ user.date_of_birth }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">{{ user.email }}</td>
            <td class="px-5 py-4 sm:px-6">{{ user.phone }}</td>
            <td class="px-5 py-4 sm:px-6">{{ user.role }}</td>
            <td class="px-5 py-4 sm:px-6 flex space-x-3">
              <button @click="openModal(user)" class="text-blue-600 hover:text-blue-800">
                <Pencil class="w-5 h-5" />
              </button>
              
              <button @click="$emit('delete', user.id)" class="text-red-600 hover:text-red-800">
                <Trash2 class="w-5 h-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal -->
      <Modal v-if="isEditModalOpen" @close="closeEditModal">
        <template #body>
          <div class="relative w-full max-w-[600px] p-6 rounded-3xl bg-white dark:bg-gray-900">
            <!-- Close Button -->
            <button @click="closeEditModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
              <X class="w-5 h-5" />
            </button>
            
            <!-- Modal Header -->
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Chỉnh sửa người dùng</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Cập nhật thông tin tài khoản</p>

            <!-- Form Content -->
            <form @submit.prevent="saveUser">
              <div class="space-y-4 focus:outline-none">
                <div class="grid grid-cols-4 gap-4">
                  <div class="col-span-1">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-400">ID</label>
                    <input v-model="editingUser.id" type="text" class="input-field" disabled />
                  </div>
                  <div class="col-span-3">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-400">Họ và tên</label>
                    <input v-model="editingUser.name" type="text" class="input-field w-full" />
                  </div>
                </div>

                <div class="grid grid-cols-4 gap-4">
                  <div class="col-span-1">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-400">Giới tính</label>
                    <select v-model="editingUser.gender" class="input-field">
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                  <div class="col-span-3">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-400">Ngày sinh</label>
                    <input v-model="editingUser.date_of_birth" type="text" class="input-field w-full" />
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="col-span-1">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-400">Email</label>
                    <input v-model="editingUser.email" type="email" class="input-field" />
                  </div>
                  <div class="col-span-1">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-400">Số điện thoại</label>
                    <input v-model="editingUser.phone" type="text" class="input-field" />
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="col-span-1">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-400">Thành phố</label>
                    <select v-model="editingUser.city" class="input-field">
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="TP Hồ Chí Minh">TP Hồ Chí Minh</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                    </select>
                  </div>
                  <div class="col-span-1">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-400">Vai trò</label>
                    <select v-model="editingUser.role" class="input-field">
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>                
              </div>

              <!-- Action Buttons -->
              <div class="mt-6 flex justify-end gap-3">
                <button type="button" @click="closeEditModal" class="btn-cancel">Hủy</button>
                <button type="submit" class="btn-primary bg-primary hover:bg-green-500">Lưu</button>
              </div>
            </form>

          </div>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script setup>
import { Pencil, Trash2, X } from "lucide-vue-next";
import Modal from "../Modal.vue";
import defaultAvatar from "@/assets/images/bhd-logo.png";

const props = defineProps({
  users: Array,
});

const emit = defineEmits(["update", "delete"]);

const editingUser = ref({});
const isEditModalOpen = ref(false);

const openModal = (user) => {
  editingUser.value = JSON.parse(JSON.stringify(user));
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  editingUser.value = {};
};

const updateUserLocally = (updatedUser) => {
  const user = props.users.find(user => user.id === updatedUser.id);
  if (user) {
    Object.assign(user, updatedUser);
  }
  emit("update", updatedUser);
};

const saveUser = async () => {
  try {
    const updatedUser = await updateUser(editingUser.value.id, editingUser.value);
    updateUserLocally(updatedUser); 
    closeEditModal();
  } catch (error) {
    console.error("Lỗi khi cập nhật user:", error);
  }
};
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: transparent;
  color: inherit;
}

.btn-primary {
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: 0.2s;
}
.btn-primary:hover {
  background-color: black;
}

.btn-cancel {
  background-color: #e5e7eb;
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 6px;
}

.btn-cancel:hover {
  background-color: #d9d9d9;
}
</style>
