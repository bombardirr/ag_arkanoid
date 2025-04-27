import type { Paddle } from '@/types/game'

export default function (container: Ref<{ width: number; height: number }>) {
    const paddle = ref<Paddle>({
        position: { x: 0, y: 0 },
        size: { width: 100, height: 20 },
        speed: 8,
        maxWidth: 150,
        color: '#fff'
    })

    // Плавное движение с гарантией соблюдения границ
    const moveTo = (targetX: number) => {
        // Сначала ограничиваем целевую позицию
        const clampedX = Math.max(
            0,
            Math.min(targetX, container.value.width - paddle.value.size.width)
        )

        // Затем плавно двигаем
        const dx = clampedX - paddle.value.position.x
        paddle.value.position.x += dx * paddle.value.speed * 0.05

        // Фиксируем позицию, если близко к границе
        if (Math.abs(dx) < 0.5) {
            paddle.value.position.x = clampedX
        }
    }

    const init = () => {
        paddle.value.position = {
            x: container.value.width / 2 - paddle.value.size.width / 2,
            y: container.value.height - 40
        }
    }

    return {
        paddle,
        moveTo,
        init
    }
}