<template>
  <div class="app-layout">
    <NuxtPage />
  </div>
</template>

<style>
/* 全局重置 */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  background: #f8f8f8;
}
.app-layout {
  max-width: 480px;
  margin: 0 auto;
  background: #fff;
  min-height: 100vh;
  position: relative;
}

/* 页面切换动画：page-前缀是 Nuxt 默认的 */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(20px); /* 页面稍微上浮出来 */
}
.page-leave-to {
  opacity: 0;
  /* transform: scale(0.95);  可选：旧页面稍微缩小 */
}
</style>
