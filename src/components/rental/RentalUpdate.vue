<template>
  <CustomNavbar></CustomNavbar>
  <h4>Zmień dane wypożyczenia</h4>
  <div id="person-form" class="container">
    <form @submit.prevent="handleSubmit">

      <label>Czytelnik</label>
      <select v-model="rental.reader">
        <option
            v-for="b in readers" :key="b.id"
            @focus="clearStatus"
        >
          {{b.lastName}}
        </option>
      </select>
      
      <label>Książka</label>
      <select v-model="rental.book">
        <option
            v-for="a in books" :key="a.id"
            @focus="clearStatus"
        >
          {{a.title}}
        </option>
      </select>


      <label>Data Od</label>
      <input 
            v-model="rental.dateRented"   
            type="datetime-local"
            :class="{ 'has-error': submitting && invalidDateRented }"
            @focus="clearStatus"  
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"/>
      <label>Data Do</label>
      <input 
            v-model="rental.dateShouldBeReturned"   
            type="datetime-local"
            :class="{ 'has-error': submitting && invalidDateShouldBeReturned }"
            @focus="clearStatus"   
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"/>  
      <label>Data Zwrotu</label>
      <input 
        v-model="rental.dateReturned"   
        type="datetime-local"
        :class="{ 'has-error': submitting && invalidDateReturned }"
        @focus="clearStatus"  
        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"/>  
      
      
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
import CustomNavbar from "@/components/utils/CustomNavbar.vue";

export default {
  name: 'RentalUpdate',
  components: {CustomNavbar},
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      rental: {
        reader: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
        },
        book: {
            title: '',
            pages: '',
            author: {
                firstName: '',
                lastName: '',
            },
        },
        dateRented: '',
        dateShouldBeReturned: '',
        dateReturned: '',
      },
      readers : [],
      books : [],
      
    }
  },
  mounted() {
    this.getReaders(),
    this.getBooks(),
    this.getRental()
  },
  methods: {

    async getBooks() {
      try {
        const response = await fetch('http://localhost:8080/books')
        const data = await response.json()
        this.books = data
      } catch (error) {
        console.error(error)
      }
    },

    async getReaders() {
      try {
        const response = await fetch('http://localhost:8080/readers')
        const data = await response.json()
        this.readers = data
      } catch (error) {
        console.error(error)
      }
    },

    async getRental() {
      axios.get(`http://localhost:8080/rentals/${this.rentalId()}`)
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
        const book = this.books.filter(obj => {
          return obj.title === this.rental.book
        });

        const reader = this.readers.filter(obj => {
          return obj.lastName === this.rental.reader
        });
        const response = await axios.put(`http://localhost:8080/rentals/${this.rentalId()}`, {
          reader: reader[0],
          book: book[0],
          dateRented: this.rental.dateRented,
          dateShouldBeReturned: this.rental.dateShouldBeReturned,
          dateReturned: this.rental.dateReturned,
        })
        this.$router.push({ name: 'rentals'});
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    },

    rentalId() {
      return this.$route.params.id;
    },

    handleSubmit() {
      this.submitting = true
      this.clearStatus()

      if (this.invalidDateRented || this.invalidDateShouldBeReturned || this.invalidDateReturned) {
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
    invalidDateRented() {
      return this.rental.dateRented === ''
    },
    invalidDateShouldBeReturned() {
      return this.rental.dateShouldBeReturned === ''
    },
    invalidDateReturned() {
      return false
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