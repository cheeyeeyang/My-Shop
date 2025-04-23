<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-6 text-center">7S Shipping Express</h1>
      <form @submit.prevent="handleLogin">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="mb-4 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="mb-4 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
         style="font-family: 'Noto Sans Lao';">
          ເຂົ້າສູ່ລະບົບ
        </button>
        <p v-if="error" class="text-red-500 mt-4 text-sm text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "login",
});

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useFetch } from "#app";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

async function handleLogin() {
  const { data, error: fetchError } = await useFetch("/api/login", {
    method: "POST",
    body: { email: email.value, password: password.value },
  });

  if (fetchError.value) {
    error.value = fetchError.value.data?.statusMessage || "Login failed";
  } else {
    localStorage.setItem("token", data.value.token);
    return navigateTo("/");
  }
}
</script>
