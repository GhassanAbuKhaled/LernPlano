<template>
  <div class="modal fade" id="AllInteraktionenBackdrop" data-bs-keyboard="false" tabindex="-1" aria-labelledby="InteraktionenBackdropLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <div class="d-inline-flex">
            <img  class="navbar-brand me-2" src="@/assets/BUW_Logo.png" width="30" alt="logo">
            <strong>
              <p class="modal-title mt-1"> Alle Interaktionen</p>
            </strong>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <InteraktionTab></InteraktionTab>
        </div>
        <div class="modal-footer Alle Interaktionen mb-5 mt-1 ">
          <button  type="button" class="btn btn-secondary btn-sm"
            data-bs-dismiss="modal">Schließen</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InteraktionTab from './InteraktionTab.vue';
export default {
  components:{InteraktionTab}
};
</script>

