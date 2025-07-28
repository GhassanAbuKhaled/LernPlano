<template>
  <div class="modern-alert-container">
    <div id="AlertToast" role="alert" aria-live="assertive" aria-atomic="true" class="modern-alert" data-bs-autohide="false">
      <div class="alert-content">
        <div class="alert-header">
          <div class="alert-icon">
            <i class="bi bi-exclamation-triangle-fill"></i>
          </div>
          <div class="alert-title">
            <h4>Bestätigung erforderlich</h4>
            <p>Sind Sie sich sicher?</p>
          </div>
        </div>
        <div class="alert-actions">
          <button type="button" class="btn-delete">
            <i class="bi bi-trash3"></i>
            Löschen
          </button>
          <button type="button" class="btn-cancel">
            <i class="bi bi-x-circle"></i>
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modern-backdrop" id="myOverlay"></div>
</template>
  
<script>
export default {
  name: 'MyAlert',
};
</script>
  
<style scoped>
.modern-alert-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1050;
  pointer-events: none;
}

.modern-alert {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  min-width: 400px;
  max-width: 500px;
  transform: scale(0.9);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.modern-alert.show {
  transform: scale(1);
  opacity: 1;
  pointer-events: auto;
}

.alert-content {
  padding: 24px;
}

.alert-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
}

.alert-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.alert-icon i {
  color: white;
  font-size: 24px;
}

.alert-title h4 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.alert-title p {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
}

.alert-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-delete,
.btn-cancel {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-delete {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

.btn-delete:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.btn-cancel {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #e5e7eb;
}

.btn-cancel:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.modern-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1040;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.modern-backdrop:not(.d-none) {
  opacity: 1;
  pointer-events: auto;
}

.modern-backdrop.d-none {
  display: none !important;
}

@media (max-width: 480px) {
  .modern-alert {
    min-width: 320px;
    max-width: calc(100vw - 2rem);
    margin: 1rem;
  }
  
  .alert-content {
    padding: 20px;
  }
  
  .alert-actions {
    flex-direction: column;
  }
  
  .btn-delete,
  .btn-cancel {
    width: 100%;
    justify-content: center;
  }
}
</style>
  