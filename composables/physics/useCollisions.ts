import type { Ball, Paddle } from "~/types/game"

export default (
    ball: Ref<Ball>,
    paddle: Ref<Paddle>,
    container: Ref<{ width: number, height: number }>
) => {
    // Защита от "залипания" мяча
    let lastCollisionTime = 0
    const COLLISION_COOLDOWN = 100 // 100ms

    const checkWallCollision = () => {
        // Левая/правая стенка
        if (ball.value.position.x - ball.value.radius <= 0 ||
            ball.value.position.x + ball.value.radius >= container.value.width) {

            // Добавляем небольшой случайный угол
            if (Date.now() - lastCollisionTime > COLLISION_COOLDOWN) {
                ball.value.velocity.x *= -1
                ball.value.velocity.y += (Math.random() - 0.5) * 0.5
                lastCollisionTime = Date.now()
            }
        }

        // Верхняя стенка
        if (ball.value.position.y - ball.value.radius <= 0) {
            ball.value.velocity.y = Math.abs(ball.value.velocity.y) * 0.98 // Небольшое трение
        }
    }

    const checkPaddleCollision = () => {
        const ballBottom = ball.value.position.y + ball.value.radius
        const ballCenterX = ball.value.position.x

        if (ballBottom >= paddle.value.position.y &&
            ballCenterX >= paddle.value.position.x - ball.value.radius &&
            ballCenterX <= paddle.value.position.x + paddle.value.size.width + ball.value.radius) {

            // Угол отскока с учетом краев
            const hitPosition = (ballCenterX - paddle.value.position.x) / paddle.value.size.width
            const normalizedHit = (hitPosition - 0.5) * 2

            // Динамический отскок
            ball.value.velocity.x = normalizedHit * 6
            ball.value.velocity.y = -Math.abs(ball.value.velocity.y) * 0.9
        }
    }

    const checkBottomCollision = (): boolean => {
        return ball.value.position.y - ball.value.radius > container.value.height
    }

    return { checkWallCollision, checkPaddleCollision, checkBottomCollision }
}