<template>
    <div class="min-h-screen bg-white py-6 px-6 sm:px-1 lg:px-8" v-if="$checkPermission('access_user')">
        <div class="mx-auto">
        
            <!-- Header and Create User Button -->
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-xl font-semibold text-gray-800">User Management</h1>
                </div>
                <NuxtLink to="/">
                    Dashboard
                </NuxtLink>

            </div>

            <!-- Users Table -->


            <div class="relative overflow-x-auto bg-slate-100 sm:rounded-lg p-2">
                <div
                    class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                    <div class="relative">
                        <div
                            class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor"
                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <input type="text" id="table-search"
                            class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 outline-none"
                            placeholder="Search for items">
                    </div>
                    <button @click="openModal"
                        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                        Create New User
                    </button>

                </div>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr class="border border-gray-200 text-lg">
                            <th scope="col" class="px-6 py-3 uppercase">
                                #
                            </th>
                            <th scope="col" class="px-6 py-3 uppercase">
                                username
                            </th>
                            <th scope="col" class="px-6 py-3">
                                email
                            </th>

                            <th scope="col" class="px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user , index) in users" :key="user.id" class="bg-white border border-gray-200  hover:bg-blue-100">
                            <td scope="row" class="px-6 py-4 font-medium text-gray-700 whitespace-nowra">
                                {{ index+1 }}
                            </td>
                            <td scope="row" class="px-6 py-4 font-medium text-gray-700 whitespace-nowra">
                                {{ user.name }}
                            </td>
                           
                            <td class="px-6 py-4 font-medium  text-gray-700 whitespace-nowra">
                                {{ user.email }}
                            </td>
                            <td class="px-6 py-4 text-center">
                                <a href="#" @click="showEdit(user)"
                                    class="px-4 py-2 bg-yellow-300  text-gray-700 font-bold rounded-md hover:bg-yellow-400 transition-colors">Edit</a>
                                <a href="#"
                                    class="px-4 py-2 bg-red-500 ml-2  text-gray-700 font-bold rounded-md hover:bg-red-600 transition-colors">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

        <!-- Create User Modal -->
        <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-md shadow-xl max-w-lg w-full">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold text-gray-800">
                            {{ user.id ? 'Update' : 'Create' }}

                            New User</h2>
                        <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form @submit.prevent="createUser" class="space-y-4">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
                            <input id="name" v-model="user.name" type="text" required
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                        </div>

                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                            <input id="email" v-model="user.email" type="email" required
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                        </div>

                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                            <input id="password" v-model="user.password" type="password" :required="!user.id"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                        </div>

                        <div class="flex justify-between space-x-3 pt-4">
                            <button type="button" @click="closeModal"
                                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Cancel
                            </button>
                            <button type="submit"
                                class="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                                {{ user.id ? 'Update' : 'Create' }}
                            </button>
                        </div>
                    </form>

                    <!-- Status Message -->
                    <div v-if="message" :class="[error ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700']"
                        class="mt-4 p-3 rounded-md text-sm">
                        {{ message }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
const isModalOpen = ref(false);
const user = ref({
    id: '',
    name: '',
    email: '',
    password: '',
});

const message = ref('');
const error = ref(false);
let token = '';
if (process.client) {
  token = localStorage.getItem('token');
}

const { data: users, refresh } = await useFetch('/api/users', {
  server: false,
  headers: {
    Authorization: `Bearer ${token}`
  }
});



const openModal = () => {
    isModalOpen.value = true;
    message.value = '';
};
const closeModal = () => {
    isModalOpen.value = false;
    user.value = { name: '', email: '', password: '' };
    message.value = '';
};
const showEdit = (data) => {
    user.value.id = data.id;
    user.value.name = data.name;
    user.value.email = data.email;
    isModalOpen.value = true;
    message.value = '';
};
const createUser = async () => {
    try {
        if (user.value.id) {
            const response = await fetch('/api/users/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user.value),
            });
            const result = await response.json();
            if (result.success) {
                message.value = 'User update successfully!';
                error.value = false;
                user.value = { name: '', email: '', password: '' };
                await refresh();
                closeModal();
            } else {
                message.value = result.error || 'Failed to create user.';
                error.value = true;
            }
        } else {
            const response = await fetch('/api/users/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user.value),
            });

            const result = await response.json();

            if (result.success) {
                message.value = 'User created successfully!';
                error.value = false;
                user.value = { name: '', email: '', password: '' };
                await refresh();
                closeModal();
            } else {
                message.value = result.error || 'Failed to create user.';
                error.value = true;
            }
        }



    } catch (err) {
        message.value = err;
        error.value = true;
    }
};

</script>