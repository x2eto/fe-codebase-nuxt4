<template>
  <div class="quiz-page">
    <div class="quiz-header">
      <button @click="router.back()" class="back-btn">返回</button>
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
      <span class="count">{{ currentIndex + 1 }}/{{ totalCount }}</span>
    </div>

    <div class="question-area">
      <Transition name="slide">
        <!-- 依然使用 key 来触发动画 -->
        <div
          :key="currentQuestion?.id"
          class="question-card"
          v-if="currentQuestion"
        >
          <h2 class="q-title">
            {{ currentQuestion.index }}. {{ currentQuestion.title }}
          </h2>

          <div class="options">
            <div
              v-for="opt in currentQuestion.options"
              :key="opt.id"
              class="option-item"
              @click="handleSelect(opt.value)"
            >
              {{ opt.label }}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuiz } from "../composables/useQuiz";

const router = useRouter();
const { questions } = useQuiz();
const currentIndex = ref(0);

// 防御性编程：如果用户直接通过 URL 访问 /quiz 而没有数据，跳回首页
if (!questions.value || questions.value.length === 0) {
  router.replace("/");
}

// 计算属性
const totalCount = computed(() => questions.value.length);
const currentQuestion = computed(() => questions.value[currentIndex.value]);
const progress = computed(() =>
  totalCount.value ? ((currentIndex.value + 1) / totalCount.value) * 100 : 0
);

const handleSelect = (val: string) => {
  // 逻辑同前，这里仅作演示
  if (currentIndex.value < totalCount.value - 1) {
    // 这里可以加一个小延迟让用户看到点击态
    setTimeout(() => {
      currentIndex.value++;
    }, 150);
  } else {
    alert("测试结束");
  }
};
</script>

<style scoped>
/* 答题页样式 */
.quiz-page {
  padding: 20px;
  min-height: 100vh;
  background: #fff;
  overflow: hidden;
}

.quiz-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 40px;
}

.back-btn {
  font-size: 12px;
  background: none;
  border: 1px solid #eee;
  padding: 4px 10px;
  border-radius: 12px;
  color: #666;
}

.progress-track {
  flex: 1;
  height: 6px;
  background: #f5f5f5;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #3b82f6;
  transition: width 0.3s ease;
}

.count {
  font-size: 14px;
  color: #999;
}

.question-area {
  position: relative;
  height: 60vh;
}

.question-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.q-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #333;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.option-item {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 50px;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.option-item:active {
  background: #e2e8f0;
}

/* 简单的左滑动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
