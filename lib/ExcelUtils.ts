import ExcelJS from 'exceljs';

export class ExcelUtils {

  // Write data to Excel file
 async writeExcel(
    filePath: string,
    sheetName: string,
    data: Array<Array<string | number>>
  ) {
    const workbook = new ExcelJS.Workbook();

    // Load File if exists otherwise create a new one
    try {
      await workbook.xlsx.readFile(filePath);
    } catch (err) {
      console.log("⚠️ File not found — creating new Excel:", filePath);
    }

    // Get or Create Sheet
    let sheet = workbook.getWorksheet(sheetName);
    if (!sheet) {
      sheet = workbook.addWorksheet(sheetName);
    }

    // Find next empty row index
    const nextEmptyRow = (sheet.lastRow?.number || 0) + 1;

    // Add rows to sheet
    data.forEach((row, index) => {
      const rowPosition = nextEmptyRow + index;
      sheet.getRow(rowPosition).values = row;
    });

    await workbook.xlsx.writeFile(filePath);
    console.log(`📌 Excel updated successfully: ${filePath}`);
  }

  // Read data from Excel file & return it
  async readExcel(filePath: string, sheetName: string) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const sheet = workbook.getWorksheet(sheetName);
    const rowData: any[] = [];

    sheet?.eachRow((row) => {
      const rowValues: any[] = [];
      row.eachCell((cell) => {
        rowValues.push(cell.value);
      });
      rowData.push(rowValues);
    });

    console.log("Excel data:", rowData);
    return rowData;
  }


   async getCellValue(filePath: string, sheetName: string, row: number, col: number): Promise<string> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const sheet = workbook.getWorksheet(sheetName);
    const cellValue = sheet?.getRow(row).getCell(col).value;

    console.log(`📌 Value From Excel (R${row},C${col}):`, cellValue);
    return cellValue?.toString() || '';
  }

   async findCellValue(
    filePath: string,
    sheetName: string,
    searchValue: string
  ): Promise<{ row: number; col: number; value: string } | null> {

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const sheet = workbook.getWorksheet(sheetName);
    if (!sheet) {
      throw new Error(`Sheet: ${sheetName} not found!`);
    }

    for (let r = 1; r <= sheet.rowCount; r++) {
      const row = sheet.getRow(r);

      for (let c = 1; c <= row.cellCount; c++) {
        const cellValue = row.getCell(c).value;

        if (cellValue?.toString().trim() === searchValue.trim()) {
          console.log(
            `✔ Match Found: Row ${r}, Column ${c}, Value "${cellValue}"`
          );
          return { row: r, col: c, value: cellValue.toString() };
        }
      }
    }

    console.log(`❌ Value "${searchValue}" not found in Sheet: ${sheetName}`);
    return null;
  }


   async findAndReplace(
    filePath: string,
    sheetName: string,
    oldValue: string,
    newValue: string
  ): Promise<boolean> {

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const sheet = workbook.getWorksheet(sheetName);
    if (!sheet) {
      throw new Error(`Sheet: ${sheetName} not found!`);
    }

    let replaced = false;

    sheet.eachRow((row) => {
      row.eachCell((cell) => {
        const cellText = cell.value?.toString().trim();

        if (cellText === oldValue.trim()) {
          console.log(`🔄 Replacing "${oldValue}" ➜ "${newValue}"`);
          cell.value = newValue; // Replace value
          replaced = true;
        }
      });
    });

    if (replaced) {
      await workbook.xlsx.writeFile(filePath);
      console.log("✔ Excel updated successfully!");
    } else {
      console.log(`⚠ No match found for: "${oldValue}"`);
    }

    return replaced;
  }

}
