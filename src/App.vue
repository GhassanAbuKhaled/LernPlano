<template>
  <div id="app" class="app-container">
    <Navbar></Navbar>
    <main class="main-content" role="main">
      <router-view></router-view>
    </main>
    <MyFooter></MyFooter>
    <MyToast></MyToast>
    <MyAlert></MyAlert>
    <PdfProgressModal></PdfProgressModal>
  </div>
</template>

<script>
import MyFooter from './components/Navbar and footer/Footer/MyFooter.vue';
import Navbar from './components/Navbar and footer/Nav/Navbar.vue';
import MyToast from './components/Alert/MyToast.vue';
import MyAlert from './components/Alert/MyAlert.vue';
import PdfProgressModal from './components/UI/PdfProgressModal.vue';

export default {
  components: { MyFooter, Navbar, MyToast, MyAlert, PdfProgressModal },
  watch: {
    '$route'(to, from) {
      // Clean up any remaining modal layers and toasts
      $('body > div.modal-backdrop.fade.show').remove()
      $('#app > div > div.offcanvas-backdrop.fade.show').remove()
      $('#myOverlay').addClass('d-none')
      $('#AlertToast').removeClass('show')
      $('#toastMessage').removeClass('show')
      $('#lernPfadInfo > div > div > div.modal-footer > button').click();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
