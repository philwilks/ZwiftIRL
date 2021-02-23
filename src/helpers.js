export const preloadImages = async (srcArray, imageArray) => {
    const promises = await srcArray.map((src) => {
        return new Promise(function (resolve, reject) {
                const img = new Image()
                img.src = src
                img.onload = resolve()
                img.onerror = reject()
                imageArray.push(img)
            }
        )
    })
    await Promise.all(promises)
}