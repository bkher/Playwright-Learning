// @ts-check
import test from "../../lib/basePage.js";

test.describe('Validate lambada test features', () => {

  test.beforeEach('launch the URL', async ( { lambda_homepageFixure })=>{
    await test.step('launch the URL and validate URL', async()=>{
      await lambda_homepageFixure.navigateToUrl();
    })
  })

  test(' validate drag and drop feature', async ({ lambda_homepageFixure }) => {
    await test.step(' drag the element and drop at othr place', async () => {
      await lambda_homepageFixure.dragAndDropFeaure();
    })
  })

  test(' upload a file', async ({ lambda_fileUploadPageFixture }) => {
    await test.step(' upload a file', async () => {
      await lambda_fileUploadPageFixture.bufferMemory();
    })
  })
})
