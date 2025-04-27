<script setup lang="ts">
import usePaddle from "~/composables/entities/usePaddle"
import useBall from "~/composables/entities/useBall"
import useCollision from "~/composables/physics/useCollisions"

const gameContainer = ref<HTMLDivElement | null>(null)
const containerSize = ref({ width: 0, height: 0 })

// Инициализация игровых объектов
const { paddle, moveTo, init: initPaddle } = usePaddle(containerSize)
const { ball, reset: resetBall, move: moveBall } = useBall()
const { checkWallCollision, checkPaddleCollision, checkBottomCollision } =
    useCollision(ball, paddle, containerSize)

// Обработчик движения мыши
const handleMouseMove = (e: MouseEvent) => {
  if (!gameContainer.value) return
  const mouseX = e.clientX - gameContainer.value.getBoundingClientRect().left
  moveTo(mouseX - paddle.value.size.width / 2)
}

// Игровой цикл
const gameLoop = () => {
  moveBall()
  checkWallCollision()
  checkPaddleCollision()

  if (checkBottomCollision()) {
    resetBall(containerSize.value)
  }

  requestAnimationFrame(gameLoop)
}

// Инициализация
onMounted(() => {
  if (!gameContainer.value) return

  const rect = gameContainer.value.getBoundingClientRect()
  containerSize.value = { width: rect.width, height: rect.height }

  initPaddle()
  resetBall(containerSize.value)

  // Стартуем мяч с платформы
  ball.value.position = {
    x: paddle.value.position.x + paddle.value.size.width / 2,
    y: paddle.value.position.y - ball.value.radius - 5
  }

  document.addEventListener('mousemove', handleMouseMove)
  gameLoop()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
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
    <div
        class="ball"
        :style="{
        left: `${ball.position.x - ball.radius}px`,
        top: `${ball.position.y - ball.radius}px`,
        width: `${ball.radius * 2}px`,
        height: `${ball.radius * 2}px`,
        backgroundColor: ball.color
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

  .paddle, .ball {
    position: absolute;
    border-radius: 50%;
    will-change: transform;
  }

  .paddle {
    border-radius: 4px;
  }
}
</style>