// ========================
// Базовые типы геометрии
// ========================

interface Point {
    x: number;
    y: number;
}

interface Size {
    width: number;
    height: number;
}

interface GameObject {
    position: Point;
    color: string;
    size: Size;
}

// ========================
// Игровые сущности
// ========================

interface Paddle extends GameObject {
    speed: number;
    readonly maxWidth: number; // Константа (можно менять только через модификаторы)
}

interface Ball extends Omit<GameObject, 'size'> {
    radius: number;
    velocity: Point;
}

type BrickType = 'basic' | 'hard' | 'indestructible'

interface Brick extends GameObject {
    type: BrickType;
    health: number;
    points: number;
}

// ========================
// Состояние игры
// ========================

interface GameState {
    status: 'idle' | 'running' | 'paused' | 'game-over'
    score: number
    lives: number;
    level: number;
}

// ========================
// События игры
// ========================

type GameEvent =
    | { type: 'ball-missed' }
    | { type: 'brick-destroyed'; brick: Brick }
    | { type: 'level-complete' }

export type {
    Point, Size, Circle, Rectangle,
    Paddle, Ball, Brick, BrickType,
    GameState, GameEvent
}