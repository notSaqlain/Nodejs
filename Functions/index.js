const emptyArray = new Array(1000);

const zeroArray = emptyArray.fill(0);

console.log(zeroArray);

const randomArray = zeroArray.map(_ => Math.floor(Math.random() *1000 ));

const randomArrayV2 = zeroArray.map(() => Math.floor(Math.random() *1000 ));

console.log(randomArray);

