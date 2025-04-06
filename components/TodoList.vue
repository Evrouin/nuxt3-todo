<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import type { Todo } from '@/types';

const props = defineProps<{
    todos: Todo[];
}>();

const isTodoEmptyMessage = ref("No todos available");

const emit = defineEmits<{
    (e: 'delete-todo', id: number, deleted: boolean): void;
    (e: 'update-todo', todo: Todo): void;
}>();

const editTodo = (todo: Todo) => {
    todo.editing = true;
};

const saveTodo = (todo: Todo) => {
    if (!todo.title.trim() || !todo.body.trim()) {
        return;
    }
    todo.editing = false;
    emit('update-todo', { ...todo });
};

const toggleCompletion = (todo: Todo) => {
    todo.completed = !todo.completed;
    emit('update-todo', { ...todo });
};

const deleteTodo = (todo: Todo) => {
    emit('delete-todo', todo.id, todo.deleted);
};

const handleTitleInput = (event: Event, todo: Todo) => {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toLowerCase();
    todo.title = input.value;
};

const handleBodyInput = (event: Event, todo: Todo) => {
    const input = event.target as HTMLTextAreaElement;
    input.value = input.value.toLowerCase();
    todo.body = input.value;
};
</script>

<template>
    <div v-if="props.todos.length === 0" class="flex justify-center items-center">
        <div class="p-5 border-0.5 border-slate-500 rounded-lg bg-gray-900 shadow-md flex flex-col gap-2 mb-5 w-full">
            <span class="text-sm text-white lowercase text-wrap break-words text-center">
                {{ isTodoEmptyMessage }}
            </span>
        </div>
    </div>

    <div v-for="todo in props.todos" :key="todo.id" class="flex justify-center items-center w-full">
        <div :class="[ 'p-5 border-0.5 rounded-lg shadow-md flex flex-col gap-2 mb-5 w-full', todo.completed ? 'bg-gray-700 opacity-50' : 'bg-gray-800 hover:px-6 hover:bg-gray-900 transition-all duration-200']">
            <div class="flex items-center justify-between w-full">
                <span v-if="!todo.editing" class="text-md text-white font-bold lowercase flex-grow" @click="editTodo(todo)">
                    {{ todo.title }}
                </span>
                <input 
                    v-if="todo.editing" 
                    v-model="todo.title" 
                    class="text-md text-white font-bold lowercase flex-grow bg-transparent border-b border-white/20 focus:outline-none" 
                    @blur="saveTodo(todo)" 
                    @keydown.enter="saveTodo(todo)"
                    @input="handleTitleInput($event, todo)"
                >
                <div class="flex items-center space-x-2">
                    <button class="text-sm text-gray-400 hover:text-gray-200 cursor-pointer" @click="deleteTodo(todo)">
                        <Icon name="uil:trash" />
                    </button>
                    <button class="text-sm text-gray-400 hover:text-gray-200 cursor-pointer" @click="toggleCompletion(todo)">
                        <Icon :name="todo.completed ? 'uil:check-circle' : 'uil:circle'" />
                    </button>
                </div>
            </div>
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
                @input="handleBodyInput($event, todo)"
            />
            <div v-if="todo.editing" class="flex items-center justify-between">
                <span class="text-xs text-white/60"> press enter </span>
                <span class="text-xs text-white/60"> {{ todo.body.length }} / 100 </span>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
