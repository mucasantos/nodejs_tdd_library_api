function calcularTotalPedido(precoUnitario, quantidade) {
    return precoUnitario * quantidade
}

const totalPedido1 = calcularTotalPedido(20,3)

/**
 * O exemplo acima é facil de entender pois estamos dentro do mesmo arquivo.
 * E se fosse em outro arquivo?
 */

function calcularTotal({precoUnitario, quantidade}) {
    return precoUnitario * quantidade

}

