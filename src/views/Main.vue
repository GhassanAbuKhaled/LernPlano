<template>
  <Backdrop></Backdrop>
  <OffCanvasRight></OffCanvasRight>
  <PfadInfo></PfadInfo> 
  <div class="m-4">
    <div class="row iconsTab">
      <IconsTab></IconsTab>
    </div>
    <div class="row">
      <ArbeitsBereich></ArbeitsBereich>
    </div>
  </div>
</template>
<script>
import Backdrop from "../components/Main sections/Backdrop.vue";
import PfadInfo from "@/components/Main sections/PfadInfo.vue";
import IconsTab from "../components/Main sections/IconsTab.vue";
import ArbeitsBereich from "../components/Main sections/ArbeitsBereich.vue";
import OffCanvasRight from "@/components/Main sections/OffCanvasRight.vue";

export default {
  components: {
    Backdrop,
    PfadInfo,
    IconsTab,
    ArbeitsBereich,
    OffCanvasRight,
  },
};
</script>

<style scoped>
.iconsTab {
  position: sticky;
  top: -1px;
  z-index: 20;
}
</style>
