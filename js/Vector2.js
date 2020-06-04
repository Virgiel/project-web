class Vector2 {
  x = 0;
  y = 0;
  // Welcome into my madness

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static ZERO() {
    return new Vector2(0, 0);
  }

  /* ----- Vector operation ----- */

  /** The magnitude square, really fast to calculate should be used when possible */
  magnitude2() {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
  }

  magnitude() {
    return Math.sqrt(this.magnitude2());
  }

  /** Transform the vector so that his magnitude is one */
  normalize() {
    this.div(this.magnitude());
    return this;
  }

  limitMagnitude(limit) {
    let magnitude2 = this.magnitude2();
    if (magnitude2 > limit * limit) {
      this.normalize().mul(limit);
    }
  }

  dist(other) {
    return Math.sqrt(
      Math.pow(this.x - other.x, 2),
      Math.pow(this.y - other.y, 2)
    );
  }

  /* ----- Standard operation -----*/

  add(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  sub(other) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  mul(nb) {
    this.x *= nb;
    this.y *= nb;
    return this;
  }

  div(nb) {
    console.log(nb);
    this.x /= nb;
    this.y /= nb;
    return this;
  }
}
