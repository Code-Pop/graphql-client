<template>
  <div>
    <p v-for="book in result.allBooks" :key="book.id">
      {{ book.title }}
    </p>
  </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const ALL_BOOKS_QUERY = gql`
  query AllBooks {
    allBooks {
      id
      title
      rating
    }
  }
`

export default {
  name: 'App',
  setup() {
    const { result } = useQuery(ALL_BOOKS_QUERY)
    
    console.log(result)

    return { result }
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