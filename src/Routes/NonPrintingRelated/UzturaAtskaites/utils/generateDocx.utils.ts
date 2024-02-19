import { PrintableData } from "../UzturaAtskaites";
import * as DOCX from "docx";
import { PrintableNutritions } from "./totalNutrition.utils";
import { WorkDaySheetName } from "./readingExcel.utils";

const WORKDAY_DISPLAY_NAMES: { [key in WorkDaySheetName]: string } = {
  PIRMDIENA: "Pirmdiena",
  OTRDIENA: "Otrdiena",
  TREŠDIENA: "Trešdiena",
  CETURTDIENA: "Ceturtdiena",
  PIEKTDIENA: "Piektdiena",
  SESTDIENA: "Sestdiena",
  SVĒTDIENA: "Svētdiena",
  "PIRMDIENA 2": "Pirmdiena",
  "OTRDIENA 2": "Otrdiena",
  "TREŠDIENA 2": "Trešdiena",
  "CETURTDIENA 2": "Ceturtdiena",
  "PIEKTDIENA 2": "Piektdiena",
  "SESTDIENA 2": "Sestdiena",
  "SVĒTDIENA 2": "Svētdiena",
};

// Function to generate printable foods paragraphs
function generatePrintableFoods(printableFoods: {
  [key: string]: string;
}): DOCX.Paragraph[] {
  const maxLength = Object.keys(printableFoods).length - 1;
  return Object.entries(printableFoods).map(
    ([key, value], i) =>
      new DOCX.Paragraph({
        children: [
          new DOCX.TextRun({
            text: `${key} `,
            size: "11pt",
            font: "Calibri",
            bold: true,
          }),
          new DOCX.TextRun({
            text: `${value}${i !== maxLength ? "; " : ". "}`,
            size: "11pt",
            font: "Calibri",
          }),
        ],
      })
  );
}

const generateNutritionTable = (
  nutritionData: PrintableNutritions
): DOCX.Table => {
  const tableRows = [
    new DOCX.TableRow({
      children: Object.keys(nutritionData).map(
        (key) =>
          new DOCX.TableCell({
            children: [
              new DOCX.Paragraph({
                children: [
                  new DOCX.TextRun({
                    text: `${key} `,
                    bold: true,
                    size: "11pt",
                    font: "Calibri",
                  }),
                ],
              }),
            ],
            margins: { left: 200 },
          })
      ),
    }),
    new DOCX.TableRow({
      children: Object.values(nutritionData).map(
        (value) =>
          new DOCX.TableCell({
            children: [
              new DOCX.Paragraph({
                children: [
                  new DOCX.TextRun({
                    text: String(value),
                    bold: false,
                    size: "11pt",
                    font: "Calibri",
                  }),
                ],
              }),
            ],
            margins: { left: 200 },
          })
      ),
    }),
  ];

  return new DOCX.Table({
    rows: tableRows,
    columnWidths: [1600, 1600, 1600, 1600],
  });
};

export const createDocument = (printableData: PrintableData): DOCX.Document => {
  let children: (DOCX.Paragraph | DOCX.Table)[] = [];

  Object.entries(printableData).forEach(([sheetName, dayData]) => {
    if (!dayData) return; // Skip undefined dayData

    // Create heading for the sheet name
    const sheetNameHeading = new DOCX.Paragraph({
      children: [
        new DOCX.TextRun({
          text: WORKDAY_DISPLAY_NAMES[sheetName as WorkDaySheetName],
          bold: true,
          size: "11pt",
          font: "Calibri",
          underline: { color: "#000000", type: "single" },
        }),
      ],
    });

    // Generate the elements for printable foods and nutrition table
    const printableFoodsElements = generatePrintableFoods(
      dayData.printableFoods
    );
    const nutritionTableElement = generateNutritionTable(dayData.nutrition);

    // Add week names
    if (sheetName.includes("PIRMDIENA")) {
      const weekNumber = sheetName.includes("2") ? "2" : "1";
      children.push(
        new DOCX.Paragraph({
          children: [
            new DOCX.TextRun({
              text: `${weekNumber}. NEDĒĻA`,
              bold: true,
              size: "14pt",
              font: "Calibri",
            }),
          ],
        })
      );
      // empty row with 11 font size
      children.push(new DOCX.Paragraph({
        children: [new DOCX.TextRun({text: '',size: "11pt"}),],
      }))
    }

    // Add the sheet name heading
    children.push(sheetNameHeading);

    // Add the printable foods elements
    printableFoodsElements.forEach((element) => children.push(element));

    // Add the nutrition table element
    children.push(nutritionTableElement);

    // Add an empty paragraph as a spacer after the table
    children.push(new DOCX.Paragraph({}));
  });

  // Create a single section with all the children
  const doc = new DOCX.Document({
    sections: [
      {
        properties: {},
        children: children,
      },
    ],
  });

  return doc;
};

export const createAndDownloadDocument = async (
  printableData: PrintableData
) => {
  const doc = createDocument(printableData); // Assume createDocument is correctly implemented

  // Use Packer.toBlob for browser environments
  const blob = await DOCX.Packer.toBlob(doc);

  // Create a URL for the blob
  const url = window.URL.createObjectURL(blob);

  // Create a temporary anchor element and trigger a download
  const anchor = document.createElement("a");
  document.body.appendChild(anchor);
  anchor.style.display = "none";
  anchor.href = url;
  anchor.download = "uztura-plans.docx";
  anchor.click();

  // Clean up
  window.URL.revokeObjectURL(url);
  anchor.remove();
};
