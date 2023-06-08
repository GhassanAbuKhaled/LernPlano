<template>
  <div
    class="d-flex nav fw-bold align-self-center d-inline m-1 shadow-lg bg-body-tertiary rounded interaktion"
    :id="id"
    @contextmenu="$emit('contextmenu', $event)"
  >
    <i
      class="bi bi-circle-fill m-2"
      :style="{ color: componentProps.color }"

    ></i>
    <p
      class="text-sm-start m-2"
      :style="{ color: componentProps.color }"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      data-bs-title="Farbe ändern"
    >
      {{ componentProps.name }}
    </p>
    <small class="align-self-center inputs">
      <select class="taxonomies m-2" v-model="selectedTaxonomie">
        <option selected>{{ componentProps.taxonomie }}</option>
        <option v-for="(tax, index) in taxonomieItems" :value="tax" :key="index">
          {{ tax }}
        </option>
      </select>
      Bewertung:
      <input
        type="number"
        class="bewertungsMode m-1"
        v-model="Bewertung"
        style="text-align: center"
      />
    </small>
  </div>
</template>

<script>
import { Tooltip } from "bootstrap/dist/js/bootstrap.js";
import { rgbToHex } from "@/utils/rightClickUtils";
export default {
  data() {
    return {
      selectedTaxonomie: null,
      Bewertung: 0,
      taxonomieItems: [
        "Erinnern",
        "Verstehen",
        "Anwenden",
        "Analysieren",
        "Bewerten",
        "Erschaffen",
      ],
    };
  },
  mounted() {
    this.selectedTaxonomie = this.componentProps.taxonomie;
    this.Bewertung = this.componentProps.bewertung;
    $(".inputs").on("mousedown", function (e) {
      e.stopPropagation();
    });
    this.initializeTooltips();
  },
  props: {
    id: { type: String },
    senario: { type: String },
    componentProps: { type: Object },
  },
  emits: ["contextmenu"],
  watch: {
    selectedTaxonomie(newValue) {
      this.$store.state.componentData.senariosData[this.senario].component[
        this.id
      ].taxonomie = newValue;
    },
    Bewertung(newValue) {
      this.$store.state.componentData.senariosData[this.senario].component[
        this.id
      ].bewertung = newValue;
    },
  },
  methods: {
    initializeTooltips() {
      const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltips.forEach((tooltip) => new Tooltip(tooltip));
    },

  },
};
</script>

<style scoped>
i:hover {
  cursor: all-scroll;
}

p {
  cursor: default;
}

.interaktion {
  width: 50%;
}

.bewertungsMode::placeholder {
  text-align: center;
}
</style>
