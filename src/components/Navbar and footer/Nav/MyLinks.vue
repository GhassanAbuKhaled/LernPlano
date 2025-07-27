<template>
    <li class="nav-item" role="none">
      <router-link to="/" class="nav-link" role="menuitem" aria-label="Go to start page">
        <i class="bi bi-house-door" aria-hidden="true"></i>
        <span>Start</span>
      </router-link>
    </li>
    <li class="nav-item" role="none">
      <router-link :to="{ name: 'main' }" class="nav-link" role="menuitem" aria-label="Go to planning page">
        <i class="bi bi-diagram-3" aria-hidden="true"></i>
        <span>Planen</span>
      </router-link>
    </li>
</template>
<script>
export default {
    name: 'MyLinks',
    props: ['margin'],
}
</script>
<style scoped>
.nav-item {
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  color: var(--gray-600);
  text-decoration: none;
  font-weight: 500;
  font-size: var(--font-size-sm);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  position: relative;
}

.nav-link:hover {
  color: var(--primary-600);
  background-color: var(--primary-50);
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  color: var(--primary-700);
  background-color: var(--primary-100);
  font-weight: 600;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: var(--primary-600);
  border-radius: 1px;
}

.nav-link i {
  font-size: var(--font-size-base);
}

@media (max-width: 991px) {
  .nav-link {
    padding: var(--space-4);
    border-radius: var(--radius-md);
  }
  
  .nav-link.router-link-active::after {
    display: none;
  }
}
</style>