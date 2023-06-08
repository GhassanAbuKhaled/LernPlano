<template>
  <div @contextmenu="$emit('contextmenu', $event)" :id="id"
    class="d-inline-flex align-self-center shadow-lg m-1 bg-body-tertiary rounded">
    <div class="m-1">
      <div class="input-group">
        <span class="input-group-text" style="height: 35px; cursor: all-scroll; opacity: 0.4">Date</span>
        <input type="text" class="form-control" style="height: 35px" v-model="date" ref="datepickerInput"
          @click="initializeDatepicker" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: ''
    }
  },
  mounted() {
    this.date = this.componentProps.date
  },
  props: {
    id: { type: String },
    senario: { type: String },
    componentProps: { type: Object }
  },
  emits: ['contextmenu'],
  watch: {
    date(newValue) {
      this.$store.state.componentData.senariosData[this.senario].component[this.id].date = newValue;
    }
  },
  methods: {
    initializeDatepicker() {
      const inputElement = this.$refs.datepickerInput;
      $(inputElement).datepicker({
        onSelect: (selectedDate) => {
          this.date = selectedDate;
        }
      }).focus();
    }
  },
};
</script>

<style scoped>
.d-inline-flex {
  width: 50%;
}
</style>

  