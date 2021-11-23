<template>
  <div>
  </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const allBooksQuery = gql`
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
    const { result } = useQuery(allBooksQuery)

    console.log(result)

    return { result }
  },
}
</script>