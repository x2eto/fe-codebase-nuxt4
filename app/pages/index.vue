<template>
  <div class="intro-page">
    <div class="intro-content">
      <h1 class="main-title">3分钟测出你们的真实关系</h1>

      <div class="meta-info">
        <span>34.4万人已测</span>
        <span class="divider">|</span>
        <span>11道精选题</span>
      </div>

      <div class="description">
        <p>
          恋爱谈久了，感情就会慢慢的淡去，少了激情，少了感动，关系也没有之前的亲密了。你们现在是处于什么状态呢？下面有一个测试，来看看你们目前的真实关系是什么状态吧！
        </p>
      </div>

      <div class="references">
        <h4>部分参考文献</h4>
        <p>
          [1] Rogers, C. R. (2002). The interpersonal relationship. Supporting
          Lifelong Learning.
        </p>
      </div>
    </div>

    <div class="footer-action">
      <button
        class="start-btn"
        :class="{ 'is-loading': isBtnLoading }"
        @click="handleStart"
      >
        <span v-if="!isBtnLoading">立即测试</span>
        <span v-else class="btn-spinner">
          <!-- 简单的 CSS Spinner -->
          <span class="spinner-icon"></span> 准备题目中...
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "nuxt/app";

const router = useRouter();
const { loadData, questions } = useQuiz();
const isBtnLoading = ref(false);

// 核心逻辑：页面挂载到客户端后，立即开始“偷跑”加载数据
onMounted(() => {
  loadData();
});

const handleStart = async () => {
  // 1. 检查数据是否已就绪
  if (questions.value.length > 0) {
    router.push("/quiz");
    return;
  }

  // 2. 如果没就绪，展示 Loading 并等待结果
  isBtnLoading.value = true;
  try {
    const success = await loadData();
    if (success) {
      router.push("/quiz");
    } else {
      alert("数据加载失败，请检查网络");
    }
  } finally {
    isBtnLoading.value = false;
  }
};

// 设置页面元信息 (Nuxt 优势：SEO)
useHead({
  title: "情感关系真题测试 - 3分钟出结果",
  meta: [{ name: "description", content: "专业的亲密关系评估测试..." }],
});
</script>

<style scoped>
/* 样式与之前保持一致，为节省篇幅略作复用 */
.intro-page {
  padding: 40px 25px 100px;
  min-height: 100vh;
  background: #fff;
}
.main-title {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}
.meta-info {
  display: flex;
  justify-content: center;
  color: #999;
  font-size: 13px;
  margin-bottom: 40px;
}
.divider {
  margin: 0 15px;
  color: #eee;
}
.description {
  font-size: 15px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 40px;
  text-align: justify;
}
.footer-action {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 30px;
  background: linear-gradient(to top, #fff 80%, transparent);
}
.start-btn {
  width: 100%;
  height: 50px;
  border-radius: 25px;
  border: none;
  background: linear-gradient(90deg, #ff8c69, #ff4d6a);
  color: white;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(255, 77, 106, 0.3);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.start-btn:active {
  transform: scale(0.98);
}
.start-btn.is-loading {
  opacity: 0.8;
}
.spinner-icon {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.references h4 {
  font-size: 14px;
  color: #999;
  margin-bottom: 5px;
}
.references p {
  font-size: 12px;
  color: #ccc;
}
</style>
