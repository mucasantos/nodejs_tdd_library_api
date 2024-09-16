function somar({x,y}) {
    return x+y
}

function subtrair({x,y}) {
    return x-y
}

function aplicaOperacao({numero1, numero2, operacao}) {
    return operacao({x: numero1, y: numero2})
}

console.log(aplicaOperacao({
    numero1:5, numero2:5, operacao:somar
}));
console.log(aplicaOperacao({
    numero1:5, numero2:7, operacao:subtrair
}));

//Closure

function criarMultiplicador(fator){
    return function (numero) {
        return numero * fator
    }
};

const multiplicado1 = criarMultiplicador(2)
const multiplicado2 = criarMultiplicador(5)

console.log(multiplicado1(5));
console.log(multiplicado2(8));
