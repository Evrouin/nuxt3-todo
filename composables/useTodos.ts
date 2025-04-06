import { ref, watch, computed } from 'vue'
import type { Todo } from '@/types'

const STORAGE_KEY = 'todos'

export const useTodos = () => {
  const todos = ref<Todo[]>([])

  const filterType = ref<'all' | 'active' | 'completed' | 'deleted'>('all')
  const filterOptions = ['all', 'active', 'completed', 'deleted'] as const

  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      todos.value = JSON.parse(stored)
    }
  }

  if (typeof window !== 'undefined') {
    watch(todos, (newVal) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
    }, { deep: true })
  }

  const filteredTodos = computed(() => {
    return todos.value.filter(todo => {
      switch (filterType.value) {
        case 'completed':
          return todo.completed && !todo.deleted
        case 'deleted':
          return todo.deleted
        case 'active':
          return !todo.completed && !todo.deleted
        default:
          return !todo.deleted
      }
    })
  })

  const changeFilter = (type: typeof filterOptions[number]) => {
    filterType.value = type
  }

  const addTodo = (todo: Todo) => {
    todos.value.push(todo)
  }

  const deleteTodo = (id: number, isPermanentDelete: boolean) => {
    todos.value = todos.value
      .map(todo =>
        todo.id === id
          ? { ...todo, deleted: !isPermanentDelete && true }
          : todo
      )
      .filter(todo => (isPermanentDelete ? todo.id !== id : true))
  }

  return {
    todos,
    filteredTodos,
    filterType,
    filterOptions,
    changeFilter,
    addTodo,
    deleteTodo
  }
}
