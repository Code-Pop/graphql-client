<template>
  <form>
    <label for="title">
      Title
      <input type="text" id="title" required />
    </label>
    <label for="author">
      Author
      <input type="text" id="author" required />
    </label>
    <label for="description">
      Description (optional)
      <input type="text" id="description" />
    </label>
    <label for="year">
      Year
      <input type="number" id="year" required />
    </label>
    <label for="rating">
      Rating (optional)
      <input type="number" id="rating" />
    </label>
    <button type="submit">Submit</button>
    <button type="reset" @click="$emit('closeForm')">Close form</button>
  </form>
</template>

<script>
import { reactive } from 'vue'
export default {
  emits: ['closeForm'],
  setup(_, { emit }) {
    const newBook = reactive({
      title: '',
      author: '',
      year: '',
      rating: '',
      description: '',
    })

    const addBook = () => {
      console.log(newBook)
      emit('closeForm')
    }

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