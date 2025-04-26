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

interface Circle {
    center: Point;
    radius: number;
}

interface Rectangle {
    position: Point;
    size: Size
}

// ========================
// Игровые сущности
// ========================

interface Paddle extends Rectangle {
    speed: number;
    color: string;
    readonly maxWidth: number; // Константа (можно менять только через модификаторы)
}

interface Ball extends Circle {
    velocity: Point;
    baseSpeed: number;
    color: string;
}

type BrickType = 'basic' | 'hard' | 'indestructible'

interface Brick extends Rectangle {
    type: BrickType;
    health: number;
    color: string;
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