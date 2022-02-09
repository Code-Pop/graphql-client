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