<template>
  <div class="page-container">
    <div class="page-content">
      <div class="page-header">
        <h1 class="page-title">Datenschutzerklärung</h1>
        <p class="page-subtitle">Informationen zur Verarbeitung Ihrer personenbezogenen Daten</p>
      </div>
      
      <div class="privacy-sections">
        <section class="privacy-card">
          <h2 class="section-title">1. Datenschutz auf einen Blick</h2>
          <div class="section-content">
            <h3 class="subsection-title">Allgemeine Hinweise</h3>
            <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
          </div>
        </section>
        
        <section class="privacy-card">
          <h2 class="section-title">2. Allgemeine Hinweise und Pflichtinformationen</h2>
          <div class="section-content">
            <h3 class="subsection-title">Datenschutz</h3>
            <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
            
            <h3 class="subsection-title">Hinweis zur verantwortlichen Stelle</h3>
            <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
            <p><strong>Bergische Universität Wuppertal</strong><br>
            Gaußstraße 20<br>
            42119 Wuppertal<br>
            Telefon: +49 202 439-0<br>
            E-Mail: info@uni-wuppertal.de</p>
          </div>
        </section>
        
        <section class="privacy-card">
          <h2 class="section-title">3. Datenerfassung auf dieser Website</h2>
          <div class="section-content">
            <h3 class="subsection-title">Server-Log-Dateien</h3>
            <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:</p>
            <ul>
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
          </div>
        </section>
        
        <section class="privacy-card">
          <h2 class="section-title">4. Ihre Rechte</h2>
          <div class="section-content">
            <p>Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen.</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: 'Datenschutzerklärung',
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

.privacy-sections {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.privacy-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-200);
}

.section-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--gray-800);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-2);
  border-bottom: 2px solid var(--gray-200);
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

.section-content ul {
  margin: var(--space-3) 0;
  padding-left: var(--space-6);
}

.section-content li {
  margin-bottom: var(--space-2);
}

.subsection-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--gray-700);
  margin: var(--space-6) 0 var(--space-3) 0;
}

.subsection-title:first-child {
  margin-top: 0;
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
  
  .privacy-card {
    padding: var(--space-6);
  }
  
  .section-title {
    font-size: var(--font-size-lg);
  }
}
</style>
    