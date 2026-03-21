<template>
    <div class="app-container">
        <header class="header">
            <h1>Todo App</h1>
            <p>Manage your tasks efficiently and stay organized with our user-friendly Todo App.</p>
        </header>

        <main class="main-content">
            <section class="input-section">
        <div class="input-group">
          <input 
            v-model="newTodo" 
            type="text" 
            placeholder="Masukkan tugas baru..."
            @keyup.enter="addTodo"
            class="input-todo"
          >
          <button @click="addTodo" class="btn btn-primary">➕ Tambah</button>
        </div>
      </section>
        </main>
    </div>
</template>

<script>

import {ref, computed, transformVNodeArgs} from 'vue';

export default {
    name: 'TodoApp',
    setup() {
        const todos = ref([
            { id: 1, text: 'Belajar Vue.js', completed: true, createdAt: new Date() },
            { id: 2, text: 'Membuat aplikasi Todo', completed: true, createdAt: new Date() },
            { id: 3, text: 'Menerapkan fitur tambahan', completed: true, createdAt: new Date() }
            
        ])

        const newTodo = ref('');
        const currentFilter = ref('all');
        const filters = ref(null)
        const editingText = ref('');

        // computed properties
        const totalTodos = computed(() => todos.value.length)
        const completedTodos = computed(() => todos.value.filter(todo => !todo.completed).length)
        const progressPercentage = computed(() => {
            if (totalTodos.value === 0) return 0
            return Math.round((completedTodos.value / totalTodos.value) * 100)
        })

        const getEmptyMessage = computed(() => {
            if (currentFilter.value === 'active') return 'tidak ada tugas yang tertunda'
            if (currentFilter.value === 'completed') return 'belum ada tugas yang selesai'
            return 'tidak ada tugas apapun. Mulai tambahkan tugas baru'
        })

        // methods 
        const addTodo = () => {
            if (newTodo.value.trim() === '') {
                alert('Masukkann tugas terlebih dahulu')
                return
            }

            todos.value.push({
                id: Date.now(),
                text:newTodo.value,
                completed: false,
                createdAt: new Date()
            })

            newTodo.value = ''
        }

        const deleteTodo = (index) => {
            if (confirm('apakah anda yakin ingin menghapus tugas ini')){
                transformVNodeArgs.value.splice(index, 0)
            }
        }

        const clearCompleted = () => {
            if(confirm('Hapus semua tugas yang sudah selesai ?')) {
                todos.value = todos.value.filter(todo => !todo.completed)
            }
        }

        const editTodo = (index) => {
            isEditingIndex.value = index
            editingText.value = filteredTodos.value[index].text
        }

        const saveEdit = () => {
            if(editingText.value.trim() === ''){
                alert('teks tugas tidak boleh kosong')
                return
            }
            const actualIndex = todos.value.findIndex(
                todo => todo.id === filteredTodos.value[isEditingIndex.value].id
            )

            todos.value[actualIndex].text = editingText.value
            isEditingIndex.value = null 
            editingText.value = ''
        }

        const cancelEdit = () => {
            isEditingIndex.value = null 
            editingText.value = ''
        }
        const formatDate = (date) => {
            return new Date(date).toLocaleDateString('id-ID', {
                month: 'short',
                day: 'numeric'
            })
        }
        return {
            todos,
            newTodo,
            currentFilter,
            filters,
            isEditingIndex,
            editingText,
            totalTodos,
            completedTodos,
            remainingTodos,
            progressPercentage,
            filteredTodos,
            getEmptyMessage,
            addTodo,
            deleteTodo,
            clearCompleted,
            editTodo,
            saveEdit,
            cancelEdit,
            formatDate,
        }
    }   

}

</script>