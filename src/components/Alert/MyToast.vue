<template>
    <div class="toast-container position-fixed p-3" id="toastContainer">
        <div id="toastMessage" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true">
            <div class="toast-header text-light">
                <i class="bi bi-mortarboard-fill me-2 fs-5"></i>
                <strong class="me-auto">Lernplano</strong>
                <button type="button" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body"></div>
        </div>
    </div>
</template>
  
<script>
export default {
   
}
</script>
  
<style scoped>
i {
    color: white;
}

.toast-container{
    z-index: 10050;
}
</style>