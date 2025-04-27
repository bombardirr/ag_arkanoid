<script setup lang="ts">
import usePaddle from "~/composables/entities/usePaddle";

const gameContainer = ref<HTMLDivElement | null>(null)
const containerSize = ref({width: 0, height: 0})

// Инициализация платформы
const {paddle, moveTo, init} = usePaddle(containerSize)

// Обработчик движения мыши
const handleMouseMove = (e: MouseEvent) => {
  if (!gameContainer.value) return;

  let targetX = e.clientX - gameContainer.value.getBoundingClientRect().left;
  moveTo(targetX - paddle.value.size.width / 2)
}

// Инициализация
onMounted(() => {
  if (!gameContainer.value) return;

  const rect = gameContainer.value.getBoundingClientRect()
  containerSize.value = { width: rect.width, height: rect.height }

  init()
  document.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove);
})
</script>

<template>
  <div ref="gameContainer" class="game-container">
    <div
        class="paddle"
        :style="{
        left: `${paddle.position.x}px`,
        top: `${paddle.position.y}px`,
        width: `${paddle.size.width}px`,
        height: `${paddle.size.height}px`,
        backgroundColor: paddle.color
      }"
    />
  </div>
</template>

<style scoped lang="scss">
.game-container {
  position: relative;
  width: 50vw;
  height: 50vh;
  background-color: #000;
  margin: auto;
  overflow: hidden;

  .paddle {
    position: absolute;
    border-radius: 4px;
    will-change: transform;
  }
}
</style>