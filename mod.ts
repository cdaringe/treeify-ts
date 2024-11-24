function makePrefix(key: string| boolean, last: boolean) {
  let str = last ? "└" : "├";
  if (key) {
    str += "─ ";
  } else {
    str += "──┐";
  }
  return str;
}


function growBranch(
  key: string,
  root: JSONObject,
  last: boolean,
  lastStates: [JSONObject, JSONValue][],
  showValues: boolean,
  callback: (line: string) => void,
) {
  let line = ""
  let index = 0
  let lastKey: boolean
  let circular: boolean | undefined = undefined
  const lastStatesCopy = lastStates.slice(0);

  if (lastStatesCopy.push([root, last]) && lastStates.length > 0) {
    // based on the "was last element" states of whatever we're nested within,
    // we need to append either blankness or a branch to our line
    lastStates.forEach(function (lastState, idx) {
      if (idx > 0) {
        line += (lastState[1] ? " " : "│") + "  ";
      }
      if (!circular && lastState[0] === root) {
        circular = true;
      }
    });

    // the prefix varies based on whether the key contains something to show and
    // whether we're dealing with the last element in this collection
    line += makePrefix(key, last) + key;

    // append values and the circular reference indicator
    showValues &&
      ((root == null || typeof root !== "object") || root instanceof Date) &&
      (line += ": " + root);
    circular && (line += " (circular ref.)");

    callback(line);
  }

  // can we descend into the next item?
  if (!circular && typeof root === "object") {
    const keys = Object.keys(root ?? {});
    keys.forEach(function (branch) {
      // the last key is always printed with a different prefix, so we'll need to know if we have it
      lastKey = ++index === keys.length;

      // hold your breath for recursive action
      growBranch(
        branch,
        root[branch] as JSONObject,
        lastKey,
        lastStatesCopy,
        showValues,
        callback,
      );
    });
  }
}

/**
 * Outputs the tree line-by-line, calling the lineCallback when each one is available.
 */
export const asLines = function (obj: JSONObject, showValues?: boolean): string[] {
const lines: string[] = [] ;
  growBranch(
    ".",
    obj,
    false,
    [],
    Boolean(showValues),
    line => lines.push(line),
  );
  return lines;
};

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

interface JSONObject {
  [key: string]: JSONValue;
}
interface JSONArray extends Array<JSONValue> {}

/**
 * Outputs the entire tree, returning it as a string with line breaks.
 */
export const asTree = function (obj: JSONObject, showValues?: boolean): string {
  let tree = "";
  growBranch(".", obj, false, [], Boolean(showValues), function onLine (line) {
    tree += line + "\n";
  });
  return tree;
};
