<template>
    <div class="modern-toast-container" id="toastContainer">
        <div id="toastMessage" class="modern-toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-content">
                <div class="toast-icon">
                    <i class="bi bi-mortarboard-fill"></i>
                </div>
                <div class="toast-text">
                    <div class="toast-title">Lernplano</div>
                    <div class="toast-message"></div>
                </div>
                <button type="button" class="toast-close" aria-label="Close">
                    <i class="bi bi-x"></i>
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
   
}
</script>
  
<style scoped>
.modern-toast-container {
    position: fixed;
    z-index: 10050;
    padding: 1rem;
    pointer-events: none;
}

.modern-toast {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    min-width: 320px;
    max-width: 400px;
    pointer-events: none;
    transform: translateY(-20px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modern-toast.show {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
}

.toast-content {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
}

.toast-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.toast-icon i {
    color: white;
    font-size: 18px;
}

.toast-text {
    flex: 1;
    min-width: 0;
}

.toast-title {
    font-weight: 600;
    font-size: 14px;
    color: #1f2937;
    margin-bottom: 4px;
}

.toast-message {
    font-size: 13px;
    color: #6b7280;
    line-height: 1.4;
    word-wrap: break-word;
}

.toast-close {
    background: none;
    border: none;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
}

.toast-close:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #374151;
}

.toast-close i {
    font-size: 16px;
}

@media (max-width: 480px) {
    .modern-toast {
        min-width: 280px;
        max-width: calc(100vw - 2rem);
    }
    
    .toast-content {
        padding: 14px;
        gap: 10px;
    }
}
</style>