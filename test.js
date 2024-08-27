const getRndNumber = (row, col) => {
  return Math.floor(Math.random() * 1000);
};

const generateArray = (arrayLength) => {
  const result = [];
  for (let col = 0; col < arrayLength; col++) {
    result.push([]);
    for (let row = 0; row < arrayLength; row++) {
      result[col].push(getRndNumber(row, col));

      while (
        (col > 0 &&
          (result[col][row] < result[col - 1][row] ||
            result[col][row] - result[col - 1][row] > 10)) ||
        (row > 0 &&
          (result[col][row] < result[col][row - 1] ||
            result[col][row] - result[col][row - 1] > 10)) ||
        (col === 0 && row === 0 && result[col][row] > 10)
      ) {
        result[col][row] = getRndNumber(row, col);
      }
    }
  }

  return result;
};

// for printing the array
const fillString = (num) => {
  switch (`${num}`.length) {
    case 1:
      // 234
      return `    ${num}`;
    case 2:
      // 1234
      return `    ${num}`;
    case 3:
      // 234
      return `  ${num}`;
    case 4:
      // 1234
      return `  ${num}`;
    default:
      // -1234
      return num + "";
  }
};

// so its easy to copy paste to notepad to check results
const printArray = (arr, arrayLength) => {
  for (let col = 0; col < arrayLength; col++) {
    let rowstring = "";
    for (let row = 0; row < arrayLength; row++) {
      rowstring = rowstring + `${fillString(arr[col][row])} `;
    }

    console.log(rowstring);
  }
};

// returns location as [col,row]
const lookupO_Of_N = (arr, lookupNum) => {
  let row = 0;
  let col = arr.length - 1;

  while (col > 0 || row < arr.length - 1) {
    counter++;
    counterOofN++;

    if (arr[col][row] === lookupNum) {
      return [col, row];
    }

    if (row < arr.length - 1 && arr[col][row + 1] === lookupNum) {
      return [col, row + 1];
    } else if (col > 0 && arr[col - 1][row] === lookupNum) {
      return [col - 1, row];
    } else {
      let colDecrease = 0;
      let rowIncrease = 0;

      if (row < arr.length - 1 && col > 0 && arr[col - 1][row] < lookupNum) {
        rowIncrease = 1;
      } else if (col === 0 && row < arr.length - 1) {
        rowIncrease = 1;
      }

      if (row < arr.length - 1 && col > 0 && arr[col][row + 1] > lookupNum) {
        colDecrease = 1;
      } else if (col > 0 && row === arr.length - 1) {
        colDecrease = 1;
      }

      col -= colDecrease;
      row += rowIncrease;

      if (colDecrease === 0 && rowIncrease === 0) {
        console.log("the number was not found");
        return;
      }
    }

    if (col === 0 && row === arr.length - 1) {
      console.log("the number was not found");
      return;
    }
  }

  if (arr[col][row] === lookupNum) {
    return [col, row];
  }

  console.log("the number was not found");
  return;
};

let counter = 0;

let counterOofN = 0;
let counterRecursive = 0;

const binarySearch = (arr, lookupNum) => {
  let bottomPos = 0;
  let topPos = arr.length;
  let midPoint = Math.floor((bottomPos + topPos) / 2);

  while (bottomPos < topPos) {
    counter++;
    counterRecursive++;
    midPoint = Math.floor((bottomPos + topPos) / 2);

    if (arr[midPoint] === lookupNum) {
      return midPoint;
    } else if (arr[midPoint] >= lookupNum) {
      topPos = midPoint;
    } else if (arr[midPoint] <= lookupNum) {
      bottomPos = midPoint + 1;
    } else {
      return;
    }
  }
};

const handleDivideAndConquer = (arr, lookupNum) => {
  const result = divideAndConquer(arr, 0, arr.length - 1, lookupNum);

  if (result) {
    return result;
  } else {
    console.log("Searched number was not found!");
  }
};

const divideAndConquer = (arr, bottom, top, lookupNum) => {
  counter++;
  counterRecursive++;

  const midpoint = Math.floor((bottom + top) / 2);
  let res = undefined;

  if (bottom < top) {
    res = divideAndConquer(arr, bottom, midpoint, lookupNum);

    if (!res) {
      res = divideAndConquer(arr, midpoint + 1, top, lookupNum);
    }
  }

  let row = undefined;

  if (!res) {
    row = binarySearch(arr[midpoint], lookupNum);
  }

  if (typeof row === "number") {
    return [midpoint, row];
  } else {
    return res;
  }
};

const main = () => {
  const matrixSize = 50;
  const arr1 = generateArray(matrixSize);
  const arr2 = generateArray(matrixSize);

  const result1 = lookupO_Of_N(arr1, 52);
  const result2 = lookupO_Of_N(arr2, 123);

  console.log("results from O of N:");
  console.log("array 1:", result1);
  console.log("array 2:", result2);

  const recursiveResult1 = handleDivideAndConquer(arr1, 52);
  const recursiveResult2 = handleDivideAndConquer(arr2, 123);

  console.log("results divide and conquer recursion:");
  console.log("array 1:", recursiveResult1);
  console.log("array 2:", recursiveResult2);

  // copy and paste results to notepad for easy viewing
  console.log("arr1:");
  printArray(arr1, matrixSize);

  console.log("arr2:");
  printArray(arr2, matrixSize);
};

main();
