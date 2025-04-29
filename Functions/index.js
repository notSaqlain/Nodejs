const emptyArray = new Array(1000);

const zeroArray = emptyArray.fill(0);

//console.log(zeroArray);

const randomArray = zeroArray.map(_ => Math.floor(Math.random() *1000 ));

const randomArrayV2 = zeroArray.map(() => Math.floor(Math.random() *1000 ));
//console.log(randomArray);



const rand = () => Math.floor(Math.random() * 1000);
const randomArrayV3 = zeroArray.map(rand);

console.log(randomArrayV3);

//filtro che ottiene elementi pari e maggiori di 500
const item1 = randomArrayV3.filter((item) => item % 2 === 0 && item > 500);
console.log("filter 1: ",item1);

//filtro che ottiene gli elementi divisibili per 3 e minori di 50
const item2 = randomArrayV3.filter(item => item % 3 === 0 && item < 50);
console.log("filter 2: ",item2);



//scrvivere una funzione che genera un array di dimensione N e ogni elemento ha valore iniziale M (N e M sono passati come argomenti)
const arrayGenerator = (N, M) => new Array(N).fill(M);

function arrayGenerator(N, M) { //modo equivalente di riscrivere la funzione
    return new Array(N).fill(M);
}


//ATTENZIONE I PARAMETRI POSSONO AVERE VALORE A PIACERE DANDO VITA A COMPORTAMENTI STRANI
//console.log("generator: ", arrayGenerator(5, 10));
//console.log("generator: ", arrayGenerator("hello", "Ciao"))


//riscrivo i due filtri sottoforma di funzione
const even500 = (arr) => arr.filter(item => item % 2 === 0 && item > 500);
const odd50 = (arr) => arr.filter(item => item % 3 === 0 && item < 50);

console.log("Filter 1: ", odd50(randomArrayV3));

//applico entrambi i filtri
const filteredEven500 = even500(randomArrayV3);
const filteredOdd50 = odd50(randomArrayV3);

const alwaysEmpty = (array) => array.filter((item) => item === 0);
