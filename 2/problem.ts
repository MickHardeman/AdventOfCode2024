import { map, split, toSafeInteger } from "lodash";
import fs from "node:fs";

const readInput = () => {
  const rawInput = fs.readFileSync("2/input.txt", "utf8");
  const rawReports = split(rawInput, /\n/g);
  const reports = map(rawReports, (report) =>
    map(report.split(" "), (level) => toSafeInteger(level))
  );

  return reports;
};

const getIsGraduallyChanging = (report: number[]) => {
  let isSafe = true;

  for (let i = 1; i < report.length; i++) {
    const difference = Math.abs(report[i] - report[i - 1]);

    if (difference >= 1 && difference <= 3) {
      continue;
    }

    isSafe = false;
  }

  return isSafe;
};

const getIsSingleDirection = (report: number[]) => {
  const isAscending = report[1] - report[0] > 0;
  let isSafe = true;

  for (let i = 2; i < report.length; i++) {
    const difference = report[i] - report[i - 1];

    if ((difference < 0 && !isAscending) || (difference > 0 && isAscending)) {
      continue;
    }

    isSafe = false;
  }

  return isSafe;
};

const solve2 = () => {
  const reports = readInput();

  let safeReportCount = 0;

  for (let report of reports) {
    if (getIsGraduallyChanging(report) && getIsSingleDirection(report)) {
      safeReportCount++;
      continue;
    }

    for (let i = 0; i < report.length; i++) {
      const slicedLevel = report[i];
      report.splice(i, 1);

      if (getIsGraduallyChanging(report) && getIsSingleDirection(report)) {
        safeReportCount++;
        break;
      }

      report.splice(i, 0, slicedLevel);
    }
  }

  console.log(safeReportCount);
};

export default solve2;
