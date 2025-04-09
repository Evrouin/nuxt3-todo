<script setup lang="ts">
import { useTodoStore } from '~/stores/todos';

const todoStore = useTodoStore()

const {
    changeFilter,
    filterOptions,
} = todoStore

</script>

<template>
    <div class="h-screen w-screen flex flex-col justify-center items-center bg-gray-800">
        <div class="w-full max-w-lg px-4">
            <TodoHeader title="Minimalist Todo List" />
            <TodoAdd />
        </div>
        <div class="flex justify-center my-4">
            <button 
                v-for="(filter, index) in filterOptions" 
                :key="index"
                class="rounded-lg px-4 py-2 mx-2 text-white lowercase cursor-pointer  transition-all duration-200"
                :class="todoStore.filterType === filter ? 'bg-gray-700' : 'bg-gray-800'" @click="changeFilter(filter)">
                {{ filter.charAt(0).toUpperCase() + filter.slice(1) }}
            </button>
        </div>
        <div class="w-full max-w-lg overflow-y-auto scrollbar-hidden px-4">
            <TodoList />
        </div>
    </div>
</template>

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