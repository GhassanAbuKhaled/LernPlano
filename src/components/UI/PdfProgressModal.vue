<template>
  <div v-if="isVisible" class="pdf-progress-overlay">
    <div class="pdf-progress-modal">
      <div class="progress-header">
        <div class="progress-icon">
          <i class="bi bi-file-earmark-pdf-fill" aria-hidden="true"></i>
        </div>
        <h3 class="progress-title">PDF wird erstellt</h3>
      </div>
      
      <div class="progress-content">
        <div class="progress-bar-container">
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ width: progress + '%' }"
            ></div>
          </div>
          <span class="progress-text">{{ Math.round(progress) }}%</span>
        </div>
        
        <div class="progress-step">
          <i class="bi bi-gear-fill spin" aria-hidden="true"></i>
          <span>{{ currentStep }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PdfProgressModal',
  computed: {
    isVisible() {
      return this.$store.state.componentData.pdfProgress?.isGenerating || false;
    },
    progress() {
      return this.$store.state.componentData.pdfProgress?.progress || 0;
    },
    currentStep() {
      return this.$store.state.componentData.pdfProgress?.currentStep || '';
    }
  }
};
</script>

<style scoped>
.pdf-progress-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.pdf-progress-modal {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  min-width: 400px;
  max-width: 500px;
}

.progress-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.progress-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--error), var(--error-light));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--font-size-xl);
}

.progress-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--gray-800);
  margin: 0;
}

.progress-bar-container {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: var(--gray-200);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-500), var(--accent-teal));
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--gray-600);
  min-width: 40px;
}

.progress-step {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--gray-600);
  font-size: var(--font-size-sm);
}

.spin {
  animation: spin 1s linear infinite;
  color: var(--primary-500);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>