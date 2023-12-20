import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name:'drvlwahhg',
    api_key: '716838172415287',
    api_secert: "jD_SO60NxTd8-WgFFAJnuA8H_g"
})

const uploads = (file, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            file,
            (result) => {
                resolve({
                    public_id: result.public_id,
                    url: result.url,
                })
            },
            {
                resource_type: 'auto',
                folder: folder
            }
        )
    })

}
export { uploads, cloudinary }
