import { map, reduce, split, sum, toSafeInteger } from "lodash";
import fs from "node:fs";

const readInput = () => {
  const rawLocationIds = fs.readFileSync("1/input.txt", "utf8");
  const locationIds = split(rawLocationIds, /\s+/g);

  const [list1, list2] = reduce<string, [number[], number[]]>(
    locationIds,
    (prev, curr, index) => {
      prev[index % 2].push(toSafeInteger(curr));
      return prev;
    },
    [[], []]
  );

  return {
    list1,
    list2,
  };
};

const sortLocations = (list: number[]) => {
  return list.sort((a, b) => a - b);
};

const getTotalDistance = (list1: number[], list2: number[]) => {
  return sum(
    map(list1, (locationId, index) => {
      return Math.abs(locationId - list2[index]);
    })
  );
};

const getSimilarityScore = (list1: number[], list2: number[]) => {
  let similarityScore = 0;

  const countOccurrences = (list: number[], value: number) => {
    if (list.indexOf(value) === -1) return 0;

    return list.lastIndexOf(value) - list.indexOf(value) + 1;
  };

  for (let value of list1) {
    const rightCount = countOccurrences(list2, value);

    similarityScore += value * rightCount;
  }

  return similarityScore;
};

const solve1 = () => {
  const { list1, list2 } = readInput();
  const [list1Sorted, list2Sorted] = [
    sortLocations(list1),
    sortLocations(list2),
  ];

  const totalDistance = getTotalDistance(list1Sorted, list2Sorted);
  const similarityScore = getSimilarityScore(list1Sorted, list2Sorted);

  console.log({ totalDistance, similarityScore });
};

export default solve1;
