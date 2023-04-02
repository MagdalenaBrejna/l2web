<template>
  <CustomNavbar></CustomNavbar>
  <br>
  <h4>Lista czytelników</h4>
  <div id="readers-table" class="container">
    <table>
      <thead>
      <tr>
        <th>Imię</th>
        <th>Nazwisko</th>
        <th>Telefon</th>
        <th>Usuń</th>
        <th>Aktualizuj</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(reader, index) in paginatedReaders()" :key="reader.id">
        <td>{{ reader.firstName }}</td>
        <td>{{ reader.lastName }}</td>
        <td>{{ reader.phoneNumber }}</td>
        <td>
          <button class="btn btn-danger" @click="deleteReader(reader.id)" style="background-color:#d37676; border-color:#d37676; height: 30px; width: 60px; font-size: 13px">Usuń</button>
        </td>
        <td>
          <button class="btn btn-primary" @click="this.$router.push({ name: 'readerUpdate', params: { id: reader.id } });" style="background-color:#a0a0a0; border-color:#a0a0a0; height: 30px; width: 80px; font-size: 13px">Aktualizuj</button>
        </td>
      </tr>
      </tbody>
    </table>
    <br>

    <div class="pagination">
      <button class="btn btn-primary" :disabled="currentPage === 1" @click="currentPage--" style="background-color:#2aadcd; border-color:#16b9e1; height: 30px; width: 100px; font-size: 13px">Poprzednia</button>
      <span class="ms-3 me-3">Strona {{ currentPage }} z {{ totalPages }}</span>
      <button class="btn btn-primary" :disabled="currentPage === totalPages" @click="currentPage++" style="background-color:#2aadcd; border-color:#16b9e1; height: 30px; width: 100px; font-size: 13px">Następna</button>
    </div>
    <ReaderForm :readersSource="readers" class="mt-5"/>
  </div>
</template>

<script>
import axios from "axios";
import ReaderForm from "@/components/reader/ReaderForm.vue";
import CustomNavbar from "@/components/utils/CustomNavbar.vue";

export default {
  name: 'Czytelnicy',
  components: {CustomNavbar, ReaderForm},

  data() {
    return {
      readers: [],
      currentPage: 1,
      itemsPerPage: 3,
    }
  },

  mounted() {
    this.getReaders()
  },
  methods: {
    paginatedReaders() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.readers.slice(startIndex, endIndex);
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
    async deleteReader(itemId) {
      axios.delete(`http://localhost:8080/readers/${itemId}`)
          .then(response => {
            // Obsługa odpowiedzi serwera
            console.log(response.data);
          })
          .catch(error => {
            // Obsługa błędów
            this.$router.push({ name: 'ErrorPageR', params: { id: error } });
            console.error(error);
          });
      this.readers = this.readers.filter(obj => {
        return obj.id !== itemId
      });
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.readers.length / this.itemsPerPage);
    }
  },

}
</script>

<style scoped>
  body {
      background-color: lightgrey;
      color: black;
    }
  
  h4 {
    color: black;
    size: 20px;
    margin-left:140px;
    
  }
</style>