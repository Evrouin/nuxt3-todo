<script setup>

defineProps({
    title: {
        type: String,
        default: 'todos',
    },
});
</script>

<template>
    <div class="flex justify-between items-center p-4 text-white min-w-md mx-auto">
        <h1 class="text-2xl font-bold lowercase">{{ title }}</h1>
    </div>
</template>