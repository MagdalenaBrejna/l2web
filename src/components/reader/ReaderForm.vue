<template>
  <div id="reader-form" class="container mt-5">
    <br>
    <h4>Dodaj nowego czytelnika</h4>
    <form @submit.prevent="handleSubmit">
      
      <label>Imię</label>
      <input
          v-model="reader.firstName"
          type="text"
          :class="{ 'has-error': submitting && invalidFirstName }"
          @focus="clearStatus"
          @keypress="clearStatus"
      />
      
      <label>Nazwisko</label>
      <input
          v-model="reader.lastName"
          type="text"
          :class="{ 'has-error': submitting && invalidLastName }"
          @focus="clearStatus"
      />

      <label>Telefon</label>
      <input
          v-model="reader.phoneNumber"
          type="text"
          :class="{ 'has-error': submitting && invalidPhoneNumber }"
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
  name: 'ReaderForm',
  props: {
    readersSource: Array,
  },
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      reader: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
      },
    }
  },
  methods: {

    async postData() {
      try {
        const response = await axios.post('http://localhost:8080/readers', {
          firstName: this.reader.firstName,
          lastName: this.reader.lastName,
          phoneNumber: this.reader.phoneNumber,
        })
        console.log(response.data)
        const savedReaders = await fetch('http://localhost:8080/readers')
        const readers = await savedReaders.json()
        this.readersSource.push(readers[readers.length - 1])
      } catch (error) {
        console.error(error)
      }
    },

    handleSubmit() {
      this.submitting = true
      this.clearStatus()

      if (this.invalidFirstName || this.invalidLastName || this.invalidPhoneNumber) {
        this.error = true
        return
      }
      this.postData()
      this.reader = {
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
      return this.reader.firstName === ''
    },
    invalidLastName() {
      return this.reader.lastName === ''
    },
    invalidPhoneNumber() {
      return this.reader.phoneNumber === ''
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