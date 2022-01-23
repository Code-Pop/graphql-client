<template>
  <input
    type="text"
    v-model="rating"
    @keyup.enter="updateRating"
    @keyup.esc="$emit('closeForm')"
  />
</template>

<script>
import { ref } from 'vue'
import UPDATE_BOOK_MUTATION from '../graphql/updateBook.mutation.gql'
import { useMutation } from '@vue/apollo-composable'

export default {
  emits: ['closeForm'],
  props: {
    initialRating: {
      type: Number,
      required: true,
    },
    bookId: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
		// we create a local copy of the prop to edit the rating
    const rating = ref(props.initialRating)
    
    const { mutate } = useMutation(UPDATE_BOOK_MUTATION, () => ({
      variables: {
        id: props.bookId,
        rating: parseFloat(rating.value)
      }
    }))

    const updateRating = () => {
      mutate()
      emit('closeForm')
    }

    return { rating, updateRating }
  },
}
</script>