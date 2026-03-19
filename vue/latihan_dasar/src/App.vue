<template>
  <div class="app-container">
    <header class="header">
      <h1>📝 My Todo List</h1>
      <p>Kelola tugas Anda dengan mudah</p>
    </header>

    <main class="main-content">
      <!-- Input Section -->
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

      <!-- Stats Section -->
      <section class="stats-section">
        <div class="stat-card">
          <span class="stat-number">{{ totalTodos }}</span>
          <span class="stat-label">Total Tugas</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">{{ completedTodos }}</span>
          <span class="stat-label">Selesai</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">{{ remainingTodos }}</span>
          <span class="stat-label">Sisa</span>
        </div>
      </section>

      <!-- Filter Section -->
      <section class="filter-section">
        <button 
          v-for="filter in filters" 
          :key="filter"
          @click="currentFilter = filter"
          :class="{ active: currentFilter === filter }"
          class="btn btn-filter"
        >
          {{ filter === 'all' ? '📋 Semua' : filter === 'active' ? '🔄 Aktif' : '✅ Selesai' }}
        </button>
      </section>

      <!-- Todo List Section -->
      <section class="todo-section">
        <div v-if="filteredTodos.length === 0" class="empty-state">
          <p>{{ getEmptyMessage }}</p>
        </div>

        <ul v-else class="todo-list">
          <li 
            v-for="(todo, index) in filteredTodos" 
            :key="todo.id"
            :class="{ completed: todo.completed }"
            class="todo-item"
          >
            <div class="todo-content">
              <input 
                type="checkbox" 
                v-model="todo.completed"
                class="todo-checkbox"
              >
              <span class="todo-text">{{ todo.text }}</span>
              <span class="todo-date">{{ formatDate(todo.createdAt) }}</span>
            </div>

            <div class="todo-actions">
              <button 
                @click="editTodo(index)" 
                class="btn btn-small btn-edit"
                title="Edit"
              >
                ✏️
              </button>
              <button 
                @click="deleteTodo(index)" 
                class="btn btn-small btn-delete"
                title="Hapus"
              >
                🗑️
              </button>
            </div>
          </li>
        </ul>
      </section>

      <!-- Progress Bar -->
      <section class="progress-section">
        <div class="progress-info">
          <span>Progress: {{ progressPercentage }}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
        </div>
      </section>

      <!-- Clear All Button -->
      <section class="action-section" v-if="completedTodos > 0">
        <button @click="clearCompleted" class="btn btn-secondary">
          🗑️ Hapus Semua yang Selesai
        </button>
      </section>
    </main>

    <!-- Edit Modal -->
    <div v-if="isEditingIndex !== null" class="modal-overlay">
      <div class="modal">
        <h2>Edit Tugas</h2>
        <input 
          v-model="editingText" 
          type="text"
          class="input-todo"
          @keyup.enter="saveEdit"
        >
        <div class="modal-actions">
          <button @click="saveEdit" class="btn btn-primary">💾 Simpan</button>
          <button @click="cancelEdit" class="btn btn-secondary">❌ Batal</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'App',
  setup() {
    const todos = ref([
      { id: 1, text: 'Belajar Vue Dasar', completed: true, createdAt: new Date() },
      { id: 2, text: 'Membuat Todo App', completed: true, createdAt: new Date() },
      { id: 3, text: 'Belajar Props & Emits', completed: false, createdAt: new Date() }
    ])

    const newTodo = ref('')
    const currentFilter = ref('all')
    const filters = ref(['all', 'active', 'completed'])
    const isEditingIndex = ref(null)
    const editingText = ref('')

    // ========== COMPUTED PROPERTIES ==========
    const totalTodos = computed(() => todos.value.length)

    const completedTodos = computed(() => 
      todos.value.filter(todo => todo.completed).length
    )

    const remainingTodos = computed(() => 
      todos.value.filter(todo => !todo.completed).length
    )

    const progressPercentage = computed(() => {
      if (totalTodos.value === 0) return 0
      return Math.round((completedTodos.value / totalTodos.value) * 100)
    })

    const filteredTodos = computed(() => {
      switch(currentFilter.value) {
        case 'active':
          return todos.value.filter(todo => !todo.completed)
        case 'completed':
          return todos.value.filter(todo => todo.completed)
        default:
          return todos.value
      }
    })

    const getEmptyMessage = computed(() => {
      if (currentFilter.value === 'active') return '✨ Tidak ada tugas yang tertunda!'
      if (currentFilter.value === 'completed') return '📋 Belum ada tugas yang selesai'
      return '🎉 Tidak ada tugas apapun. Mulai tambahkan tugas baru!'
    })

    // ========== METHODS ==========
    const addTodo = () => {
      if (newTodo.value.trim() === '') {
        alert('❌ Masukkan tugas terlebih dahulu!')
        return
      }

      todos.value.push({
        id: Date.now(),
        text: newTodo.value,
        completed: false,
        createdAt: new Date()
      })

      newTodo.value = ''
    }

    const deleteTodo = (index) => {
      if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
        todos.value.splice(index, 0)
      }
    }

    const clearCompleted = () => {
      if (confirm('Hapus semua tugas yang sudah selesai?')) {
        todos.value = todos.value.filter(todo => !todo.completed)
      }
    }

    const editTodo = (index) => {
      isEditingIndex.value = index
      editingText.value = filteredTodos.value[index].text
    }

    const saveEdit = () => {
      if (editingText.value.trim() === '') {
        alert('❌ Teks tugas tidak boleh kosong!')
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
      formatDate
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 30px;
  padding: 20px;
}

.header h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.header p {
  font-size: 1.1em;
  opacity: 0.9;
}

.main-content {
  max-width: 700px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 30px;
  overflow: hidden;
}

/* ===== INPUT SECTION ===== */
.input-section {
  margin-bottom: 30px;
}

.input-group {
  display: flex;
  gap: 10px;
}

.input-todo {
  flex: 1;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 0.3s;
}

.input-todo:focus {
  outline: none;
  border-color: #667eea;
}

/* ===== BUTTONS ===== */
.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.btn-filter {
  padding: 8px 16px;
  font-size: 0.9em;
  background: #f5f5f5;
  color: #666;
  border: 2px solid transparent;
}

.btn-filter.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-small {
  padding: 6px 10px;
  font-size: 0.85em;
}

.btn-edit {
  background: #4CAF50;
  color: white;
}

.btn-delete {
  background: #f44336;
  color: white;
}

/* ===== STATS SECTION ===== */
.stats-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 30px;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
}

