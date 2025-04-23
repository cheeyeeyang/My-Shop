<template>
  <div class="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header and Dashboard Link -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-semibold text-gray-800">Roles Management</h1>
        <router-link to="/" class="text-indigo-600 hover:text-indigo-800 transition-colors">
          Dashboard
        </router-link>
      </div>

      <!-- Table Section -->
      <div class="bg-white rounded-lg shadow-sm p-4">
        <!-- Search and Create Button -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 pb-4">
          <div class="relative w-full sm:w-80">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <input type="text" v-model="searchQuery"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-sm text-gray-900 focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search roles..." />
          </div>
          <button @click="openModal"
            class="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:ring-offset-2">
            Create New Role
          </button>
        </div>
        <!-- Roles Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col"
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(role, index) in filteredRoles" :key="role.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ index + 1 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {{ role.name }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  {{ role.des }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button @click="showEdit(role.id)"
                    class="mr-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1">
                    Edit
                  </button>
                  <button @click="confirmDelete(role.id)"
                    class="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Create/Edit Role Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-800">
              {{ form.id ? 'Update' : 'Create' }} Role
            </h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-500 focus:outline-none">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="submitForm" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                  Role Name
                </label>
                <input type="text" id="name" v-model="form.name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter role name" required />
              </div>
              <div>
                <label for="des" class="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input type="text" id="des" v-model="form.des"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter description" />
              </div>
            </div>

            <div class="border-t border-gray-200 pt-4">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Permissions</h3>

              <div v-for="parent in function_models" :key="parent.id" class="mb-4">
                <label class="flex items-center space-x-3">
                  <input type="checkbox" :checked="selectedParents.includes(parent.id)"
                    @change="selectParent(parent.id)"
                    class="checkbox-custom" />
                  <span class="text-gray-900 font-medium">{{ parent.des }}</span>
                </label>

                <div v-if="selectedParents.includes(parent.id)" class="ml-12 mt-2 space-y-2">
                  <div v-for="child in parent.children" :key="child.id">
                    <label class="flex items-center space-x-3">
                      <input type="checkbox" :checked="selectedItems.includes(child.id)"
                        @change="onChildClick(child.id)"
                        class="checkbox-custom" />
                      <span class="text-gray-700">{{ child.des }}</span>
                    </label>

                    <div v-if="selectedItems.includes(child.id) && child.children"
                      class="ml-12 mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      <label v-for="grandchild in child.children" :key="grandchild.id"
                        class="flex items-center space-x-2">
                        <input type="checkbox" :checked="selectedItems.includes(grandchild.id)"
                          @change="toggleGrandchild(grandchild.id)"
                          class="checkbox-custom" />
                        <span class="text-gray-600 text-sm">{{ grandchild.des }}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <button type="button" @click="closeModal"
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
              </button>
              <button type="submit"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {{ form.id ? 'Update' : 'Create' }} Role
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-medium text-gray-900">Delete Role</h3>
          <button @click="showDeleteModal = false" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p class="text-gray-600 mb-6">Are you sure you want to delete this role? This action cannot be undone.</p>
        <div class="flex justify-end space-x-3">
          <button @click="showDeleteModal = false"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Cancel
          </button>
          <button @click="deleteRole"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
import axios from 'axios';
const isModalOpen = ref(false)
const showDeleteModal = ref(false)
const searchQuery = ref('')
const selectedParents = ref([])
const selectedItems = ref([])
const function_models = ref([])
const roleToDelete = ref(null)
const errors = ref({})
const form = ref({
  id: '',
  name: '',
  des: ''
})


let token = '';
if (process.client) {
  token = localStorage.getItem('token');
}
const { data: roles, refresh } = await useFetch('/api/roles', {
  server: false,
  headers: {
    Authorization: `Bearer ${token}`
  }
});


const getfunction_models = async () => {
  const response = await axios.get("/api/roles/function_models");
  function_models.value = response.data.function;
}


const filteredRoles = computed(() => {
  if (!roles.value || roles.value.length === 0) {
    return [];
  }
  return roles.value.filter(role =>
    role.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    role.des.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function openModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  resetForm()
}
const showEdit = async(id) => {
  const response = await axios.get(`/api/roles/${id}`);
  form.value.id = response.data.data.id
  form.value.name = response.data.data.name
  form.value.des = response.data.data.des
  selectedParents.value = response.data.data.Parents_id
  selectedItems.value = response.data.data.function_id
  isModalOpen.value = true
}
function resetForm() {
  form.value = {
    id: '',
    name: '',
    des: ''
  }
  selectedParents.value = []
  selectedItems.value = []
}

function selectParent(id) {
  if (selectedParents.value.includes(id)) {
    // Deselect parent
    selectedParents.value = selectedParents.value.filter(parentId => parentId !== id)

    // Deselect all children and grandchildren of this parent
    const parent = function_models.value.find(p => p.id === id)
    if (parent) {
      selectedItems.value = selectedItems.value.filter(itemId => {
        return !parent.children.some(child =>
          child.id === itemId ||
          (child.children && child.children.some(grandchild => grandchild.id === itemId))
        )
      })
    }
    selectedItems.value = selectedItems.value.filter(itemId => itemId !== id)
  } else {
    // Select parent
    selectedParents.value = [...selectedParents.value, id]
    selectedItems.value = [...selectedItems.value, id]
  }
}

function onChildClick(childId) {
  const child = function_models.value
    .flatMap(parent => parent.children)
    .find(c => c.id === childId)
  if (!child) return
  const grandchildIds = child.children ? child.children.map(g => g.id) : []
  if (selectedItems.value.includes(childId)) {
    // Deselect child and all grandchildren
    selectedItems.value = selectedItems.value.filter(itemId =>
      itemId !== childId && !grandchildIds.includes(itemId)
    )
  } else {
    selectedItems.value = [...selectedItems.value, childId]
  }
}



function toggleGrandchild(id) {
  if (selectedItems.value.includes(id)) {
    selectedItems.value = selectedItems.value.filter(itemId => itemId !== id)
  } else {
    selectedItems.value = [...selectedItems.value, id]
  }
}


const resetform = () => {
  form.value.name = '';
  form.value.id = '';
  form.value.des = '';
  selectedParents.value = [];
  selectedItems.value = [];
};

const validateForm = () => {
  errors.value = {}
  if (!form.value.name) errors.value.name = "name is required.";
  return Object.keys(errors.value).length === 0;
}
const submitForm = async () => {
  if (!validateForm()) return;
  const payload = {
    id: form.value.id || null,
    name: form.value.name,
    des: form.value.des,
    function_id: selectedItems.value 
  };

  if (form.value.id) {
    // Update existing role
    const response = await axios.post("/api/roles/update", payload);
    if(response.status ===200){
      await refresh();
      closeModal()
    }
  } else {
    const response = await axios.post("/api/roles/create", payload);
    if(response.status ===200){
      await refresh();
      closeModal()
    }
  }
}

function confirmDelete(id) {
  roleToDelete.value = id
  showDeleteModal.value = true
}

function deleteRole() {
  roles.value = roles.value.filter(role => role.id !== roleToDelete.value)
  showDeleteModal.value = false
  roleToDelete.value = null
}


onMounted(async () => {
  await getfunction_models()
})
</script>

<style scoped>
.checkbox-custom {
    width: 20px;
    height: 20px;
    accent-color: #194bff;
}
</style>