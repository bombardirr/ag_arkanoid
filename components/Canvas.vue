<script setup lang="ts">
import type {Paddle} from "~/types/game";

const paddle = ref<Paddle>({
  position: {x: 0, y: 0},
  size: {width: 100, height: 20},
  speed: 8,
  maxWidth: 150,
  color: '#fff'
})

const gameContainer = ref<HTMLDivElement | null>(null)

const handleMouseMove = (e: MouseEvent) => {
  if (!gameContainer.value) return;

  const containerRect = gameContainer.value.getBoundingClientRect();
  let targetX = e.clientX - containerRect.left - paddle.value.size.width / 2;

  // Ограничиваем позицию границами контейнера
  targetX = Math.max(
      0,
      Math.min(targetX, containerRect.width - paddle.value.size.width)
  );

  // Плавное движение со скоростью (speed)
  const dx = targetX - paddle.value.position.x;
  paddle.value.position.x += dx * paddle.value.speed * 0.05; // Коэффициент плавности
}

onMounted(() => {
  if (!gameContainer.value) return;
  const {width, height} = gameContainer.value.getBoundingClientRect();

  paddle.value.position = {
    x: width / 2 - paddle.value.size.width / 2,
    y: height - 40
  };

  document.addEventListener('mousemove', handleMouseMove);
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove);
})

// Для будущих расширений (изменение размера)
const resizePaddle = (newWidth: number) => {
  paddle.value.size.width = Math.min(
      Math.max(newWidth, 50), // minWidth можно вынести в тип
      paddle.value.maxWidth
  );
}
</script>

<template>
  <div
      ref="gameContainer"
      class="game-container"
  >
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

<style lang="scss">
.game-container {
  position: relative;
  width: 50vw;
  height: 50vh;
  background-color: #000;
  margin: auto;
  overflow: hidden; // Чтобы paddle не выходил за границы

  .paddle {
    position: absolute;
    border-radius: 4px;
    will-change: transform; // Оптимизация анимации
  }
}
</style>