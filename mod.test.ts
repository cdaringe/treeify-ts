import { assertSnapshot } from "@std/testing/snapshot";
import { asTree } from "./mod.ts";
import { assert } from "@std/assert";

Deno.test({
    name: 'basic tree',
    fn(t) {
        const obj = {
            a: 1
        };
        const tree = asTree(obj);
        assertSnapshot(t, tree)
    }
})

Deno.test({
  name: 'nested tree',
  fn(t) {
      const obj = {
          a: 1,
          b: {
              c: 2
          }
      };
      const tree = asTree(obj);
      assertSnapshot(t, tree)
  }
})

Deno.test({
  name: 'self-referential tree',
  fn(t) {
    const b = { c: 2, z: 'z' };
      const obj = {
          a: 1,
          b: b,
          d: b
      };
      const tree = asTree(obj);
      assertSnapshot(t, tree)
  }
})

Deno.test({
  name: 'multi-type tree',
  fn(t) {
      const obj = {
          a: 1,
          b: 'b',
          c: {
            d: true,
            e: null,
          }
      };
      const tree = asTree(obj);
      assertSnapshot(t, tree)
  }
})

Deno.test({
  name: 'show values tree',
  fn(t) {
      const obj = {
          a: 1,
          b: 'b',
          c: {
            d: true,
            e: null,
          }
      };
      const tree = asTree(obj, true);
      assertSnapshot(t, tree)
  }
})


Deno.test({
  name: 'snapshot-bug-add-frivolous-test-to-force-all-serialized',
  fn(_t) {
    assert(true)
  }
})