.stat-number {
  display: block;
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  display: block;
  font-size: 0.9em;
  opacity: 0.9;
}

/* ===== FILTER SECTION ===== */
.filter-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

/* ===== TODO SECTION ===== */
.todo-section {
  margin-bottom: 30px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 1.1em;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 10px;
  border-left: 4px solid #667eea;
  transition: all 0.3s;
}

.todo-item:hover {
  background: #f0f0f0;
  transform: translateX(5px);
}

.todo-item.completed {
  opacity: 0.6;
  background: #e8f5e9;
  border-left-color: #4CAF50;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  word-break: break-word;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
}

.todo-date {
  font-size: 0.85em;
  color: #999;
  margin-left: 10px;
}

.todo-actions {
  display: flex;
  gap: 5px;
}

/* ===== PROGRESS SECTION ===== */
.progress-section {
  margin-bottom: 20px;
}

.progress-info {
  margin-bottom: 10px;
  font-size: 0.9em;
  color: #666;
  font-weight: 600;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s;
}

/* ===== ACTION SECTION ===== */
.action-section {
  text-align: center;
}

/* ===== MODAL ===== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 400px;
}

.modal h2 {
  margin-bottom: 20px;
  color: #333;
}

.modal-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.modal-actions .btn {
  flex: 1;
  justify-content: center;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 600px) {
  .header h1 {
    font-size: 1.8em;
  }

  .main-content {
    padding: 20px;
  }

  .stats-section {
    grid-template-columns: 1fr;
  }

  .filter-section {
    flex-wrap: wrap;
  }

  .input-group {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>