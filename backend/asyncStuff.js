const doAsyncStuffWithCallback = (numero1, numero2, callback) => {
    const resultado = numero1 + numero2
    return setTimeout(() => {
        callback(resultado)
    }, 500)
}   

const doAsyncStuffWithPromises = (numero1, numero2) => {
    const resultado = numero1 + numero2
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(resultado)
        }, 500)
    })
}

doAsyncStuffWithCallback(5, 3, (result) => {
    console.log(result)
})

doAsyncStuffWithPromises(5, 3)
    .then(result => console.log(result))

// OR

const result2 = await doAsyncStuffWithPromises(1, 3)
console.log(result2)