// server/api/questions.get.ts
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // 生成海量数据
  return Array.from({ length: 5000 }).map((_, i) => ({
    id: i,
    index: i + 1,
    title: `[Nuxt版] 题目 ${
      i + 1
    }: 即使相处很久，你们还会通过肢体接触表达爱意吗？`,
    options: [
      { id: 1, label: "是的，这是一种习惯", value: "yes" },
      { id: 2, label: "很少了", value: "no" },
    ],
  }));
});
