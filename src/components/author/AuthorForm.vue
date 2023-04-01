<template>
  <div id="person-form" class="container mt-5">
    <br>
    <h4>Dodaj nowego autora książki</h4>
    <form @submit.prevent="handleSubmit">
      
      <label>Imię</label>
      <input
          v-model="author.firstName"
          type="text"
          :class="{ 'has-error': submitting && invalidFirstName }"
          @focus="clearStatus"
          @keypress="clearStatus"
      />
      
      <label>Nazwisko</label>
      <input
          v-model="author.lastName"
          type="text"
          :class="{ 'has-error': submitting && invalidLastName }"
          @focus="clearStatus"
      />
      <p v-if="error && submitting" class="error-message">
        Proszę wypełnić wskazane pola formularza
      </p>
      <p v-if="success" class="success-message">
        Dane poprawnie zapisano
      </p>
      <br>
      <button class="btn btn-primary" style="background-color:#2aadcd; border-color:#16b9e1; height: 30px; width: 100px; font-size: 13px; margin-left: 90px">Zapisz</button>
    </form>
  </div>
</template>
<script>

import axios from "axios";

export default {
  name: 'AuthorForm',
  props: {
    authorsSource: Array,
  },
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      author: {
        firstName: '',
        lastName: '',
      },
    }
  },
  methods: {

    async postData() {
      try {
        const response = await axios.post('http://localhost:8080/authors', {
          firstName: this.author.firstName,
          lastName: this.author.lastName,
        })
        console.log(response.data)
        const savedAuthors = await fetch('http://localhost:8080/authors')
        const authors = await savedAuthors.json()
        this.authorsSource.push(authors[authors.length - 1])
      } catch (error) {
        console.error(error)
      }
    },

    handleSubmit() {
      this.submitting = true
      this.clearStatus()

      if (this.invalidFirstName || this.invalidLastName) {
        this.error = true
        return
      }
      this.postData()
      this.author = {
        firstName: '',
        lastName: '',
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
      return this.author.firstName === ''
    },
    invalidLastName() {
      return this.author.lastName === ''
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
</style>