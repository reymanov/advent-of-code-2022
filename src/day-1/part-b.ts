import fs from "fs";
import path from "path";

import { quickSort } from "../utils/sorting";

const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");

const grouped = input.split("\n\n").map((x) => x.split("\n"));
const groupedSums = grouped.map((item) => {
  return item.reduce((acc, curr) => acc + parseInt(curr), 0);
});

const topThree = quickSort(groupedSums).slice(-3);
const topThreeSum = topThree.reduce((acc, curr) => acc + curr, 0);

console.log(`Sum of top 3 is equal to: ${topThreeSum} calories`);
