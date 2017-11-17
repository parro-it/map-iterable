import isIterable from "is-iterable";

function initDefault(data) {
  return data;
}

export default function map(options, data) {
  if (typeof data === "undefined") {
    return map.bind(null, options);
  }

  if (
    typeof options !== "function" &&
    (typeof options !== "object" || options === null)
  ) {
    throw new TypeError(
      "Callback argument must be a function or option object"
    );
  }

  if (!isIterable(data)) {
    throw new TypeError("Data argument must be an iterable");
  }

  let idx = 0;

  const init = options.init || initDefault;
  const callback = options.callback || options;

  const ctx = init(data);
  const dataIterator = data[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      const item = dataIterator.next();
      if (!item.done) {
        item.value = callback(item.value, idx++, ctx);
      }
      return item;
    }
  };
}
