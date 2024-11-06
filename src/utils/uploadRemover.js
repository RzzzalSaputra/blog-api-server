import fs from "fs"

export const uploadRemover = (fileName) => {
    const path = `./public/uploads/${fileName}`
    fs.unlink(path, (err) => {
        console.log(err)
    })
}