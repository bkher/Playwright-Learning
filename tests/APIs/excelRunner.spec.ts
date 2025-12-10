import { test } from '@playwright/test';
import { ExcelUtils } from '../../lib/ExcelUtils.js';

let ExcelUtil : ExcelUtils;

test('Excel Read & Write Example', async () => {

  ExcelUtil = new ExcelUtils();
  const filePath = 'testData/download.xlsx';


  // Writing into excel
/*  await ExcelUtils.writeExcel(filePath, 'Products', [
    ['ID', 'Product Name', 'Price'],
    [101, 'T-Shirt', 499],
    [102, 'Mobile', 14999],
    [103, 'Shoes', 2999]
  ]); */

  // Reading back the data
  const excelData = await ExcelUtil.readExcel(filePath, 'Sheet1');

  console.log("Data received in test: ", excelData);

  const cellValue = await ExcelUtil.getCellValue(filePath,'Sheet1',3,2);
  console.log('cellValue is : '+cellValue)

  await ExcelUtil.findCellValue(filePath,'Sheet1','New Apple');


  await ExcelUtil.findAndReplace(filePath,'Sheet1','New Apple','New New Apple');

  const newCellValue = await ExcelUtil.getCellValue(filePath,'Sheet1',3,2);
  console.log('new cellValue is : '+newCellValue)


});
