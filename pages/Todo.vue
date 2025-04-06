<template>
    <div class="h-screen w-screen flex flex-col justify-center items-center bg-gray-800">
        <div class="w-full max-w-lg px-4">
            <TodoHeader title="Minimalist Todo List" />
            <TodoAdd @add-todo="addTodo" />
        </div>

        <div class="flex justify-center my-4">
            <button
                v-for="(filter, index) in filterOptions"
                :key="index"
                class="rounded-lg px-4 py-2 mx-2 text-white lowercase cursor-pointer"
                :class="{
                    'bg-gray-700': filterType === filter,
                    'bg-gray-800': filterType !== filter
                }"
                @click="changeFilter(filter)"
            >
                {{ filter.charAt(0).toUpperCase() + filter.slice(1) }}
            </button>
        </div>

        <div class="w-full max-w-lg overflow-y-auto scrollbar-hidden px-4">
            <TodoList :todos="filteredTodos" @delete-todo="deleteTodo" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const todos = ref([]);

const filterType = ref('all');
const filterOptions = ['all', 'active', 'completed', 'deleted'];

const filteredTodos = computed(() => {
    return todos.value.filter(todo => {
        if (filterType.value === 'completed') return todo.completed && !todo.deleted;
        if (filterType.value === 'deleted') return todo.deleted;
        if (filterType.value === 'active') return !todo.completed && !todo.deleted;
        return !todo.deleted;
    });
});

const changeFilter = (type) => {
    filterType.value = type;
};

const addTodo = (todo) => {
    todos.value.push(todo);
};

const deleteTodo = (id, isPermanentDelete = false) => {
    const todoIndex = todos.value.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        if (isPermanentDelete) {
            todos.value.splice(todoIndex, 1);
        } else {
            todos.value[todoIndex].deleted = true; 
        }
    }
};
</script>

<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
    display: none;
}

.scrollbar-hidden {
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-behavior: smooth;
}
</style>
