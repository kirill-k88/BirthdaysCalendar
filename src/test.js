function pickPeaks(arr) {
  console.log(arr);
  const posArr = [];
  const peakArr = [];

  let localMax = [0, 0];
  let localMin = 0;

  arr.forEach((item, index) => {
    /*if(item > localMax[0]){
      localMax[0] = item;
      localMax[1] = index;
    }
    if(item < localMax[0]){
      if(localMax[1] !== 0){
        peakArr.push(localMax[0]);
        posArr.push(localMax[1]);
        localMax[0] = 0;
        localMax[1] = 0;
      }
      localMin = item;*/

    if (item > arr[index - 1] && item > arr[index + 1]) {
      peakArr.push(item);
      posArr.push(index);
      localMax[0] = null;
    }
    if (item > arr[index - 1] && item === arr[index + 1]) {
      localMax[0] = item;
      localMax[1] = index;
    }
    if (item < arr[index - 1] && localMax[0] !== null) {
      peakArr.push(localMax[0]);
      posArr.push(localMax[1]);
      localMax[0] = null;
    }
  });
  console.log(posArr, peakArr);
  return { pos: posArr, peaks: peakArr };
}

console.log(
  pickPeaks([
    1, 0, 11, 8, 11, 15, 5, 9, 6, 15, 6, 0, -1, 0, 0, 0, -3, -1, 13, 15, 0, 6, -2, 13, 2, 4, 9, 1,
    12, -1, 4, 14, 0, -2, 10, 0, 15, 11, 4, -1, -1, 8, 6, 7, 3, 6, 5, 0
  ])
);

//2, 5, 7, 9, 19, 21, 23, 26, 28, 31, 34, 36, 41, 43, 45
//2, 5, 7, 9, 13, 19, 21, 23, 26, 28, 31, 34, 36, 41, 43, 45
