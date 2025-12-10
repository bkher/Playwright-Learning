// @ts-check
import test from '../../lib/basePage.js'


test.describe('download and upload file', ()=>{
    test.only('download and upload file', async ( { downloadUploadPageFixure})=>{
        await downloadUploadPageFixure.launchTheBrowserAndHitUrl();
        await downloadUploadPageFixure.downloadFile()
        await downloadUploadPageFixure.uploadFileonWebsite();
        
    })

    
})
