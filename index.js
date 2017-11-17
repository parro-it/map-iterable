import isIterable from "is-iterable";

/**
 * Creates a new iterable with the results of calling
 * `transform` function on every element in `data` iterable.
 * If you omit the data argument return a unary function that
 * accept the data argument and map over the provided function.
 *
 * @param  {Function} transform - a function that return an element of the new Iterable, receiving as arguments:
 *    .
 *    currentValue - The current element being processed in the iterable.
 *    index - The index of the current element being processed in the iterable.
 * @param  {Iterable} data - The source iterable to iterate over.
 * @return {Iterable} A new Iterable over results of the transform function.
 */
export default function map(transform, data) {
  if (typeof transform !== "function") {
    throw new TypeError("transform argument must be a function.");
  }

  if (typeof data === "undefined") {
    return map.bind(null, transform);
  }

  if (!isIterable(data)) {
    throw new TypeError("data argument must be an iterable.");
  }

  let idx = 0;
  const dataIterator = data[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      const item = dataIterator.next();
      if (!item.done) {
        item.value = transform(item.value, idx++);
      }
      return item;
    }
  };
}
