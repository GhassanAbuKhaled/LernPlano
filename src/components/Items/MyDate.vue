<template>
  <div @contextmenu="$emit('contextmenu', $event)" :id="id" class="date-item">
    <div class="item-card">
      <div class="item-header">
        <div class="item-icon">
          <i class="bi bi-calendar-event-fill" aria-hidden="true"></i>
        </div>
        <span class="item-label">Datum</span>
        <div class="drag-handle">
          <i class="bi bi-grip-vertical" aria-hidden="true"></i>
        </div>
      </div>
      <div class="item-content">
        <div class="date-input-wrapper">
          <input 
            type="date" 
            class="modern-date-input" 
            v-model="date" 
            ref="datepickerInput"
            aria-label="Datum auswählen"
          >
          <div class="date-display" v-if="formattedDate">
            <i class="bi bi-calendar-check" aria-hidden="true"></i>
            <span>{{ formattedDate }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: ''
    }
  },
  mounted() {
    this.date = this.componentProps.date
  },
  props: {
    id: { type: String },
    senario: { type: String },
    componentProps: { type: Object }
  },
  emits: ['contextmenu'],
  watch: {
    date(newValue) {
      this.$store.state.componentData.senariosData[this.senario].component[this.id].date = newValue;
    }
  },
  computed: {
    formattedDate() {
      if (!this.date) return '';
      const dateObj = new Date(this.date);
      return dateObj.toLocaleDateString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  },
};
</script>

<style scoped>
.date-item {
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
  background: linear-gradient(135deg, var(--accent-purple-light), rgba(233, 216, 253, 0.3));
  border-bottom: 1px solid rgba(217, 226, 236, 0.3);
}

.item-icon {
  width: 24px;
  height: 24px;
  background: var(--accent-purple);
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

.date-input-wrapper {
  position: relative;
}

.modern-date-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-family: var(--font-family-sans);
  background: rgba(255, 255, 255, 0.8);
  transition: all var(--transition-fast);
  cursor: pointer;
  color: var(--gray-700);
}

.modern-date-input:focus {
  outline: none;
  border-color: var(--accent-purple);
  box-shadow: 0 0 0 3px rgba(128, 90, 213, 0.1);
  background: white;
}

.modern-date-input::-webkit-calendar-picker-indicator {
  background: var(--accent-purple);
  border-radius: var(--radius-sm);
  padding: 2px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.modern-date-input::-webkit-calendar-picker-indicator:hover {
  background: var(--accent-purple);
  transform: scale(1.1);
}

.date-display {
  margin-top: var(--space-3);
  padding: var(--space-3);
  background: linear-gradient(135deg, var(--accent-purple-light), rgba(233, 216, 253, 0.3));
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--gray-700);
  border: 1px solid rgba(128, 90, 213, 0.2);
}

.date-display i {
  color: var(--accent-purple);
  font-size: var(--font-size-base);
}

.date-display span {
  font-weight: 500;
}
</style>

  