<template>
  <button
    class="relative overflow-hidden rounded-full bg-gray-700 text-white px-2 h-[50px] w-[300px] text-lg font-semibold flex justify-center items-center transition-all duration-300 hover:scale-105">
    <!-- Animated Gradient Background -->
    <div class="absolute inset-0 blur-xl ansition-transform duration-300">
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] rounded-full  bg-gradient-to-r from-[#00c6cc] via-purple-500 to-pink-500 animate-rotate">
      </div>
    </div>

    <!-- Button Content -->
    <div
      class="relative w-[100%] px-10 h-[45px] flex justify-center items-center rounded-full bg-yellow-300 text-black border border-black">
      {{ label }}

    </div>
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: "Button",
  },
});
</script>

<style scoped>
@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.animate-rotate {
  animation: rotate 2s linear infinite;
  will-change: transform;
}
</style>