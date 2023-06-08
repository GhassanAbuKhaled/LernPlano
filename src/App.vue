<template>
  <div>
  
    <Navbar></Navbar>
    <router-view />
    <MyFooter />
    <MyToast></MyToast>
    <MyAlert></MyAlert>
  </div>
</template>

<script>
import MyFooter from './components/Navbar and footer/Footer/MyFooter.vue';
import Navbar from './components/Navbar and footer/Nav/Navbar.vue';
import MyToast from './components/Alert/MyToast.vue';
import MyAlert from './components/Alert/MyAlert.vue';

export default {
  components: { MyFooter, Navbar ,MyToast , MyAlert },
  watch: {
    '$route'(to, from) {
      /*because when I move to another page using the back arrow in the browser, 
      there remains the transparent layer of the modal, 
      which prevents me from clicking on anything on the page*/
      $('body > div.modal-backdrop.fade.show').remove()
      $('#app > div > div.offcanvas-backdrop.fade.show').remove()
      $('#AlertToast > div.toast-body > div.modal-footer > button.btn.btn-secondary.btn-sm').click()
      $('#lernPfadInfo > div > div > div.modal-footer > button').click();
      $('#toastMessage > div.toast-header.text-light > button').click()
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    },
  },
};
</script>


