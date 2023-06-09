<template>
  <div class="footer">
    <footer class="py-3">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <MyLinkes :margin="'1'"></MyLinkes>
        <li class="nav-item me-"> <router-link :to="{ name: 'impressum' }" class="nav-link ">Impressum</router-link></li>
        <li class="nav-item me-"> <router-link :to="{ name: 'datenschutzerklärung' }" class="nav-link ">Datenschutzerklärung</router-link></li>
        <li class="nav-item me-"> <router-link :to="{ name: 'datenschutzerklärung' }" class="nav-link ">Lizenz</router-link></li>

      </ul>
      <p class="text-center">© 2023 Lehrplano</p>
    </footer>
  </div>
</template>
<script>
import MyLinkes from '../Nav/MyLinkes.vue';
export default {
  name: 'MyFooter',
  components: { MyLinkes },
}
</script>
<style scoped>
.footer {
  margin-top: auto;
  width: 100%;
  background: rgb(131, 187, 44)
}
p {
  color: aliceblue !important;
}
a{
  color: aliceblue !important;
  transition: 200ms ease-in-out;
}
.nav-link:hover{
  transform: scale(1.1);
}
</style>


