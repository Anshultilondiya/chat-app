export const getResponse = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('response')
        }, 1000)
    })
}