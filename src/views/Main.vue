<template>
  <div class="main-workspace">
    <Backdrop></Backdrop>
    <OffCanvasRight></OffCanvasRight>
    <PfadInfo></PfadInfo>
    
    <div class="workspace-container">
      <div class="toolbar-section">
        <IconsTab></IconsTab>
      </div>
      
      <div class="work-area-section">
        <ArbeitsBereich></ArbeitsBereich>
      </div>
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
.main-workspace {
  min-height: 100vh;
  background: var(--gray-50);
}

.workspace-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--space-6);
}

.toolbar-section {
  position: sticky;
  top: 80px;
  z-index: 100;
  margin-bottom: var(--space-6);
  background: var(--gray-50);
  padding: var(--space-2) 0;
  border-radius: var(--radius-lg);
}

.work-area-section {
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-200);
  overflow: hidden;
}

@media (max-width: 768px) {
  .workspace-container {
    padding: var(--space-4);
  }
  
  .toolbar-section {
    top: 70px;
    margin-bottom: var(--space-4);
  }
}
</style>
