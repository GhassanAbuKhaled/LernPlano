<template>
  <div class="page-container">
    <div class="page-content">
      <div class="page-header">
        <h1 class="page-title">Impressum</h1>
        <p class="page-subtitle">Rechtliche Informationen gemäß § 5 TMG</p>
      </div>
      
      <div class="legal-sections">
        <section class="legal-card">
          <h2 class="section-title">Angaben gemäß § 5 TMG</h2>
          <div class="section-content">
            <p><strong>Bergische Universität Wuppertal</strong></p>
            <p>Gaußstraße 20<br>
            42119 Wuppertal</p>
            <p><strong>Telefon:</strong> +49 202 439-0<br>
            <strong>E-Mail:</strong> info@uni-wuppertal.de</p>
          </div>
        </section>
        
        <section class="legal-card">
          <h2 class="section-title">Vertreten durch</h2>
          <div class="section-content">
            <p>Die Bergische Universität Wuppertal wird gesetzlich vertreten durch den Rektor.</p>
          </div>
        </section>
        
        <section class="legal-card">
          <h2 class="section-title">Umsatzsteuer-ID</h2>
          <div class="section-content">
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br>
            DE 121 689 768</p>
          </div>
        </section>
        
        <section class="legal-card">
          <h2 class="section-title">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <div class="section-content">
            <p>Bergische Universität Wuppertal<br>
            Gaußstraße 20<br>
            42119 Wuppertal</p>
          </div>
        </section>
        
        <section class="legal-card">
          <h2 class="section-title">Haftungsausschluss</h2>
          <div class="section-content">
            <h3 class="subsection-title">Haftung für Inhalte</h3>
            <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
            
            <h3 class="subsection-title">Haftung für Links</h3>
            <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Impressum",
};
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

.legal-sections {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.legal-card {
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
  
  .legal-card {
    padding: var(--space-6);
  }
  
  .section-title {
    font-size: var(--font-size-lg);
  }
}
</style>
