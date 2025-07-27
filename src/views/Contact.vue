<template>
  <div class="page-container">
    <div class="page-content">
      <div class="page-header">
        <h1 class="page-title">Kontakt</h1>
        <p class="page-subtitle">Haben Sie Fragen oder Anregungen? Wir helfen gerne weiter.</p>
      </div>
      
      <div class="contact-grid">
        <div class="contact-card">
          <div class="contact-icon">
            <i class="bi bi-building" aria-hidden="true"></i>
          </div>
          <h3 class="contact-title">Universität</h3>
          <p class="contact-info">
            Bergische Universität Wuppertal<br>
            Gaußstraße 20<br>
            42119 Wuppertal
          </p>
        </div>
        
        <div class="contact-card">
          <div class="contact-icon">
            <i class="bi bi-envelope" aria-hidden="true"></i>
          </div>
          <h3 class="contact-title">E-Mail</h3>
          <p class="contact-info">
            <a href="mailto:info@uni-wuppertal.de" class="contact-link">
              info@uni-wuppertal.de
            </a>
          </p>
        </div>
        
        <div class="contact-card">
          <div class="contact-icon">
            <i class="bi bi-telephone" aria-hidden="true"></i>
          </div>
          <h3 class="contact-title">Telefon</h3>
          <p class="contact-info">
            <a href="tel:+492024390" class="contact-link">
              +49 202 439-0
            </a>
          </p>
        </div>
        
        <div class="contact-card">
          <div class="contact-icon">
            <i class="bi bi-globe" aria-hidden="true"></i>
          </div>
          <h3 class="contact-title">Website</h3>
          <p class="contact-info">
            <a href="https://www.uni-wuppertal.de" target="_blank" rel="noopener noreferrer" class="contact-link">
              www.uni-wuppertal.de
            </a>
          </p>
        </div>
      </div>
      
      <div class="support-section">
        <div class="support-card">
          <h2 class="support-title">
            <i class="bi bi-question-circle me-3" aria-hidden="true"></i>
            Technischer Support
          </h2>
          <p class="support-text">
            Bei technischen Fragen zu Lernplano wenden Sie sich bitte an unser Support-Team. 
            Wir bemühen uns, Ihre Anfragen schnellstmöglich zu bearbeiten.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
}
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: var(--gray-50);
  padding: var(--space-8) 0;
}

.page-content {
  max-width: 1000px;
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

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-12);
}

.contact-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  text-align: center;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-200);
  transition: all var(--transition-normal);
}

.contact-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.contact-icon {
  width: 60px;
  height: 60px;
  background: var(--primary-100);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-4);
}

.contact-icon i {
  font-size: var(--font-size-2xl);
  color: var(--primary-600);
}

.contact-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--gray-800);
  margin-bottom: var(--space-3);
}

.contact-info {
  font-size: var(--font-size-base);
  color: var(--gray-600);
  line-height: 1.6;
  margin: 0;
}

.contact-link {
  color: var(--primary-600);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.contact-link:hover {
  color: var(--primary-700);
  text-decoration: underline;
}

.support-section {
  display: flex;
  justify-content: center;
}

.support-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-200);
  max-width: 600px;
  text-align: center;
}

.support-title {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--gray-800);
  margin-bottom: var(--space-4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.support-title i {
  color: var(--primary-600);
}

.support-text {
  font-size: var(--font-size-base);
  line-height: 1.7;
  color: var(--gray-600);
  margin: 0;
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
  
  .contact-grid {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
  
  .contact-card,
  .support-card {
    padding: var(--space-6);
  }
  
  .support-title {
    font-size: var(--font-size-xl);
    flex-direction: column;
    gap: var(--space-2);
  }
}
</style>
