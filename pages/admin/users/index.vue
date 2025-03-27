<template>
  <PageBreadcrumb :pageTitle="currentPageTitle" />
  <div class="space-y-5 sm:space-y-6">
    <ComponentCard title="User List">
      <UserTable :users="users" @update="handleUserUpdate" @delete="deleteUser" />
    </ComponentCard>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

import { ref, onMounted } from "vue";
import PageBreadcrumb from "@/components/admin/PageBreadcrumb.vue";
import ComponentCard from "@/components/admin/ComponentCard.vue";
import UserTable from "@/components/admin/table/UserTable.vue";
import { getUsers, deleteUserById } from "@../../../utils/api";

const currentPageTitle = ref("User Management");

const users = ref([]);

onMounted(async () => {
  try {
    users.value = await getUsers();
  } catch (error) {
    console.error("Lỗi khi lấy danh sách users:", error);
  }
});

const handleUserUpdate = (updatedUser) => {
  const user = users.value.find(user => user.id === updatedUser.id);
  if (user) {
    Object.assign(user, updatedUser); // Cập nhật chỉ một object trong mảng
  }
};

// Xử lý khi nhấn "Delete"
const deleteUser = async (id) => {
  if (confirm("Bạn có chắc muốn xóa user này?")) {
    try {
      await deleteUserById(id);
      users.value = users.value.filter((user) => user.id !== id); // Cập nhật UI
    } catch (error) {
      console.error("Lỗi khi xóa user:", error);
    }
  }
};
</script>
