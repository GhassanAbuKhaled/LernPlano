<template>
  <div class="img-fluid d-flex align-self-center m-1  shadow-lg bg-body-tertiary rounded" ref="container"
    @contextmenu="$emit('contextmenu', $event)" :id="id">
    <i class="bi bi-arrows-move"></i>
      <textarea class="form-control shadow-lg bg-body-tertiary rounded resizable-textarea" placeholder="Schreiben Sie den Text !" @blur="handleInput" @mousedown="handleMouseDown" :value="dynamicContent"></textarea>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dynamicContent: "",
    };
  },
  props: {
    id: { type: String },
    senario: { type: String },
    componentProps: { type: Object },
  },
  emits: ["contextmenu"],
  mounted() {
    this.dynamicContent = this.$store.state.componentData.senariosData[this.senario].component[this.id].text;
  },
  methods: {
    handleInput(event) {
      this.$store.state.componentData.senariosData[this.senario].component[this.id].text = event.target.value;
    },
    handleMouseDown(event) {
      event.stopPropagation();
    },
  },
};
</script>
<style scoped>
.img-fluid {
  width: 50%;
  position: relative;
}
i {
  margin: 5px;
  cursor: pointer;
}
.textEditor {
  top: -33px;
}
.bi-arrows-move {
  font-weight: bolder;
  position: absolute;
  cursor: all-scroll;
  top: -4px;
  right: 0;
}
.form-control.resizable-textarea {
  min-height: 200px;
}
.form-control.resizable-textarea :empty:before {
  content: attr(placeholder);
  opacity: 0.3;
  font-size: large;
}
</style>
