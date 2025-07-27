<template>
  <div @contextmenu="$emit('contextmenu', $event)" :id="id" class="text-item">
    <div class="item-card">
      <div class="item-header">
        <div class="item-icon">
          <i class="bi bi-chat-square-text-fill" aria-hidden="true"></i>
        </div>
        <span class="item-label">Text</span>
        <div class="drag-handle">
          <i class="bi bi-grip-vertical" aria-hidden="true"></i>
        </div>
      </div>
      <div class="item-content">
        <textarea 
          class="modern-textarea" 
          placeholder="Schreiben Sie Ihren Text hier..."
          @blur="handleInput" 
          @mousedown="handleMouseDown" 
          :value="dynamicContent"
          aria-label="Text eingeben"
          rows="4"
        ></textarea>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dynamicContent: "",
    };
  },
  props: {
    id: { type: String },
    senario: { type: String },
    componentProps: { type: Object },
  },
  emits: ["contextmenu"],
  mounted() {
    this.dynamicContent = this.$store.state.componentData.senariosData[this.senario].component[this.id].text;
  },
  methods: {
    handleInput(event) {
      this.$store.state.componentData.senariosData[this.senario].component[this.id].text = event.target.value;
    },
    handleMouseDown(event) {
      event.stopPropagation();
    },
  },
};
</script>
<style scoped>
.text-item {
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
  background: linear-gradient(135deg, var(--accent-pink-light), rgba(254, 215, 226, 0.3));
  border-bottom: 1px solid rgba(217, 226, 236, 0.3);
}

.item-icon {
  width: 24px;
  height: 24px;
  background: var(--accent-pink);
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

.drag-handle:active {
  cursor: grabbing;
}

.item-content {
  padding: var(--space-4);
}

.modern-textarea {
  width: 100%;
  padding: var(--space-4);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-family: var(--font-family-sans);
  background: rgba(255, 255, 255, 0.8);
  transition: all var(--transition-fast);
  resize: vertical;
  min-height: 100px;
  line-height: 1.5;
}

.modern-textarea:focus {
  outline: none;
  border-color: var(--accent-pink);
  box-shadow: 0 0 0 3px rgba(213, 63, 140, 0.1);
  background: white;
}

.modern-textarea::placeholder {
  color: var(--gray-400);
}
</style>
