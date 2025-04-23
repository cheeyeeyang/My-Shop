<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <div
      class="fixed inset-y-0 left-0 bg-white overflow-y-auto shadow-lg transition-all duration-300 ease-in-out z-20"
      :class="[
        isSidebarOpen ? 'w-64' : 'w-20',
        isMobile ? 'transform transition-transform duration-300' : '',
        isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0',
      ]"
    >
      <div
        class="p-4 border-b border-gray-200 flex items-center justify-between"
      >
        <h1 v-show="isSidebarOpen" class="text-xl font-bold text-gray-800">
          7S Shipping Express
        </h1>
        <button @click="toggleSidebar" class="p-1 rounded-md hover:bg-gray-100">
          <svg
            class="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <nav class="p-4">
        <ul class="space-y-2">
          <li>
            <NuxtLink
              to="/"
              class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              :class="!isSidebarOpen ? 'justify-center' : ''"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span v-show="isSidebarOpen" class="ml-3">Dashboard</span>
            </NuxtLink>
          </li>
          <li>
            <div class="relative">
              <button
                @click="toggleSettingsMenu"
                class="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                :class="!isSidebarOpen ? 'justify-center' : ''"
              >
                <div class="flex items-center">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span v-show="isSidebarOpen" class="ml-3">Settings</span>
                </div>
                <svg
                  v-show="isSidebarOpen"
                  class="w-4 h-4 ml-1 transition-transform duration-200"
                  :class="isSettingsMenuOpen ? 'transform rotate-180' : ''"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <!-- Sub-menu -->
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <ul
                  v-show="isSettingsMenuOpen && isSidebarOpen"
                  class="ml-8 mt-1 space-y-1 pl-2 border-l-2 border-gray-200"
                >
                  <li v-if="$checkPermission('access_role')">
                    <NuxtLink
                      to="/settings/roles"
                      class="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
                    >
                      <svg
                        class="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      Roles
                    </NuxtLink>
                  </li>
                  <li v-if="$checkPermission('access_user')">
                    <NuxtLink
                      to="/settings/users"
                      class="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
                    >
                      <svg
                        class="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Users
                    </NuxtLink>
                  </li>
                </ul>
              </transition>
            </div>
          </li>
          <li>
            <button
              @click="handleLogout"
              class="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              :class="!isSidebarOpen ? 'justify-center' : ''"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                />
              </svg>
              <span v-show="isSidebarOpen" class="ml-3">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Main content -->
    <div :class="[!isMobile ? (isSidebarOpen ? 'ml-64' : 'ml-20') : '']">
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <div class="px-6 py-3 flex justify-between items-center">
          <div class="flex items-center">
            <button
              v-if="isMobile"
              @click="toggleSidebar"
              class="mr-4 p-1 rounded-md hover:bg-gray-100"
            >
              <svg
                class="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <!-- <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2> -->
          </div>
          <div class="flex items-center space-x-4">
            <button class="p-2 rounded-full hover:bg-gray-100">
              <svg
                class="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <div class="flex items-center">
              <span class="ml-2 text-sm font-medium text-gray-700"
                >John Doe</span
              >
            </div>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="p-2 lg:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const isSidebarOpen = ref(true);
const isSettingsMenuOpen = ref(false);
const isMobile = ref(false);

// Toggle sidebar state
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  if (!isSidebarOpen.value) {
    isSettingsMenuOpen.value = false;
  }
};

// Toggle settings menu
const toggleSettingsMenu = () => {
  isSettingsMenuOpen.value = !isSettingsMenuOpen.value;
};

// Close sidebar on mobile when route changes
const route = useRoute();
watch(route, () => {
  if (isMobile.value) {
    isSidebarOpen.value = false;
    isSettingsMenuOpen.value = false;
  }
});

// Responsive behavior
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
  if (isMobile.value) {
    isSidebarOpen.value = false;
  } else {
    isSidebarOpen.value = true;
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkMobile);
});

const props = defineProps({
  title: {
    type: String,
    default: "Dashboard",
  },
});
import { navigateTo } from "#app";
function handleLogout() {
  localStorage.removeItem("token");
  navigateTo("/login");
}
</script>

<style scoped>
.router-link-active {
  @apply bg-blue-50 text-blue-600;
}

.router-link-active svg {
  @apply text-blue-600;
}

/* Optional: Add backdrop filter for mobile when sidebar is open */
@media (max-width: 767px) {
  .sidebar-open-backdrop {
    @apply fixed inset-0 bg-black bg-opacity-50 z-10;
  }
}
</style>