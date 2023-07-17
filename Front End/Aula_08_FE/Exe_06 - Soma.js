// Criação dos arrays 
let array_1 = [];
let array_2 = [];
let res = [];

// For para a criação de números aleatórios nos arrays
for(let i = 0; i < 10; i++){
    array_1.push(Math.ceil(Math.random()*100));
    array_2.push(Math.ceil(Math.random()*100));
}

// For para soma de elemento por elemento, com impressão do resultado
for(let i = 0; i < array_1.length; i++){
    res[i] = array_1[i] + array_2[i];
    console.log(`Posição ${i} -> ${array_1[i]} + ${array_2[i]} = ${res[i]}`);
}
