const INITIAL_POS = new Vector2(40, 560);
const GOAL = new Vector2(540, 40);
const ADN_SIZE = 400;
const WALL_THICKNESS = 10;
const MIN_WALL_SIZE = 80;
const MAX_WALL_SIZE = 300;

let nbWall = 10;
let genRng = 0.07;

/** A simple 2D rectangle */
class Rectangle {
  x;
  y;
  w;
  h;
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(pos) {
    return (
      pos.x > this.x &&
      pos.x < this.x + this.w &&
      pos.y > this.y &&
      pos.y < this.y + this.h
    );
  }
}

/** The simulation board who contains obstacles */
class Board {
  obstacles;
  constructor() {
    this.obstacles = [];
    for (let i = 0; i < nbWall; i++) {
      this.obstacles.push(Board.randomObstacle());
    }
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "black";
    for (const obstacle of this.obstacles) {
      ctx.rect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
      ctx.fill();
      ctx.stroke();
    }
  }

  collide(pos) {
    for (const obstacle of this.obstacles) {
      if (obstacle.contains(pos)) {
        return true;
      }
    }
    const border = new Rectangle(0, 0, 600, 600);
    return !border.contains(pos);
  }

  static randomObstacle() {
    const isVertical = Math.randomBool();
    if (isVertical) {
      const x = Math.randomRange(0, 600 - WALL_THICKNESS);
      const y = Math.randomRange(0, 600 - MIN_WALL_SIZE);
      const w = WALL_THICKNESS;
      const h = Math.min(
        Math.randomRange(MIN_WALL_SIZE, 600 - y),
        MAX_WALL_SIZE
      );
      return new Rectangle(x, y, w, h);
    } else {
      const x = Math.randomRange(0, 600 - MIN_WALL_SIZE);
      const y = Math.randomRange(0, 600 - WALL_THICKNESS);
      const w = Math.min(
        Math.randomRange(MIN_WALL_SIZE, 600 - x),
        MAX_WALL_SIZE
      );
      const h = WALL_THICKNESS;
      return new Rectangle(x, y, w, h);
    }
  }
}

/** The main sim class who contains every entities and create successives generations */
class Population {
  entities;
  nbGen;
  constructor() {
    this.entities = [];
    for (let i = 0; i < 100; i++) {
      const ADN = [];
      for (let i = 0; i < ADN_SIZE; i++) {
        ADN[i] = new Vector2(Math.randomRange(-3, 3), Math.randomRange(-3, 3));
      }
      this.entities.push(new Entity(ADN));
    }
    this.nbGen = 0;
  }

  update(board) {
    if (this.anyAlive()) {
      for (const entity of this.entities) {
        entity.update(board);
      }
    } else {
      this.nextGen();
    }
  }

  draw(ctx) {
    for (const entity of this.entities) {
      entity.draw(ctx);
    }
    // Draw status text
    ctx.fillText("Gen " + this.nbGen, 10, 10);
    // Draw goal point
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(GOAL.x, GOAL.y, 4, 0, 2 * Math.PI);
    ctx.fill();
  }

  anyAlive() {
    for (const entity of this.entities) {
      if (entity.isAlive === true) {
        return true;
      }
    }
    return false;
  }

  nextGen() {
    // Aggregate fitness of the current generation
    const fitnessArray = [];
    let fitnessSum = 0;
    for (const [index, entity] of this.entities.entries()) {
      const fitness = entity.fitness();
      fitnessSum += fitness;
      fitnessArray[index] = fitnessSum;
    }
    // Elect which entity have a baby depending of their fitness
    const newEntities = [];
    for (let i = 0; i < 100; i++) {
      const rng = Math.randomRange(0, fitnessSum);
      for (const [index, fitness] of fitnessArray.entries()) {
        if (fitness >= rng) {
          newEntities.push(this.entities[index].giveBaby());
          break;
        }
      }
    }
    this.entities = newEntities;
    this.nbGen++;
  }
}

/** An AI entity with classical mechanics sims, fitness calculation and mutated baby generation */
class Entity {
  pos;
  vel;
  isAlive;
  ADN;
  step;
  constructor(ADN) {
    this.pos = INITIAL_POS.clone();
    this.vel = new Vector2(0, 0);
    this.isAlive = true;
    this.step = 0;
    this.ADN = ADN;
  }

  update(board) {
    if (this.isAlive) {
      let acc = this.ADN[this.step];
      this.vel.add(acc).limitMagnitude(7);
      this.pos.add(this.vel);
      this.step++;
      this.isAlive =
        this.step < ADN_SIZE - 1 &&
        board.collide(this.pos) === false &&
        this.pos.dist(GOAL) > 5;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 3, 0, 2 * Math.PI);
    ctx.fill();
  }

  fitness() {
    return 100 / (this.pos.dist(GOAL) * 2);
  }

  giveBaby() {
    const mutatedADN = this.ADN.slice();
    for (let i = 0; i < ADN_SIZE; i++) {
      let rng = Math.random();
      if (rng < genRng) {
        mutatedADN[i] = new Vector2(
          Math.randomRange(-3, 3),
          Math.randomRange(-3, 3)
        );
      }
    }
    return new Entity(mutatedADN);
  }
}
