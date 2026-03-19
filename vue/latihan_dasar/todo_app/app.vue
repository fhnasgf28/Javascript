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

import {ref, computed} from 'vue';

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
    }   

}

</script>