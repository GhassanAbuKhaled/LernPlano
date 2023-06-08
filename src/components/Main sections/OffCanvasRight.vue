<template>
  <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions"
    aria-labelledby="offcanvasWithBothOptionsLabel">
    <div class="offcanvas-header">
      <div class="d-inline-flex">
        <img class="navbar-brand me-2" src="@/assets/BUW_Logo.png" width="30" alt="logo" />
        <strong>
          <p class="modal-title mt-1">Ausgewählte Interaktionen</p>
        </strong>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <AccordionInteraktion></AccordionInteraktion>
    </div>
  </div>
</template>
<script>
import AccordionInteraktion from "./AccordionInteraktion.vue";
export default {
  components: { AccordionInteraktion },
};
</script>
