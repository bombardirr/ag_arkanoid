import type { Ball } from "~/types/game"

export default () => {
    const ball = ref<Ball>({
        position: { x: 0, y: 0 },
        radius: 10,
        velocity: { x: 0, y: 0 }, // Начально нулевая скорость
        color: "#fff"
    })

    const reset = (containerSize: { width: number, height: number }) => {
        ball.value.position = {
            x: containerSize.width / 2,
            y: containerSize.height / 2
        }

        // Более предсказуемый старт
        ball.value.velocity = {
            x: (Math.random() > 0.5 ? 1 : -1) * 3,
            y: -3
        }
    }

    const move = () => {
        ball.value.position.x += ball.value.velocity.x
        ball.value.position.y += ball.value.velocity.y
    }

    return { ball, reset, move }
}