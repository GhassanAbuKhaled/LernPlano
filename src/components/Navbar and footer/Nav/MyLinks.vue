<template>
    <li :class="'nav-item me-' + margin"><router-link to="/" class="nav-link active" aria-current="page">Start</router-link></li>
    <li :class="'nav-item me-' + margin"> <router-link :to="{ name: 'main' }" class="nav-link active">Planen</router-link></li>
    <li :class="'nav-item me-' + margin"><router-link :to="{ name: 'about' }" class="nav-link active">Über uns</router-link></li>
    <li :class="'nav-item me-' + margin"> <router-link :to="{ name: 'contact' }" class="nav-link active">Kontakt</router-link></li>
</template>
<script>
export default {
    name: 'MyLinks',
    props: ['margin'],
}
</script>
<style scoped>
a{
  color: aliceblue !important;
  transition: 200ms ease-in-out;
}
.nav-link:hover{
  transform: scale(1.1);
}
</style>