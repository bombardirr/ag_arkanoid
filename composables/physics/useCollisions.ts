import type {Ball, Paddle} from "~/types/game";

export default (
    ball: Ref<Ball>,
    paddle: Ref<Paddle>,
    container: Ref<{ width: number, height: number }>
) => {
    // Проверка столкновения со стенами
    const checkWallCollision = () => {
        // Левая/правая стенка
        if (ball.value.position.x - ball.value.radius <= 0 || ball.value.position.x + ball.value.radius >= container.value.width) {
            // Инвертируем по X
            ball.value.velocity.x *= -1
        }

        // Верхняя стенка
        if (ball.value.position.y - ball.value.radius <= 0) {
            // Инвертируем по Y
            ball.value.velocity.y *= -1
        }
    }

    // Проверка столкновения с платформой
    const checkPaddleCollision = () => {
        const ballBottom = ball.value.position.y + ball.value.radius;
        const ballCenterX = ball.value.position.x

        if (
            ballBottom >= paddle.value.position.y && ballCenterX >= paddle.value.position.x && ballCenterX <= paddle.value.position.x + paddle.value.size.width
        ) {
            // Угол отскока зависит от места удара
            const hitPosition = (ballCenterX - paddle.value.position.x) / paddle.value.size.width;

            // Диапазон от -0.5 до 0.5
            const normalizedHit = (hitPosition - 0.5) * 2

            // Боковой отскок
            ball.value.velocity.x = normalizedHit * 5

            // Вверх
            ball.value.velocity.y = -Math.abs(ball.value.velocity.y)
        }
    }

    // Проверка вылета за нижнюю границу
    const checkBottomCollision = (): boolean => {
        return ball.value.position.y - ball.value.radius > container.value.height
    }

    return {
        checkWallCollision,
        checkPaddleCollision,
        checkBottomCollision
    }
}