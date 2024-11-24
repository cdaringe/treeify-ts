# @cdaringe/treeify-ts

[treeify](https://github.com/notatestuser/treeify) made TypeScript & Deno friendly.

## Usage

```ts
import { asTree } from "jsr:@cdaringe/treeify-ts";
console.log(
  asTree({
    a: 1,
    b: {
      c: 2,
    },
  })
);
// ├─ a
// └─ b
//    └─ c
```

See [mod.ts](./mod.ts) for further details.
