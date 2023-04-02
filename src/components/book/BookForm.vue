<template>
  <div id="book-form" class="container mt-5">
    <br>
    <h4>Dodaj nową książkę</h4>
    <form @submit.prevent="handleSubmit">
      <label>Tytuł</label>
      <input
          v-model="book.title"
          type="text"
          :class="{ 'has-error': submitting && invalidFirstName }"
          @focus="clearStatus"
          @keypress="clearStatus"
      />
      <label>Liczba stron</label>
      <input
          v-model="book.pages"
          type="text"
          :class="{ 'has-error': submitting && invalidPages }"
          @focus="clearStatus"
      />
      <label>Autor</label>
      <select v-model="book.author">
        <option
            v-for="a in authors" :key="a.id" 
            @focus="clearStatus"
        >
          {{a.lastName}}
        </option>
      </select>
      <p v-if="error && submitting" class="error-message">
        Proszę wypełnić wskazane pola formularza
      </p>
      <p v-if="success" class="success-message">
        Dane poprawnie zapisano
      </p>
      <button class="btn btn-primary mt-4" style="background-color:#2aadcd; border-color:#16b9e1; height: 30px; width: 100px; font-size: 13px; margin-left: 90px">Zapisz</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: 'BookForm',
  props: {
    booksSource: Array,
  },
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      book: {
        title: '',
        pages: '',
        author: {
          firstName: '',
          lastName: '',
        },
      },
      authors : [],
    }
  },
  mounted() {
    this.getAuthors()
  },
  methods: {

    async getAuthors() {
      try {
        const response = await fetch('http://localhost:8080/authors')
        const data = await response.json()
        this.authors = data
      } catch (error) {
        console.error(error)
      }
    },

    async postData() {
      try {
        const author = this.authors.filter(obj => {
          return obj.lastName === this.book.author
        });
        const response = await axios.post('http://localhost:8080/books', {
          title: this.book.title,
          pages: this.book.pages,
          author: author[0]
        })
        console.log(response.data)
        const savedBooks = await fetch('http://localhost:8080/books')
        const books = await savedBooks.json()
        this.booksSource.push(books[books.length - 1])
      } catch (error) {
        console.error(error)
      }
    },

    handleSubmit() {
      this.submitting = true
      this.clearStatus()

      if (this.invalidFirstName || this.invalidPages) {
        this.error = true
        return
      }
      this.postData()

      this.book = {
        title: '',
        pages: '',
        author: {
          firstName: '',
          lastName: '',
        },
      }
      this.error = false
      this.success = true
      this.submitting = false
    },
    clearStatus() {
      this.success = false
      this.error = false
    },
  },
  computed: {
    invalidFirstName() {
      return this.book.title === ''
    },
    invalidPages() {
      return this.book.pages === ''
    },
  },
}
</script>
<style scoped>
form {
  margin-bottom: 2rem;
}

[class*='-message'] {
  font-weight: 500;
}

.error-message {
  color: #d33c40;
}

.success-message {
  color: #32a95d;
}
body {
      background-color: lightgrey;
      color: black;
    }
  
  h4 {
    color: black;
    size: 20px;
    margin-left:0px;
    
  }
  input {
    width: 310px;
    height: 30px;
  }
  select {
    width: 310px;
    height: 50px;
  }
</style>