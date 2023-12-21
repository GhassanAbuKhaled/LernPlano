<template>
  <PdfDoc></PdfDoc>
  <RightClickMenu ref="contextMenu"></RightClickMenu>

  <!-- Photos Tab moved above ArbeitsBereich -->
  <div
    class="shadow-lg mb-4 bg-body-tertiary imagesTap d-flex justify-content-start align-items-center overflow-x-hidden"
  >
    <div class="scroll-container d-flex" ref="sortableContainer">
      <div
        v-for="(value, key, index) in this.$store.state.componentData.senariosData"
        :key="key"
        :id="'Sub?' + key"
        class="draggable-item"
      >
        <img
          class="m-1"
          :src="value.imgSrc"
          :alt="'Senario-' + (index + 1)"
          @click="goToTheSenario(key)"
          v-show="value.imgSrc"
        />
      </div>
    </div>
  </div>
  <div class="border pt-3" id="ArbeitsBereich" ref="arbeitsBereich">
    <h3 v-show="this.$store.state.componentData.senarios == 0" class="text-center mt-5">
      Add Szenario!
    </h3>
    <Senario
      v-for="(value, key, index) in this.$store.state.componentData.senariosData"
      :key="key"
      :id="key"
    ></Senario>
  </div>
</template>
<script>
import Senario from "./Senario.vue";
import PdfDoc from "../Items/PdfDoc.vue";
import RightClickMenu from "@/components/Right click menu/RightClickMenu.vue";

export default {
  components: {
    PdfDoc,
    Senario,
    RightClickMenu,
  },
  mounted() {
    this.initSortable();
    this.goToTheSenario(this.$store.state.componentData.activeSenario);
  },
  methods: {
    initSortable() {
      $(this.$refs.sortableContainer).sortable({
        items: ".draggable-item",
        update: this.updateOrder,
      });
    },

    goToTheSenario(key) {
      this.$store.state.componentData.activeSenario = key;
      $('[id^="Senario-"]').hide();
      $("#" + key).show(400);
    },
    updateOrder(event, ui) {
      const itemId = ui.item.attr("id");
      const updatedOrder = $(this.$refs.sortableContainer).sortable("toArray");
      const newPosition = updatedOrder.indexOf(itemId) + 1;
      this.$store.commit("updateOrder", { updatedOrder });
      $('[id^="Senario-"]').hide();
      setTimeout(() => {
        this.goToTheSenario("Senario-"+newPosition)
        $('html, body').scrollTop(0);
      }, 50);
    },
  },
};
</script>

<style scoped>
.draggable-item {
  cursor: grab;
}
.draggable-item:active {
  cursor: grabbing;
}
#ArbeitsBereich {
  min-height: 100vh;
  transition: transform 0.3s ease;
}
.imagesTap img {
  width: 80px;
  height: 50px;
  transition: transform 0.3s ease;
}
.imagesTap img:hover {
  z-index: 16;
  transform: scale(1.04);
  cursor: pointer;
}
.overflow-x-hidden {
  overflow-x: auto;
  scrollbar-width: none;
  position: sticky;
  top: 40px;
  z-index: 18;
  -ms-overflow-style: none;
}
.scroll-container {
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}
h3 {
  font-size: x-large;
  color: rgb(0, 0, 0);
  opacity: 0.4;
  font-weight: bold;
}
</style>
