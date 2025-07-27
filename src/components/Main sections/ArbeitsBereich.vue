<template>
  <div class="work-area">
    <PdfDoc></PdfDoc>
    <RightClickMenu ref="contextMenu"></RightClickMenu>

    <!-- Scenario Navigation -->
    <div class="scenario-nav" v-if="Object.keys(this.$store.state.componentData.senariosData).length > 0">
      <div class="scenario-nav-header">
        <h4 class="nav-title">
          <i class="bi bi-collection me-2" aria-hidden="true"></i>
          Szenarien-Übersicht
        </h4>
      </div>
      
      <div class="scenario-thumbnails" ref="sortableContainer">
        <div
          v-for="(value, key, index) in this.$store.state.componentData.senariosData"
          :key="key"
          :id="'Sub?' + key"
          class="scenario-thumbnail"
          :class="{ 'active': key === this.$store.state.componentData.activeSenario }"
        >
          <div class="thumbnail-wrapper" @click="goToTheSenario(key)" v-show="value.imgSrc">
            <img
              :src="value.imgSrc"
              :alt="`Szenario ${index + 1}`"
              class="thumbnail-image"
            />
            <div class="thumbnail-overlay">
              <span class="scenario-number">{{ index + 1 }}</span>
            </div>
          </div>
          
          <div class="thumbnail-placeholder" v-if="!value.imgSrc" @click="goToTheSenario(key)">
            <i class="bi bi-image" aria-hidden="true"></i>
            <span>Szenario {{ index + 1 }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Work Area -->
    <div class="main-work-area" id="ArbeitsBereich" ref="arbeitsBereich">
      <div class="empty-state" v-show="this.$store.state.componentData.senarios == 0">
        <div class="empty-state-content">
          <i class="bi bi-plus-circle empty-state-icon" aria-hidden="true"></i>
          <h3 class="empty-state-title">Erstes Szenario erstellen</h3>
          <p class="empty-state-description">
            Beginnen Sie mit der Erstellung Ihres Lernpfads, indem Sie Ihr erstes Szenario hinzufügen.
          </p>
          <button class="btn btn-primary" @click="addFirstScenario">
            <i class="bi bi-plus-circle me-2" aria-hidden="true"></i>
            Szenario hinzufügen
          </button>
        </div>
      </div>
      
      <Senario
        v-for="(value, key, index) in this.$store.state.componentData.senariosData"
        :key="key"
        :id="key"
        class="scenario-content"
      ></Senario>
    </div>
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
    addFirstScenario() {
      // Trigger the same functionality as clicking the add scenario button in IconsTab
      document.getElementById('addSenario').click();
    },
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
.work-area {
  background: linear-gradient(135deg, #f7f9fc 0%, #ecf1f6 100%);
}

/* Scenario Navigation */
.scenario-nav {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(217, 226, 236, 0.3);
  padding: var(--space-4) var(--space-6);
  position: sticky;
  top: 0;
  z-index: 50;
}

.scenario-nav-header {
  margin-bottom: var(--space-4);
}

.nav-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--gray-800);
  margin: 0;
  display: flex;
  align-items: center;
}

.scenario-thumbnails {
  display: flex;
  gap: var(--space-3);
  overflow-x: auto;
  padding-bottom: var(--space-2);
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.scenario-thumbnails::-webkit-scrollbar {
  height: 4px;
}

.scenario-thumbnails::-webkit-scrollbar-track {
  background: var(--gray-100);
  border-radius: 2px;
}

.scenario-thumbnails::-webkit-scrollbar-thumb {
  background: var(--gray-300);
  border-radius: 2px;
}

.scenario-thumbnail {
  flex-shrink: 0;
  cursor: grab;
  transition: all var(--transition-fast);
}

.scenario-thumbnail:active {
  cursor: grabbing;
}

.scenario-thumbnail.active .thumbnail-wrapper,
.scenario-thumbnail.active .thumbnail-placeholder {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 2px var(--primary-100);
}

.thumbnail-wrapper,
.thumbnail-placeholder {
  position: relative;
  width: 120px;
  height: 80px;
  border-radius: var(--radius-md);
  border: 2px solid var(--gray-200);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-fast);
  background: white;
}

.thumbnail-wrapper:hover,
.thumbnail-placeholder:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--gray-300);
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-fast);
}

.thumbnail-wrapper:hover .thumbnail-image {
  transform: scale(1.05);
}

.thumbnail-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: var(--space-2);
  display: flex;
  justify-content: center;
  align-items: end;
}

.scenario-number {
  color: white;
  font-size: var(--font-size-sm);
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.thumbnail-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  color: var(--gray-400);
  background: var(--gray-50);
  border-style: dashed;
}

.thumbnail-placeholder i {
  font-size: var(--font-size-xl);
}

.thumbnail-placeholder span {
  font-size: var(--font-size-xs);
  font-weight: 500;
}

.thumbnail-placeholder:hover {
  color: var(--gray-600);
  background: var(--gray-100);
}

/* Main Work Area */
.main-work-area {
  min-height: 70vh;
  padding: var(--space-6);
  transition: all var(--transition-normal);
}

/* Empty State */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: var(--space-8);
}

.empty-state-content {
  text-align: center;
  max-width: 400px;
}

.empty-state-icon {
  font-size: 4rem;
  color: var(--gray-300);
  margin-bottom: var(--space-4);
}

.empty-state-title {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--gray-700);
  margin-bottom: var(--space-3);
}

.empty-state-description {
  font-size: var(--font-size-base);
  color: var(--gray-500);
  line-height: 1.6;
  margin-bottom: var(--space-6);
}

/* Scenario Content */
.scenario-content {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(217, 226, 236, 0.3);
  margin-bottom: var(--space-6);
  overflow: hidden;
  transition: all var(--transition-normal);
}

.scenario-content:hover {
  box-shadow: var(--shadow-md);
}

/* Responsive Design */
@media (max-width: 768px) {
  .scenario-nav {
    padding: var(--space-3) var(--space-4);
  }
  
  .nav-title {
    font-size: var(--font-size-base);
  }
  
  .scenario-thumbnails {
    gap: var(--space-2);
  }
  
  .thumbnail-wrapper,
  .thumbnail-placeholder {
    width: 100px;
    height: 60px;
  }
  
  .main-work-area {
    padding: var(--space-4);
  }
  
  .empty-state {
    padding: var(--space-6) var(--space-4);
    min-height: 50vh;
  }
  
  .empty-state-icon {
    font-size: 3rem;
  }
  
  .empty-state-title {
    font-size: var(--font-size-xl);
  }
}

@media (max-width: 480px) {
  .thumbnail-wrapper,
  .thumbnail-placeholder {
    width: 80px;
    height: 50px;
  }
  
  .scenario-number {
    font-size: var(--font-size-xs);
  }
  
  .thumbnail-placeholder i {
    font-size: var(--font-size-base);
  }
  
  .thumbnail-placeholder span {
    display: none;
  }
}
</style>
