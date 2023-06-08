<template>
  <div @contextmenu="$emit('contextmenu', $event)" :id="id"
    class="d-inline-flex align-self-center m-1 shadow-lg bg-body-tertiary rounded ">
    <div class="img-fluid ">
      <div class="input-group">
        <span class="input-group-text" style="height:35px ; cursor: all-scroll;opacity:0.4">URL</span>
        <input type="text" class="form-control" aria-describedby="basic-addon3 basic-addon4" style="height:35px;"
          @mousedown="handleMouseDown" v-model="url">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: ''
    }
  },
  mounted() {
    this.url = this.componentProps.url
  },
  props: {
    id: { type: String },
    senario: { type: String },
    componentProps: { type: Object }
  },
  emits: ['contextmenu'],
  methods: {
    handleMouseDown(event) {
      event.stopPropagation();
    },
  },
  watch: {
    url(newValue) {
      this.$store.state.componentData.senariosData[this.senario].component[this.id].url = newValue;
    }
  }
}
</script>
<style scoped>
.img-fluid {
  width: 100%;
}
.d-inline-flex {
  width: 50%;
}
</style>
