<template>
  <footer class="modern-footer" role="contentinfo">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-brand">
          <img src="@/assets/BUW_Logo.png" width="32" height="32" alt="BUW Logo" class="footer-logo">
          <span class="footer-brand-text">Lernplano</span>
        </div>
        
        <nav class="footer-nav" aria-label="Footer navigation">
          <ul class="footer-links">
            <MyLinks :margin="'0'"></MyLinks>
          </ul>
        </nav>
      </div>
      
      <div class="footer-bottom">
        <p class="footer-copyright">© 2023 Lernplano - Bergische Universität Wuppertal</p>
        <div class="footer-legal">
          <!-- <router-link :to="{ name: 'impressum' }" class="footer-legal-link">Impressum</router-link>
          <router-link :to="{ name: 'datenschutzerklaerung' }" class="footer-legal-link">Datenschutz</router-link>
          <router-link :to="{ name: 'lizenz' }" class="footer-legal-link">Lizenz</router-link> -->
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import MyLinks from '../Nav/MyLinks.vue';
export default {
  name: 'MyFooter',
  components: { MyLinks },
}
</script>
<style scoped>
.modern-footer {
  margin-top: auto;
  background: linear-gradient(135deg, var(--gray-800), var(--gray-900));
  color: var(--gray-300);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6) var(--space-6);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-8);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--gray-800);
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.footer-logo {
  border-radius: var(--radius-sm);
  opacity: 0.9;
}

.footer-brand-text {
  font-size: var(--font-size-lg);
  font-weight: 600;
  background: linear-gradient(135deg, white, var(--primary-200));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.footer-links {
  display: flex;
  gap: var(--space-6);
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.footer-copyright {
  font-size: var(--font-size-sm);
  color: var(--gray-400);
  margin: 0;
}

.footer-legal {
  display: flex;
  gap: var(--space-4);
}

.footer-legal-link {
  font-size: var(--font-size-sm);
  color: var(--gray-400);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-legal-link:hover {
  color: var(--primary-400);
}

/* Override nav link styles for footer */
.footer-nav :deep(.nav-link) {
  color: rgba(255, 255, 255, 0.8) !important;
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-sm);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.footer-nav :deep(.nav-link:hover) {
  color: white !important;
  background: rgba(255, 255, 255, 0.1);
  transform: none;
}

.footer-nav :deep(.nav-link.router-link-active) {
  color: var(--primary-200) !important;
  background: rgba(98, 125, 152, 0.2);
}

.footer-nav :deep(.nav-link.router-link-active::after) {
  display: none;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: var(--space-6);
    text-align: center;
  }
  
  .footer-nav {
    justify-content: center;
  }
  
  .footer-links {
    flex-direction: column;
    gap: var(--space-3);
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: var(--space-3);
  }
  
  .footer-legal {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-container {
    padding: var(--space-6) var(--space-4) var(--space-4);
  }
  
  .footer-legal {
    flex-direction: column;
    gap: var(--space-2);
  }
}
</style>


