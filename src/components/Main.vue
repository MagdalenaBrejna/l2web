<template>
  <CustomNavbar></CustomNavbar>
  <div class="d-flex justify-content-center p-5 container">
    <div class="text-left">
      <h1>Zanurz się w świecie książek już dziś!</h1>
     

      <main class="mt-5">
        <div class="container">
          <section id="carouselworkers"></section>
          <!--Grid column-->
          <div class="row">
            <div class="col-12">
              <div  class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <div class="row">
                      <div class="col-md-4 mb-3">
                        <div class="card">
                          <img class="img-fluid" src="a.jpg">
                          <div class="card-body">
                            <h4 class="card-title">Dodaj książkę!</h4>
                            <p class="card-text">Tworzenie nowych pozycji
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4 mb-3">
                        <div class="card">
                          <img class="img-fluid" src="b.jpg">
                          <div class="card-body">
                            <h4 class="card-title">Dodaj autora!</h4>
                            <p class="card-text">Dodawanie nowych autorów
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4 mb-3">
                        <div class="card">
                          <img class="img-fluid" src="c.jpg">
                          <div class="card-body">
                            <h4 class="card-title">Zarządzaj!</h4>
                            <p class="card-text">Wypożycz & Zwróć
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>

  <section id="qoute" style="width: 995px;margin-left: 195px">
    <!--Grid column-->
    <div class="row justify-content-md-center" data-aos="fade-left">
      <div class="card" style="border-radius: 7px;">
        <div class="card-body p-2">
          <div class="text-center mb-4 pb-2">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-quotes/bulb.webp" alt="Bulb"
                 width="100">
          </div>
          <figure class="text-center mb-0">
            <blockquote class="blockquote">
              <p class="pb-2">
                <i class="fas fa-quote-left fa-xs text-primary"></i>
                <span class="lead font-italic">Czytanie dobrych książek jest niczym rozmowa z najwspanialszymi ludźmi minionych czasów</span>
                <i class="fas fa-quote-right fa-xs text-primary"></i>
              </p>
            </blockquote>
            <figcaption class="blockquote-footer mb-0">
              Kartezjusz
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
  <br><br>


</template>

<script>
  import BookTable from "@/components/book/BookTable.vue";
  import AuthorTable from "@/components/author/AuthorTable.vue";
  import CustomNavbar from "@/components/utils/CustomNavbar.vue";

  export default {
    name: "Main",
    components: {CustomNavbar, AuthorTable, BookTable}
}
</script>

<style scoped>
  body {
    background-color: lightgrey;
    color: black;
  }
  
  h1 {
    color: black;
    size: 20px;
    margin-left:10px;
    
  }
</style>