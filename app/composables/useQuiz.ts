

import { useState } from "nuxt/app"
import { shallowRef } from "vue"

// composables/useQuiz.ts
export const useQuiz = () => {
  // 使用 useState 在组件间共享状态
  // shallowRef 对于大量静态数据至关重要，避免深层响应式损耗性能
  const questions = useState<any[]>('quiz-questions', () => shallowRef([]))
  const isLoading = useState('quiz-loading', () => false)
  
  // 缓存 Promise，防止重复请求
  // 注意：这个变量只在客户端存在，不做 SSR 传输
  let fetchPromise: Promise<any> | null = null

  const loadData = async () => {
    // 如果已有数据，直接返回
    if (questions.value.length > 0) return true
    
    // 如果正在请求中，等待同一个 Promise
    if (fetchPromise) return fetchPromise

    isLoading.value = true
    
    // 使用 $fetch 而不是 useFetch，因为我们不想在 SSR 阶段阻塞页面渲染
    // 我们希望这纯粹是客户端行为
    fetchPromise = $fetch<any[]>('/api/questions')
      .then((data) => {
        questions.value = data
        return true
      })
      .catch((err) => {
        console.error(err)
        return false
      })
      .finally(() => {
        isLoading.value = false
        fetchPromise = null
      })

    return fetchPromise
  }

  return {
    questions,
    isLoading,
    loadData
  }
}