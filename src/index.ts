/* eslint-disable no-console */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import { spawnSync, SpawnSyncReturns } from 'child_process';

type Calculation = (x: number) => number;

const sleep = (ms: number): SpawnSyncReturns<string> =>
  spawnSync(process.argv[0], ['-e', `setTimeout(function(){},${ms})`]);

class Cacher {
  private _calculation: Calculation;

  private _value: number = null;

  constructor(calculation: Calculation) {
    this._calculation = calculation;
  }

  value(arg: number): number {
    if (this._value !== null) {
      return this._value;
    }
    const v = this._calculation(arg);
    this._value = v;
    return v;
  }
}

const generateWorkout = (intensity: number, randomNumber: number): void => {
  const expensiveResult = new Cacher(num => {
    console.log('calculating slowly...');
    sleep(2000);
    return num;
  });
  if (intensity < 25) {
    console.log(`Today, do ${expensiveResult.value(intensity)} pushups!`);
    console.log(`Next, do ${expensiveResult.value(intensity)} situps!`);
  } else if (randomNumber === 3) {
    console.log('Take a break today! Remember to stay hydrated!');
  } else {
    console.log(`Today, run for ${expensiveResult.value(intensity)} minutes!`);
  }
};

const simulatedUserSpecifiedValue = 10;
const simulatedRandomNumber = 7;
generateWorkout(simulatedUserSpecifiedValue, simulatedRandomNumber);
