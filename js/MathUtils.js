/**
 * Hand made math utils
 */

/** Generate a random number number in the range [min, max[ */
Math.randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

/** Generate a random boolean */
Math.randomBool = () => {
  return Math.random() > 0.5;
};
