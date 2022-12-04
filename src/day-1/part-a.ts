import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");

const grouped = input.split("\n\n").map((x) => x.split("\n"));
const groupedSums = grouped.map((item) => {
  return item.reduce((acc, curr) => acc + parseInt(curr), 0);
});

const max = Math.max(...groupedSums);

console.log(`Elf ${groupedSums.indexOf(max)} has most calories: ${max}`);
