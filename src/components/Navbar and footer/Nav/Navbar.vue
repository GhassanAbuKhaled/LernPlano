<template>
  <header>
    <nav class="navbar navbar-dark navbar-expand-lg">
      <div class="containerOfLinks container-fluid mt-1 mb-1">
        <div class="navbar-brand">
          <img src="@/assets/BUW_Logo.png" width="50" alt="logo">
          <router-link to="/">Lernplano</router-link>
        </div>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent"
          aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse" id="navContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <MyLinks :margin="'5'"></MyLinks>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import MyLinks from '../Nav/MyLinks.vue';

export default {
  name: 'Navbar',
  components: { MyLinks }
};
</script>
  
<style scoped>
.navbar {
  background: rgb(131, 187, 44);
  z-index: 1;
}

.navbar-brand {
  position: relative;
  margin: 0;
}
.containerOfLinks{
  margin: 0;
  width: 100%;
  margin: 1%;
}
.navbar-brand a {
  font-size: medium;
  position: absolute;
  top: 30px;
  left: 53px;
  text-decoration: none;
  color: white
}

i {
  color: white;
}

@media (max-width: 570px) {
  .navbar-brand a {
    display: none;
  }

  .navbar-brand img {
    width: 40px;
  }
}
</style>
  