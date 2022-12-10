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
    let exp = fun;
    vars.forEach((v, index) => {
      exp = exp.replaceAll(getVariableNameByIndex(index), `(${v})`);
    });
    const result = eval(exp);
    if (record === null || Math.abs(result) > Math.abs(record)) {
      if (record !== null) {
        diff = Math.abs(Math.abs(result) - Math.abs(record));
      }
      record = result;
    }
  }
  return [vars, record];
};

export const calculateIntegral = (fun, variablesLimit, eps) => {
  let diff = null;
  let record = null;
  let vars = null;
  const space = variablesLimit.map((v) => v.max - v.min).reduce((ac, item) => ac * item, 1);
  const points = [];
  while (diff === null || diff > eps) {
    for (let i = 0; i < 4; i += 1) {
      vars = randomVariableValues(variablesLimit);
      let nfun = fun;
      // eslint-disable-next-line no-loop-func
      vars.forEach((v, index) => (nfun = nfun.replaceAll(getVariableNameByIndex(index), `(${v})`)));
      const res = eval(nfun);
      points.push(res);
    }
    const I = (space / points.length) * points.reduce((ac, item) => ac + item, 0);
    diff = Math.abs(record - I);
    if (record === null) record = I;
    else record = I;
  }
  return [vars, record];
};

const randomVariableValues = (variablesLimit) =>
  variablesLimit.map(({ min, max }) => Math.random() * (max - min) + min);
