<template>
  <PageBreadcrumb :pageTitle="currentPageTitle" />
  <div class="space-y-5 sm:space-y-6">
    <ComponentCard title="Tickets">
      <AdminTableTicket />
    </ComponentCard>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

import { ref } from "vue";
import PageBreadcrumb from "@/components/admin/PageBreadcrumb.vue";
import ComponentCard from "@/components/admin/ComponentCard.vue";
const currentPageTitle = ref("Tickets");
</script>
