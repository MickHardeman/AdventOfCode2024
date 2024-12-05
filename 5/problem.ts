import {
  filter,
  indexOf,
  intersection,
  isEmpty,
  map,
  split,
  times,
  toSafeInteger,
} from "lodash";
import fs from "node:fs";

const readInput = () => {
  const rawInput = fs.readFileSync("5/input.txt", "utf8");
  const [sequenceRules, updates] = map(split(rawInput, /\n\n/g), (section) =>
    split(section, /\n/g)
  );

  return {
    sequenceRules: map(sequenceRules, (rule) =>
      map(split(rule, "|"), toSafeInteger)
    ) as [number, number][],
    updates: map(updates, (update) => map(split(update, ","), toSafeInteger)),
  };
};

const getRelevantRules = (
  update: number[],
  sequenceRules: [number, number][]
) => {
  return filter(
    sequenceRules,
    (rule) => intersection(rule, update).length === 2
  );
};

const fixSequence = (update: number[], rules: [number, number][]) => {
  const sequence: number[] = [];
  const updateCopy = Array.from(update);

  times(updateCopy.length, () => {
    for (const pageNumber of updateCopy) {
      const relevantRules = filter(rules, (rule) => rule[1] === pageNumber);

      if (isEmpty(relevantRules)) {
        sequence.push(pageNumber);

        rules = filter(rules, (rule) => rule[0] !== pageNumber);
        updateCopy.splice(indexOf(updateCopy, pageNumber), 1);
      }
    }
  });

  return sequence;
};

const solve5 = () => {
  const { sequenceRules, updates } = readInput();

  let totalFase1 = 0;
  let totalFase2 = 0;

  for (const update of updates) {
    const relevantRules = getRelevantRules(update, sequenceRules);
    const sequence = fixSequence(update, relevantRules);

    const centerPageNumber = sequence[Math.floor(sequence.length / 2)];

    sequence.toString() === update.toString()
      ? (totalFase1 += centerPageNumber)
      : (totalFase2 += centerPageNumber);
  }

  console.log({ totalFase1, totalFase2 });
};

export default solve5;
