<template>
  <div :id="id" class="interaction-item">
    <div class="item-card">
      <div class="item-header" :style="{ background: `linear-gradient(135deg, ${componentProps.color}20, ${componentProps.color}10)` }">
        <div class="item-icon" :style="{ background: componentProps.color }">
          <i class="bi bi-circle-fill" aria-hidden="true"></i>
        </div>
        <span class="item-label" :style="{ color: componentProps.color }">{{ componentProps.name }}</span>
        <div class="header-controls">
          <input
            type="color"
            class="color-picker-icon"
            v-model="selectedColor"
            @mousedown="handleMouseDown"
            title="Farbe ändern"
          />
          <button class="delete-icon" @click="deleteComponent" @mousedown="handleMouseDown" title="Löschen">
            <i class="bi bi-trash3" aria-hidden="true"></i>
          </button>
          <div class="drag-handle">
            <i class="bi bi-grip-vertical" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div class="item-content">
        <div class="interaction-controls">
          <div class="control-group">
            <label class="control-label">Taxonomie</label>
            <select class="modern-select" v-model="selectedTaxonomie" @mousedown="handleMouseDown">
              <option :value="componentProps.taxonomie">{{ componentProps.taxonomie }}</option>
              <option v-for="(tax, index) in taxonomieItems" :value="tax" :key="index">
                {{ tax }}
              </option>
            </select>
          </div>
          <div class="control-group">
            <label class="control-label">Bewertung</label>
            <input
              type="number"
              class="modern-input"
              v-model="Bewertung"
              @mousedown="handleMouseDown"
              min="0"
              max="100"
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tooltip } from "bootstrap/dist/js/bootstrap.js";
import { showDeleteToast } from "@/utils/toastUtils";
export default {
  data() {
    return {
      selectedTaxonomie: null,
      Bewertung: 0,
      selectedColor: '#688b09',
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
    this.selectedColor = this.componentProps.color;
    this.initializeTooltips();
  },
  props: {
    id: { type: String },
    senario: { type: String },
    componentProps: { type: Object },
  },

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
    selectedColor(newValue) {
      this.$store.state.componentData.senariosData[this.senario].component[
        this.id
      ].color = newValue;
    },
  },
  methods: {
    initializeTooltips() {
      const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltips.forEach((tooltip) => new Tooltip(tooltip));
    },
    handleMouseDown(event) {
      event.stopPropagation();
    },
    async deleteComponent() {
      if (await showDeleteToast()) {
        delete this.$store.state.componentData.senariosData[this.senario].component[this.id];
      }
    },
  },
};
</script>

<style scoped>
.interaction-item {
  width: 100%;
  margin-bottom: var(--space-4);
}

.item-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(217, 226, 236, 0.4);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all var(--transition-fast);
  overflow: hidden;
}

.item-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}

.item-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid rgba(217, 226, 236, 0.3);
}

.item-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--font-size-sm);
}

.item-label {
  flex: 1;
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.color-picker-icon {
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.color-picker-icon:hover {
  transform: scale(1.1);
}

.delete-icon {
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  color: var(--gray-400);
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.delete-icon:hover {
  color: var(--error);
  background: rgba(239, 68, 68, 0.1);
  transform: scale(1.1);
}

.drag-handle {
  color: var(--gray-400);
  cursor: grab;
  padding: var(--space-1);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.drag-handle:hover {
  color: var(--gray-600);
  background: rgba(0, 0, 0, 0.05);
}

.drag-handle:active {
  cursor: grabbing;
}

.item-content {
  padding: var(--space-4);
}

.interaction-controls {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.control-group {
  flex: 1;
  min-width: 150px;
}

.control-label {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--gray-600);
  margin-bottom: var(--space-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.modern-select,
.modern-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  background: rgba(255, 255, 255, 0.8);
  transition: all var(--transition-fast);
}

.modern-select:focus,
.modern-input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(98, 125, 152, 0.1);
  background: white;
}

.modern-input {
  text-align: center;
}

.modern-input::placeholder {
  color: var(--gray-400);
}


</style>
