<template>
  <CustomNavbar></CustomNavbar>
  <br>
  <h4>Lista książek</h4>
  <div id="books-table" class="container">
    <table>
      <thead>
      <tr>
        <th>Tytuł</th>
        <th>Liczba stron</th>
        <th>Autor</th>
        <th>Usuń</th>
        <th>Aktualizuj</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(book, index) in paginatedBooks()" :key="book.id">
        <td>{{ book.title }}</td>
        <td>{{ book.pages }}</td>
        <td>{{ book.author[0].lastName }}</td>
      
        <td>
          <button @click="deleteBook(book.id)" class="btn btn-danger" style="background-color:#d37676; border-color:#d37676; height: 30px; width: 60px; font-size: 13px">Usuń</button>
        </td>
        <td>
          <button class="btn btn-primary" @click="this.$router.push({ name: 'bookUpdate', params: { id: book.id } });" style="background-color:#a0a0a0; border-color:#a0a0a0; height: 30px; width: 80px; font-size: 13px">Aktualizuj</button>
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
    <BookForm :booksSource="books" class="mt-5"/>
  </div>


</template>

<script>
import axios from "axios";
import BookForm from "@/components/book/BookForm.vue";
import CustomNavbar from "@/components/utils/CustomNavbar.vue";

export default {
  name: 'BookTable',
  components: {CustomNavbar, BookForm},

  data() {
    return {
      books: [],
      currentPage: 1,
      itemsPerPage: 2,
    }
  },

  mounted() {
    this.getBooks()
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
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.books.slice(startIndex, endIndex);
    },
    async deleteBook(itemId) {
      axios.delete(`http://localhost:8080/books/${itemId}`)
          .then(response => {
            // Obsługa odpowiedzi serwera
            console.log(response.data);
          })
          .catch(error => {
            // Obsługa błędów
            console.error(error);
          });
      this.books = this.books.filter(obj => {
        return obj.id !== itemId
      });
    }

  },
  computed: {
    totalPages() {
      return Math.ceil(this.books.length / this.itemsPerPage);
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