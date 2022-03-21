import { getVariableNameByIndex } from './variables';

/* eslint-disable no-eval */
export const calculateFunctionRoot = (fun, variablesLimit, eps) => {
  let diff = null;
  let record = null;
  let vars = null;
  while (diff === null || diff > eps) {
    vars = randomVariableValues(variablesLimit);
    let [left, right] = fun.split('=');
    vars.forEach((v, index) => {
      left = left.replaceAll(getVariableNameByIndex(index), `(${v})`);
      right = right.replaceAll(getVariableNameByIndex(index), `(${v})`);
    });
    const lResult = eval(left);
    const rResult = eval(right);
    const result = lResult - rResult;
    if (record === null || Math.abs(result) < Math.abs(record)) {
      if (record !== null) {
        diff = Math.abs(Math.abs(record) - Math.abs(result));
      }
      record = result;
    }
  }
  return [vars, record];
};

export const calculateFunctionExtremum = (fun, variablesLimit, eps) => {
  let diff = null;
  let record = null;
  let vars = null;
  while (diff === null || diff > eps) {
    vars = randomVariableValues(variablesLimit);
    let [left, right] = fun.split('=');
    vars.forEach((v, index) => {
      left = left.replaceAll(getVariableNameByIndex(index), `(${v})`);
      right = right.replaceAll(getVariableNameByIndex(index), `(${v})`);
    });
    const lResult = eval(left);
    const rResult = eval(right);
    const result = lResult - rResult;
    if (record === null || Math.abs(result) > Math.abs(record)) {
      if (record !== null) {
        diff = Math.abs(Math.abs(result) - Math.abs(record));
      }
      record = result;
    }
  }
  return [vars, record];
};

export const calculateIntegral = (fun, variablesLimit, iterations, ylimit) => {
  let vars = null;
  const square =
    variablesLimit.map(({ min, max }) => max - min).reduce((partialSum, a) => partialSum * a, 1) *
    (ylimit.max - ylimit.min);
  let k = 0;
  for (let i = 0; i < iterations; i += 1) {
    let nfun = fun;
    vars = randomVariableValues([...variablesLimit, ylimit]);
    vars.forEach((v, index) => {
      nfun = nfun.replaceAll(getVariableNameByIndex(index), `(${v})`);
    });
    const r = eval(nfun);
    if (r >= vars[vars.length - 1]) k += 1;
  }
  const p = k / iterations;
  return square * p;
};

const randomVariableValues = (variablesLimit) =>
  variablesLimit.map(({ min, max }) => Math.random() * (max - min) + min);
