// Day 2 - Rock Paper Scissors
// https://adventofcode.com/2022/day/2

// Rules
// - Rock beats scissors
// - Scissors beats paper
// - Paper beats rock

// Oponent / Me
// A / X : Rock (1 point)
// B / Y : Paper (2 points)
// C / Z : Scissors (3 points)

// Loss (0 points)
// Draw (3 points)
// Win  (6 point)

interface Shape {
    name: string;
    beats: string;
    beatenBy: string;
    points: number;
}

const shapesPlayer: { [key: string]: Shape } = {
    X: {
        name: 'Rock',
        beats: 'C',
        beatenBy: 'B',
        points: 1,
    },
    Y: {
        name: 'Paper',
        beats: 'A',
        beatenBy: 'C',
        points: 2,
    },
    Z: {
        name: 'Scissors',
        beats: 'B',
        beatenBy: 'A',
        points: 3,
    },
};

import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8');

const rounds = input
    .split('\n\n')
    .map(x => x.split('\n'))
    .flat();

const groupedRounds = rounds.map(e => e.split(/\s+/g));

const getResult = (round: string[]) => {
    let points = 0;

    const [oponentShape, playerShape] = round;
    points += shapesPlayer[playerShape].points;

    if (shapesPlayer[playerShape].beats === oponentShape) points += 6;
    else if (shapesPlayer[playerShape].beatenBy === oponentShape) points += 0;
    else points += 3;

    return points;
};

const result = groupedRounds.reduce((acc, round) => {
    const points = getResult(round);
    return acc + points;
}, 0);

console.log("Player's score:", result);
