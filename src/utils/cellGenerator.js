export default function cellGenerator(n, m) {
  let arr = [];
  const totalCellsBlocks = n * m;
  let blockade = 0;
  let allowedBlockade = 0.2 * totalCellsBlocks;

  for (let i = 0; i < n; i++) {
    let innerArr = [];
    for (let j = 0; j < m; j++) {
      if (Math.random() < 0.3) {
        innerArr.push(2);
      } else {
        innerArr.push(0);
      }
    }
    arr.push(innerArr);
  }
  return arr;
}
