<template>
  <!-- Modal -->
  <div class="modal fade" id="lernPfadInfo" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <div class="d-inline-flex">
            <img class="navbar-brand me-2" src="@/assets/BUW_Logo.png" width="30" alt="logo" />
            <strong>
              <p class="modal-title mt-1">LernPfad Information</p>
            </strong>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-5 mt-4">
            <label
              class="form-label fst-italic shadow-lg bg-body-tertiary bg-light rounded p-2"><strong>LernPfad:</strong></label>
              <textarea class="form-control shadow-lg bg-body-tertiary rounded resizable-textarea" placeholder="Schreiben Sie den Text !" @input="handleInputLernPfadName"  :value="LernPfad"></textarea>

          </div>
          <div class="mb-3 mt-2">
            <label class="form-label fst-italic shadow-lg bg-body-tertiary bg-light rounded p-2"><strong>Beschreibung der
                Lernziele:</strong></label>
                <textarea class="form-control shadow-lg bg-body-tertiary rounded resizable-textarea" placeholder="Schreiben Sie den Text !" @input="handleInputLernziele"  :value="dynamicContent"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary btn-sm" data-bs-dismiss="modal">
            speichern
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicContent:'',
      LernPfad: '',
    };
  },
  mounted(){
  this.dynamicContent = this.$store.state.componentData.Lernziele;
  this.LernPfad = this.$store.state.componentData.LernPfadName
  },
  watch: {
    LernPfad() {
      this.$store.state.componentData.LernPfadName = this.LernPfad;
    },
  },
  methods: {
    handleInputLernziele(event) {
      this.$store.state.componentData.Lernziele = event.target.value;
    },
    handleInputLernPfadName(event) {
      this.$store.state.componentData.LernPfadName = event.target.value;
    },
  },
};
</script>
<style scoped>
#LernPfadName::placeholder {
  opacity: 0.5;
}
.resizable-textarea {
  min-height: 100px;
}

.form-control.resizable-textarea :empty:before {
  content: attr(placeholder);
  opacity: 0.3;
  font-size: large;
}
</style>
