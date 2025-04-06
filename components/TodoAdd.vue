<script setup>
import { ref, computed } from 'vue';

const title = ref('');
const body = ref('');

const emit = defineEmits(['add-todo']);

const isValidTodo = computed(() => title.value.trim().length > 0 && body.value.trim().length > 0);

const addTodo = () => {
    if (!isValidTodo.value) {
        return;
    }

    const todo = {
        id: Date.now(),
        title: title.value.toLowerCase(),
        body: body.value.toLowerCase(),
        completed: false,
    };

    emit('add-todo', todo);

    title.value = '';
    body.value = '';
};
</script>

<template>
    <form @submit.prevent="addTodo">
        <div class="mb-5 flex items-center justify-center">
            <div class="flex w-full flex-col gap-2 rounded-lg bg-gray-500 p-2 text-sm text-white shadow-md">
                <input 
                    v-model="title"
                    type="text" 
                    placeholder="title" 
                    maxlength="100"
                    class="border-b border-white/20 bg-transparent placeholder-white/60 focus:outline-none">
                <textarea 
                    v-model="body" 
                    placeholder="body" 
                    maxlength="100"
                    class="resize-none bg-transparent placeholder-white/60 focus:outline-none"
                    @keydown.enter="addTodo"
                />
                <div class="flex items-center justify-between">
                    <span v-if="body.length > 0" class="text-xs text-white/60"> press enter </span>
                    <span v-if="body.length > 0" class="text-xs text-white/60"> {{ body.length }} / 100 </span>
                </div>
            </div>
        </div>
    </form>
</template>

<style scoped></style>
