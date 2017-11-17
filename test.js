/* eslint-disable camelcase */
import test from "ava";
import isIterable from "is-iterable";
import map from ".";

const fixture = [1, 2, 3];
const expected = [2, 4, 6];
const expectedIdx = [0, 1, 2];
const double = n => n * 2;
const indexCb = (_, idx) => idx;

test("return an iterable", t => {
  t.is(isIterable(map(() => null, [])), true);
});

test("apply the callback to every item", t => {
  const results = map(double, fixture);
  t.deepEqual(Array.from(results), expected);
});

test("pass item index to the callback", t => {
  t.deepEqual(Array.from(map(indexCb, fixture)), expectedIdx);
});

test("can be curried", t => {
  const mapDouble = map(double);
  t.deepEqual(Array.from(mapDouble(fixture)), expected);
});

test("throws if data is not iterable", t => {
  const err = t.throws(() => map(double, 42));
  t.is(err.message, "data argument must be an iterable.");
  t.true(err instanceof TypeError);
});

test("throws if callback is not a function nor an object", t => {
  const err = t.throws(() => map(42, []));
  t.is(err.message, "transform argument must be a function.");
  t.true(err instanceof TypeError);
});

test("work with generators", t => {
  const mapDouble = map(double);
  const generator = function*() {
    yield 1;
    yield 2;
    yield 3;
  };
  t.deepEqual([...mapDouble(generator())], expected);
});
