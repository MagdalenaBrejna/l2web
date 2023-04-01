<template>
  <CustomNavbar></CustomNavbar>
  <h4>Zmień dane czytelnika</h4>
  <div id="person-form" class="container">
    <form @submit.prevent="handleSubmit">
      <label>Imię</label>
      <input
          v-model="reader.firstName"
          type="text"
          :class="{ 'has-error': submitting && invalidFirstName }"
          @focus="clearStatus"
          @keypress="clearStatus"
          :placeholder="reader.firstName"
      />
      <label>Nazwisko</label>
      <input
          v-model="reader.lastName"
          type="text"
          :class="{ 'has-error': submitting && invalidLastName }"
          @focus="clearStatus"
          :placeholder="reader.lastName"
      />
      <label>Telefon</label>
      <input
          v-model="reader.phoneNumber"
          type="text"
          :class="{ 'has-error': submitting && invalidPhoneNumber }"
          @focus="clearStatus"
          :placeholder="reader.phoneNumber"
      />
      <p v-if="error && submitting" class="error-message">
        Proszę wypełnić wskazane pola formularza
      </p>
      <p v-if="success" class="success-message">
        Dane poprawnie zapisano
      </p>
      <br>
      <button class="btn btn-primary" style="background-color:#2aadcd; border-color:#16b9e1; height: 30px; width: 100px; font-size: 13px; margin-left: 90px">Zmień</button>
    </form>
  </div>
</template>
<script>

import axios from "axios";

export default {
  name: 'ReaderUpdate',
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      reader: {
        id: 0,
        firstName: '',
        lastName: '',
        phoneNumber: '',
      },
    }
  },
  mounted() {
    this.getReader()
  },
  methods: {

    async postData() {
      try {
        const response = await axios.put(`http://localhost:8080/readers/${this.readerId()}`, {
              id: this.reader.id,
              firstName: this.reader.firstName,
              lastName: this.reader.lastName,
              phoneNumber: this.reader.phoneNumber,
            }
        )
        console.log(response.data)
        this.$router.push({ name: 'readers'});
      } catch (error) {
        console.error(error)
      }
    },

    async getReader() {
      axios.get(`http://localhost:8080/readers/${this.readerId()}`)
          .then(response => {
            // Obsługa odpowiedzi serwera
            console.log(response.data);
            this.reader.id = response.data.id,
            this.reader.firstName = response.data.firstName;
            this.reader.lastName = response.data.lastName;
            this.reader.phoneNumber = response.data.phoneNumber;
          })
          .catch(error => {
            // Obsługa błędów
            console.error(error);
          })
    },

    readerId() {
      return this.$route.params.id;
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
        phoneNumber: '',
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
input {
    width: 310px;
    height: 30px;
  }

  h4 {
    color: black;
    size: 20px;
    margin-left:140px;
    
  }
</style>