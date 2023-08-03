<template>
  <PdfDoc></PdfDoc>
  <RightClickMenu ref="contextMenu"></RightClickMenu>
  <div
    class="shadow-lg mb-4 bg-body-tertiary imagesTap d-flex justify-content-start align-items-center overflow-x-hidden">
    <div class="scroll-container d-flex">
      <img class="m-1" v-for="(value, key) in this.$store.state.componentData.senariosData" :key="key" :src="value.imgSrc"
        :alt="key" @click="goToTheSenario(key)" v-show="value.imgSrc" />
    </div>
  </div>
  <div class="border  pt-3" id="ArbeitsBereich" ref="arbeitsBereich">
    <h3 v-show="this.$store.state.componentData.senarios == 0" class="text-center mt-5">Add Senario !</h3>
    <Senario v-for="(value, key) in this.$store.state.componentData.senariosData" :key="value" :id="key"></Senario>
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
    RightClickMenu
  },
  mounted() {
    this.goToTheSenario(this.$store.state.componentData.activeSenario);
  },
  methods: {
    goToTheSenario(key) {
      this.$store.state.componentData.activeSenario = key;
      $('[id^="Senario-"]').hide();
      $("#" + key).show(400);
    },
  },

};
</script>
<style scoped>
#ArbeitsBereich {
  min-height: 800px;
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
