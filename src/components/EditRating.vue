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
    const updateRating = () => {
      console.log(rating.value)
      emit('closeForm')
    }

    return { rating, updateRating }
  },
}
</script>