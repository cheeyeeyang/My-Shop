<template>
  <div class="text-cente">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
 onMounted(async () => {
    localStorage.setItem('role_id', 1);
 })
</script>



