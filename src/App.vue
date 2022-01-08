<template>
  <div>
    <input type="text" v-model="searchTerm" />
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Something went wrong! Please try again</p>
    <template v-else>
      <p v-for="book in books" :key="book.id">
        {{ book.title }}
      </p>
    </template>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import ALL_BOOKS_QUERY from './graphql/allBooks.query.gql'

export default {
  name: 'App',
  setup() {
    const searchTerm = ref('')
    const { result, loading, error } = useQuery(
      ALL_BOOKS_QUERY,
      () => ({
        search: searchTerm.value,
      }),
      () => ({
        debounce: 500,
        enabled: searchTerm.value.length > 2
      })
    )

    const books = useResult(result, [], data => data.allBooks)

    return { books, searchTerm, loading, error }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.list-wrapper {
  display: flex;
  margin: 0 auto;
  max-width: 960px;
}

.list {
  width: 50%;
}
</style>