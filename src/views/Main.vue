<template>
  <div class="main-workspace">
    <Backdrop></Backdrop>
    <OffCanvasRight></OffCanvasRight>
    <PfadInfo></PfadInfo>
    
    <div class="workspace-container">
      <div class="sidebar-section">
        <IconsTab></IconsTab>
      </div>
      
      <div class="main-section">
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
  background: linear-gradient(135deg, #f7f9fc 0%, #ecf1f6 50%, #e8f4f8 100%);
}

.workspace-container {
  display: flex;
  gap: var(--space-6);
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--space-6);
  min-height: calc(100vh - 120px);
}

.sidebar-section {
  width: 320px;
  flex-shrink: 0;
  position: sticky;
  top: 100px;
  height: fit-content;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.main-section {
  flex: 1;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-xl);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(217, 226, 236, 0.3);
  overflow: hidden;
}

@media (max-width: 1024px) {
  .workspace-container {
    flex-direction: column;
    gap: var(--space-4);
  }
  
  .sidebar-section {
    width: 100%;
    position: static;
    max-height: none;
  }
}

@media (max-width: 768px) {
  .workspace-container {
    padding: var(--space-4);
  }
}
</style>
