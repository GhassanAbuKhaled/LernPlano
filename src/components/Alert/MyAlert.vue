<template>
  <div class="toast-container position-fixed top-50 start-50 translate-middle ">
    <div id="AlertToast" role="alert" aria-live="assertive" aria-atomic="true" class="toast" data-bs-autohide="false">
      <div class="toast-header text-light">
        <i class="bi bi-mortarboard-fill me-2 fs-5"></i>
        <strong class="me-auto">Lernplano</strong>
        <small><i class="modal-title bi bi-exclamation-circle-fill text-warning fs-5 me-auto"></i></small>
      </div>
      <div class="toast-body">
      <h6><strong class="p-2">Sind Sie sich Sicher!</strong></h6>
    </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger btn-sm m-1" data-bs-dismiss="toast">Löschen</button>
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="toast">Schließen</button>
        </div>

    </div>
  </div>
  <div class="modal-backdrop show d-none" id="myOverlay"></div>
</template>
  
<script>
export default {
  name: 'MyAlert',
};
</script>
  
<style scoped>
#myOverlay {
  z-index: 1090;
}
#AlertToast{
  padding: 3px;
}
.toast-container {
  z-index: 1100;
}

i {
  color: white;
}
</style>
  