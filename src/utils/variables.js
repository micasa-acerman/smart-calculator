export const getVariableNames = (variablesCount) =>
  new Array(variablesCount).fill(0).map((v, i) => getVariableNameByIndex(i));

export const getVariableNameByIndex = (index) => `x${index + 1}`;
