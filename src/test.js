function duplicateCount(text) {
  if (text.length === 0) return 0;

  const arr = text.split('');
  const objMap = {};

  arr.forEach(char => {
    let c = char.toLowerCase();
    if (objMap[c]) {
      objMap[c] += 1;
    } else {
      objMap[c] = 1;
    }
  });

  console.log(objMap);

  console.log(typeof objMap);

  if (Object.keys(objMap).length === 0) return 0;

  let res = 0;

  for (const key of Object.keys(objMap)) {
    res += objMap[key];
  }

  return res;
}

console.log(duplicateCount('aabbcde'));
