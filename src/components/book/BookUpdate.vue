<template>
  <CustomNavbar></CustomNavbar>
  <h4>Zmień dane książki</h4>
  <div id="person-form" class="container">
    <form @submit.prevent="handleSubmit">
      <label>Tytuł</label>
      <input
          v-model="book.title"
          type="text"
          :class="{ 'has-error': submitting && invalidTitle }"
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
      <select v-model="book.author.lastName">
        <option
            v-for="a in authors" :key="a.id" :value="a.lastName"
        >
          {{ a.lastName }}
        </option>
      </select>
      <p v-if="error && submitting" class="error-message">
        Proszę wypełnić wskazane pola formularza
      </p>
      <p v-if="success" class="success-message">
        Dane poprawnie zapisano
      </p>
      <button class="btn btn-primary mt-3" style="background-color:#2aadcd; border-color:#16b9e1; height: 30px; width: 100px; font-size: 13px; margin-left: 90px">Zmień</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import CustomNavbar from "@/components/utils/CustomNavbar.vue";

export default {
  name: 'BookUpdate',
  components: {CustomNavbar},
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      book: {
        id: 0,
        title: '',
        pages: '',
        author: {
          firstName: '',
          lastName: '',
        },
      },
      authors: [],
    }
  },
  mounted() {
    this.getAuthors()
    this.getBook()
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

    async getBook() {
      axios.get(`http://localhost:8080/books/${this.bookId()}`)
          .then(response => {
            // Obsługa odpowiedzi serwera
            console.log(response.data);
            this.book = response.data
          })
          .catch(error => {
            // Obsługa błędów
            console.error(error);
          })
    },

    async postData() {
      try {
        const author = this.authors.filter(obj => {
          return obj.lastName === this.book.author.lastName
        });
        const response = await axios.put(`http://localhost:8080/books/${this.bookId()}`, {
          id: this.book.id,
          title: this.book.title,
          pages: this.book.pages,
          author: author[0]
        })
        this.$router.push({ name: 'books'});
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    },

    bookId() {
      return this.$route.params.id;
    },

    handleSubmit() {
      this.submitting = true
      this.clearStatus()

      if (this.invalidTitle || this.invalidPages) {
        this.error = true
        return
      }
      this.postData()

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
    invalidTitle() {
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
h4 {
    color: black;
    size: 20px;
    margin-left:140px;
    
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