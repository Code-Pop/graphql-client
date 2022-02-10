<template>
  <form @submit.prevent="addBook"> 
    <label for="title">
      Title
      <input type="text" id="title" required v-model.trim="newBook.title" />
    </label>
    <label for="author">
      Author
      <input type="text" id="author" required v-model.trim="newBook.author" />
    </label>
    <label for="description">
      Description (optional)
      <input type="text" id="description" v-model.trim="newBook.description" />
    </label>
    <label for="year">
      Year
      <input type="number" id="year" required v-model.number="newBook.year" />
    </label>
    <label for="rating">
      Rating (optional)
      <input type="number" id="rating" v-model.number="newBook.rating" />
    </label>
    <button type="submit">Submit</button>
    <button type="reset" @click="$emit('closeForm')">Close form</button>
  </form>
</template>

<script>
import { reactive } from 'vue'
import ADD_BOOK_MUTATION from '../graphql/addBook.mutation.gql'
import ALL_BOOKS_QUERY from '../graphql/allBooks.query.gql'
import { useMutation } from '@vue/apollo-composable'

export default {
  emits: ['closeForm'],
  props: {
    search: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const newBook = reactive({
      title: '',
      author: '',
      year: '',
      rating: '',
      description: '',
    })

    const { mutate: addBook, onDone } = useMutation(
      ADD_BOOK_MUTATION,
      () => ({
        variables: {
          input: {...newBook, rating: newBook.rating || null}
        },
        update(cache, response) {
          const sourceData = cache.readQuery({
            query: ALL_BOOKS_QUERY,
            variables: { search: props.search }
          })
          const data = {
            allBooks: [...sourceData.allBooks, response.data.addBook]
          }
          cache.writeQuery({
            data,
            query: ALL_BOOKS_QUERY,
            variables: { search: props.search }
          })
        },
        optimisticResponse: {
          addBook: {
            __typename: 'Book',
            id: -1,
            ...newBook
          }
        }
      })
    )

    onDone(() => emit('closeForm'))

    return {
      addBook,
      newBook,
    }
  },
}
</script>

<style scoped>
label {
  display: block;
}
</style>