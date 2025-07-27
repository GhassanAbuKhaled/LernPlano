<template>
  <header class="modern-header">
    <nav class="modern-navbar" role="navigation" aria-label="Main navigation">
      <div class="navbar-container">
        <div class="navbar-brand">
          <img src="@/assets/BUW_Logo.png" width="40" height="40" alt="Bergische Universität Wuppertal Logo" class="brand-logo">
          <router-link to="/" class="brand-link" aria-label="Go to homepage">
            <span class="brand-text">Lernplano</span>
          </router-link>
        </div>

        <button class="mobile-menu-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#navContent"
          aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation menu">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
        
        <div class="navbar-collapse collapse" id="navContent">
          <ul class="navbar-nav" role="menubar">
            <MyLinks :margin="'0'"></MyLinks>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import MyLinks from '../Nav/MyLinks.vue';

export default {
  name: 'Navbar',
  components: { MyLinks }
};
</script>
  
<style scoped>
.modern-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--gray-200);
  box-shadow: var(--shadow-sm);
}

.modern-navbar {
  padding: var(--space-4) 0;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.brand-logo {
  border-radius: var(--radius-sm);
  transition: transform var(--transition-fast);
}

.brand-logo:hover {
  transform: scale(1.05);
}

.brand-link {
  text-decoration: none;
  color: var(--gray-800);
  font-weight: 600;
  font-size: var(--font-size-xl);
  transition: color var(--transition-fast);
}

.brand-link:hover {
  color: var(--primary-600);
}

.brand-text {
  background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  padding: var(--space-2);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-fast);
}

.mobile-menu-toggle:hover {
  background-color: var(--gray-100);
}

.hamburger-line {
  width: 24px;
  height: 2px;
  background-color: var(--gray-600);
  border-radius: 1px;
  transition: all var(--transition-fast);
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  list-style: none;
  margin: 0;
  padding: 0;
}

@media (max-width: 991px) {
  .mobile-menu-toggle {
    display: flex;
  }
  
  .navbar-collapse {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border-top: 1px solid var(--gray-200);
    box-shadow: var(--shadow-md);
    padding: var(--space-4) var(--space-6);
  }
  
  .navbar-nav {
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-1);
  }
}

@media (max-width: 570px) {
  .brand-text {
    display: none;
  }
  
  .navbar-container {
    padding: 0 var(--space-4);
  }
}
</style>
  