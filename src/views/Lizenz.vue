<template>
  <div class="page-container">
    <div class="page-content">
      <div class="page-header">
        <h1 class="page-title">Lizenz</h1>
        <p class="page-subtitle">Nutzungsbedingungen und Lizenzinformationen für Lernplano</p>
      </div>
      
      <div class="license-sections">
        <section class="license-card">
          <h2 class="section-title">
            <i class="bi bi-file-text section-icon" aria-hidden="true"></i>
            Software-Lizenz
          </h2>
          <div class="section-content">
            <p>Lernplano wird unter einer offenen Lizenz zur Verfügung gestellt, die es Bildungseinrichtungen und Einzelpersonen ermöglicht, die Software für Bildungszwecke zu nutzen.</p>
          </div>
        </section>
        
        <section class="license-card">
          <h2 class="section-title">
            <i class="bi bi-shield-check section-icon" aria-hidden="true"></i>
            Nutzungsrechte
          </h2>
          <div class="section-content">
            <p>Sie dürfen diese Software:</p>
            <ul class="license-list">
              <li class="license-item">
                <i class="bi bi-check-circle license-check" aria-hidden="true"></i>
                Für Bildungszwecke verwenden
              </li>
              <li class="license-item">
                <i class="bi bi-check-circle license-check" aria-hidden="true"></i>
                Kopieren und verteilen
              </li>
              <li class="license-item">
                <i class="bi bi-check-circle license-check" aria-hidden="true"></i>
                Modifizieren und anpassen
              </li>
              <li class="license-item">
                <i class="bi bi-check-circle license-check" aria-hidden="true"></i>
                In nicht-kommerziellen Projekten einsetzen
              </li>
            </ul>
          </div>
        </section>
        
        <section class="license-card">
          <h2 class="section-title">
            <i class="bi bi-exclamation-triangle section-icon" aria-hidden="true"></i>
            Einschränkungen
          </h2>
          <div class="section-content">
            <p>Die folgenden Einschränkungen gelten:</p>
            <ul class="restriction-list">
              <li class="restriction-item">
                <i class="bi bi-x-circle restriction-x" aria-hidden="true"></i>
                Keine kommerzielle Nutzung ohne Genehmigung
              </li>
              <li class="restriction-item">
                <i class="bi bi-x-circle restriction-x" aria-hidden="true"></i>
                Keine Gewährleistung oder Haftung
              </li>
              <li class="restriction-item">
                <i class="bi bi-x-circle restriction-x" aria-hidden="true"></i>
                Urheberrechtshinweise müssen erhalten bleiben
              </li>
            </ul>
          </div>
        </section>
        
        <section class="license-card">
          <h2 class="section-title">
            <i class="bi bi-info-circle section-icon" aria-hidden="true"></i>
            Haftungsausschluss
          </h2>
          <div class="section-content">
            <p>Diese Software wird "wie besehen" zur Verfügung gestellt, ohne jegliche ausdrückliche oder stillschweigende Gewährleistung. Die Bergische Universität Wuppertal übernimmt keine Haftung für Schäden, die durch die Nutzung dieser Software entstehen könnten.</p>
          </div>
        </section>
        
        <section class="license-card">
          <h2 class="section-title">
            <i class="bi bi-envelope section-icon" aria-hidden="true"></i>
            Kontakt für Lizenzfragen
          </h2>
          <div class="section-content">
            <p>Für Fragen zur Lizenzierung oder für kommerzielle Nutzungsanfragen wenden Sie sich bitte an:</p>
            <p><strong>Bergische Universität Wuppertal</strong><br>
            E-Mail: <a href="mailto:info@uni-wuppertal.de" class="license-link">info@uni-wuppertal.de</a></p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: 'Lizenz',
}
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
  font-size: var(--font-size-lg);
  color: var(--gray-600);
  font-weight: 400;
  margin: 0;
}

.license-sections {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.license-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-200);
  transition: all var(--transition-normal);
}

.license-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.section-title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--gray-800);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-2);
  border-bottom: 2px solid var(--gray-200);
}

.section-icon {
  color: var(--primary-600);
  font-size: var(--font-size-lg);
}

.section-content {
  color: var(--gray-600);
  line-height: 1.7;
}

.section-content p {
  margin-bottom: var(--space-4);
}

.section-content p:last-child {
  margin-bottom: 0;
}

.license-list,
.restriction-list {
  list-style: none;
  padding: 0;
  margin: var(--space-4) 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.license-item,
.restriction-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--font-size-base);
  color: var(--gray-700);
}

.license-check {
  color: var(--success);
  font-size: var(--font-size-lg);
  flex-shrink: 0;
}

.restriction-x {
  color: var(--error);
  font-size: var(--font-size-lg);
  flex-shrink: 0;
}

.license-link {
  color: var(--primary-600);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.license-link:hover {
  color: var(--primary-700);
  text-decoration: underline;
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
    font-size: var(--font-size-base);
  }
  
  .license-card {
    padding: var(--space-6);
  }
  
  .section-title {
    font-size: var(--font-size-lg);
    flex-direction: column;
    gap: var(--space-2);
    text-align: center;
  }
}
</style>
    