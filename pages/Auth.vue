<template>
  <div class="mx-20 mt-10 mb-10">
    <div class="grid grid-cols-5 gap-10">
      <LoginForm class="col-span-2"/>
      <RegisterForm class="col-span-3"/>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    LoginForm: defineAsyncComponent(() => import('~/components/auth/LoginForm.vue')),
    RegisterForm: defineAsyncComponent(() => import('~/components/auth/RegisterForm.vue'))
  },
};
</script>
