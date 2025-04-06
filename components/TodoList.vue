<template>
    <!-- Todo Empty -->
    <div v-if="todos.length === 0" class="flex justify-center items-center">
        <div class="p-5 border-0.5 border-slate-500 rounded-lg bg-gray-900 shadow-md flex flex-col gap-2 mb-5 w-full">
            <span class="text-sm text-white lowercase text-wrap break-words text-center">
                {{ isTodoEmptyMessage }}
            </span>
        </div>
    </div>

    <!-- Todo List -->
    <div v-for="todo in todos" :key="todo.id" class="flex justify-center items-center w-full">
        <div :class="['p-5 border-0.5 rounded-lg shadow-md flex flex-col gap-2 mb-5 w-full', todo.completed ? 'bg-gray-700 opacity-50' : 'bg-gray-800 hover:px-6 hover:bg-gray-900 transition-all duration-200']">
            <div class="flex items-center justify-between w-full">
                <!-- Todo List Title -->
                <span v-if="!todo.editing" class="text-md text-white font-bold lowercase flex-grow" @click="editTodo(todo)">
                    {{ todo.title }}
                </span>
                <input 
                    v-if="todo.editing" 
                    v-model="todo.title" 
                    class="text-md text-white font-bold lowercase flex-grow bg-transparent border-b border-white/20 focus:outline-none"
                    @blur="saveTodo(todo)" 
                    @keydown.enter="saveTodo(todo)"
                >
                <div class="flex items-center space-x-2">
                    <button class="text-sm text-gray-400 hover:text-gray-200 cursor-pointer" @click="deleteTodo(todo)">
                        <Icon name="uil:trash" />
                    </button>
                    <button class="text-sm text-gray-400 hover:text-gray-200 cursor-pointer" @click="toggleCompletion(todo)">
                        <Icon :name="todo.completed ? 'uil:circle-check' : 'uil:circle'" class="fill-white"/>
                    </button>
                </div>
            </div>
            <!-- Todo List Body -->
            <span v-if="!todo.editing" class="text-sm text-white lowercase text-wrap break-words" @click="editTodo(todo)">
                {{ todo.body }}
            </span>
            <textarea 
                v-if="todo.editing" 
                v-model="todo.body" 
                maxlength="100"
                class="resize-none bg-transparent placeholder-white/60 focus:outline-none text-white text-sm"
                @blur="saveTodo(todo)" 
                @keydown.enter="saveTodo(todo)"
            />
            <div v-if="todo.editing" class="flex items-center justify-between">
                <span class="text-xs text-white/60"> press enter </span>
                <span class="text-xs text-white/60"> {{ todo.body.length }} / 100 </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
    todos: {
        type: Array,
        required: true,
    },
});

const isTodoEmptyMessage = "no todos available";
const emit = defineEmits(['delete-todo', 'update-todo']);

const editTodo = (todo) => {
    todo.editing = true;
};

const saveTodo = (todo) => {
    if (!todo.title.trim() || !todo.body.trim()) {
        return;
    }
    todo.editing = false;
    emit('update-todo', { ...todo });
};

const toggleCompletion = (todo) => {
    todo.completed = !todo.completed;
    emit('update-todo', { ...todo }); 
};

const deleteTodo = (todo) => {
    emit('delete-todo', todo.id);
};
</script>
