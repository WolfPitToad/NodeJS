
const fs=require('node:fs/promises')
const path=require('node:path')
const folder=process.argv[2] ?? '.'

async function ls (folder){
    let files
    try{
        files= await fs.readdir(folder)
    } catch{
        console.error(`No se pudo leer archivo', ${folder}`)
        process.exit(1)
    }

    const filePromises=files.map(async file=>{
        
        const filePath=path.join(folder,file)
        let stats
        try{
            stats= await fs.stat(filePath)
        } catch{
            console.error(`No se pudo leer el archivo ${filePath}`)
            process.exit(1)
        }

        const isDir = stats.isDirectory()
        const fileType = isDir ? 'd': 'f'
        const fileSize = stats.size

        return `${fileType} ${file} ${fileSize.toString()}`
    })
    const filesInfo = await Promise.all(filePromises)
    filesInfo.forEach(fileInfo=>console.log(fileInfo))
}


ls(folder)
    // .then(files =>{
    //     files.forEach(file=> {
    //         const filePath= path.join(folder,file)
    //         fs.stat(filePath)
    //     })
    // })
    // .catch(err=>{
    //     if(err){
    //         console.error('Error al leer',err)
    //         return;
    //     }
    // })    
