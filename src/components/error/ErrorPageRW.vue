<template>
  <CustomNavbar></CustomNavbar>
  <br>
  
  <h4>Wypożyczenie nie może być zrealizowne - książka jest wypożyczona</h4>
  <div>
    <img src="https://miro.medium.com/v2/resize:fit:828/format:webp/0*MQUZM2M51e4a_RwX.jpg">
  </div>
</template>
<script>
import axios from "axios";
import CustomNavbar from "@/components/utils/CustomNavbar.vue";

export default {
  name: 'ErrorPageRW',
  components: {CustomNavbar},
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
    margin-left:280px;
    
  }
  input {
    width: 310px;
    height: 30px;
  }
  select {
    width: 310px;
    height: 50px;
  }
  img {
      margin-left:200px;
      margin-top:50px;
  }
</style>