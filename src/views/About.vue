<template>
  <div class="page-container">
    <div class="page-content">
      <div class="page-header">
        <h1 class="page-title">Über Lernplano</h1>
        <p class="page-subtitle">Innovative Lernpfad-Erstellung für moderne Bildung</p>
      </div>
      
      <div class="content-sections">
        <section class="content-card">
          <h2 class="section-title">
            <i class="bi bi-lightbulb section-icon" aria-hidden="true"></i>
            Unsere Vision
          </h2>
          <p class="section-text">
            Lernplano wurde entwickelt, um Bildungsexperten dabei zu unterstützen, 
            interaktive und ansprechende Lernpfade zu erstellen. Unser Ziel ist es, 
            das Lernen durch innovative Technologie zu verbessern und zugänglicher zu machen.
          </p>
        </section>
        
        <section class="content-card">
          <h2 class="section-title">
            <i class="bi bi-gear section-icon" aria-hidden="true"></i>
            Funktionen
          </h2>
          <ul class="feature-list">
            <li class="feature-item">
              <i class="bi bi-check-circle feature-check" aria-hidden="true"></i>
              Intuitive Drag-and-Drop-Oberfläche
            </li>
            <li class="feature-item">
              <i class="bi bi-check-circle feature-check" aria-hidden="true"></i>
              Interaktive Lernelemente
            </li>
            <li class="feature-item">
              <i class="bi bi-check-circle feature-check" aria-hidden="true"></i>
              Export als PDF oder JSON
            </li>
            <li class="feature-item">
              <i class="bi bi-check-circle feature-check" aria-hidden="true"></i>
              Responsive Design für alle Geräte
            </li>
          </ul>
        </section>
        
        <section class="content-card">
          <h2 class="section-title">
            <i class="bi bi-building section-icon" aria-hidden="true"></i>
            Bergische Universität Wuppertal
          </h2>
          <p class="section-text">
            Dieses Projekt wurde an der Bergischen Universität Wuppertal entwickelt 
            und spiegelt unser Engagement für innovative Bildungstechnologien wider.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.page-container {
  min-height: 100vh;
  background: var(--gray-50);
  padding: var(--space-8) 0;
}

.page-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.page-header {
  text-align: center;
  margin-bottom: var(--space-12);
}

.page-title {
  font-size: var(--font-size-4xl);
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: var(--space-4);
  background: linear-gradient(135deg, var(--gray-900), var(--primary-700));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: var(--font-size-xl);
  color: var(--gray-600);
  font-weight: 400;
  margin: 0;
}

.content-sections {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.content-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-200);
  transition: all var(--transition-normal);
}

.content-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.section-title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--gray-800);
  margin-bottom: var(--space-4);
}

.section-icon {
  color: var(--primary-600);
  font-size: var(--font-size-xl);
}

.section-text {
  font-size: var(--font-size-base);
  line-height: 1.7;
  color: var(--gray-600);
  margin: 0;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--font-size-base);
  color: var(--gray-700);
}

.feature-check {
  color: var(--success);
  font-size: var(--font-size-lg);
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .page-container {
    padding: var(--space-6) 0;
  }
  
  .page-content {
    padding: 0 var(--space-4);
  }
  
  .page-title {
    font-size: var(--font-size-3xl);
  }
  
  .page-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .content-card {
    padding: var(--space-6);
  }
  
  .section-title {
    font-size: var(--font-size-xl);
  }
}
</style>