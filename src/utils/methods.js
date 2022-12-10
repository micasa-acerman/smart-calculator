export const EnumerationMethod = (n, f, comparator) => {
  // eslint-disable-next-line no-bitwise
  const end = 1 << (n + 1);
  let record = null;
  let recordPer = [];
  for (let i = 0; i < end; i += 1) {
    const per = getCombination(i, n).reverse();
    const result = f(per, n);
    console.log(per.join(''), result);
    if (comparator(result, record)) {
      record = result;
      recordPer = per;
    }
  }
  return { record, recordPer };
};

function getCombination(p, n) {
  let per = p;
  const result = [];
  for (let i = 0; i < n; i += 1) {
    result.push(per % 2);
    // eslint-disable-next-line no-bitwise
    per >>= 1;
  }
  return result;
}
