<template>
  <div :id="id" class="url-item">
    <div class="item-card">
      <div class="item-header">
        <div class="item-icon">
          <i class="bi bi-link-45deg" aria-hidden="true"></i>
        </div>
        <span class="item-label">URL Link</span>
        <div class="header-controls">
          <button class="delete-icon" @click="deleteComponent" @mousedown="handleMouseDown" title="Löschen">
            <i class="bi bi-trash3" aria-hidden="true"></i>
          </button>
          <div class="drag-handle">
            <i class="bi bi-grip-vertical" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div class="item-content">
        <input 
          type="url" 
          class="modern-input" 
          placeholder="https://example.com"
          @mousedown="handleMouseDown" 
          v-model="url"
          aria-label="URL eingeben"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { showDeleteToast } from "@/utils/toastUtils";
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

  methods: {
    handleMouseDown(event) {
      event.stopPropagation();
    },
    async deleteComponent() {
      if (await showDeleteToast()) {
        delete this.$store.state.componentData.senariosData[this.senario].component[this.id];
      }
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
.url-item {
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
  background: linear-gradient(135deg, var(--accent-teal-light), rgba(178, 245, 234, 0.3));
  border-bottom: 1px solid rgba(217, 226, 236, 0.3);
}

.item-icon {
  width: 24px;
  height: 24px;
  background: var(--accent-teal);
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
  color: var(--gray-700);
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

.header-controls {
  display: flex;
  align-items: center;
  gap: var(--space-2);
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

.drag-handle:active {
  cursor: grabbing;
}

.item-content {
  padding: var(--space-4);
}

.modern-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  background: rgba(255, 255, 255, 0.8);
  transition: all var(--transition-fast);
}

.modern-input:focus {
  outline: none;
  border-color: var(--accent-teal);
  box-shadow: 0 0 0 3px rgba(49, 151, 149, 0.1);
  background: white;
}

.modern-input::placeholder {
  color: var(--gray-400);
}
</style>
