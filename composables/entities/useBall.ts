import type {Ball} from "~/types/game";

export default () => {
    const ball = ref<Ball>({
        position: {x: 0, y: 0},
        radius: 10,
        velocity: {x: 3, y: -3},
        color: "#fff"
    });

    // Сброс позиции мяча
    const reset = (containerSize: { width: number, height: number }) => {
        ball.value.position = {
            x: containerSize.width / 2,
            y: containerSize.height / 2
        }

        // Рандомный начальный угол
        ball.value.velocity = {
            x: Math.random() > 0.5 ? 3 : -3,
            y: -3
        }
    }

    // Движение мяча
    const move = () => {
        ball.value.position.x += ball.value.velocity.x;
        ball.value.velocity.y += ball.value.velocity.y;
    }
    return {ball, reset, move};
}