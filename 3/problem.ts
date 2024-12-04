import { toSafeInteger } from "lodash";
import fs from "node:fs";

const readInput = () => {
  const input = fs.readFileSync("3/input.txt", "utf8");

  return input;
};

const solve3 = () => {
  const input = readInput();
  const mulStatements = input.match(
    /(mul\([0-9]*,[0-9]*\))|(do\(\))|(don't\(\))/g
  )!;

  let total = 0;
  let isEnabled = true;

  for (const mulStatement of mulStatements) {
    if (mulStatement.startsWith("do")) {
      isEnabled = mulStatement === "do()";
      continue;
    } else {
      if (!isEnabled) continue;

      const factors = mulStatement
        .match(/[0-9]+/g)
        ?.map((factor) => toSafeInteger(factor)) as [number, number];

      total += factors[0] * factors[1];
    }
  }

  console.log(total);
};

export default solve3;
