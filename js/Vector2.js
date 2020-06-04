class Vector2 {
  x = 0;
  y = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static ZERO() {
    return Vector2(0, 0);
  }

  /* ----- Vector operation ----- */

  /** The magnitude square, really fast to calculate should be used when possible */
  magnitude2() {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
  }

  magnitude() {
    return Math.sqrt(this.magnitude2);
  }

  normalize() {
    return self.div(this.magnitude);
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
  }

  sub(other) {
    this.x -= other.x;
    this.y -= other.y;
  }

  mul(nb) {
    this.x *= nb;
    this.y *= nb;
  }

  div(nb) {
    this.x /= nb;
    this.y /= nb;
  }
}

export default Vector2;
