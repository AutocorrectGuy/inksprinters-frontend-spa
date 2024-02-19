import { Dispatch } from "react";
import { CustomWorkBook, PrintableData } from "../UzturaAtskaites";
import {
  PrintableMealsWithFoods,
  getStringifiedMealsFromSheet,
} from "./food.utils";
import {
  PrintableNutritions,
  findNutritionNamesOneRowAbove,
} from "./totalNutrition.utils";

export type WorkDaySheetName =
  | "PIRMDIENA"
  | "OTRDIENA"
  | "TREŠDIENA"
  | "CETURTDIENA"
  | "PIEKTDIENA"
  | "SESTDIENA"
  | "SVĒTDIENA"
  | "PIRMDIENA 2"
  | "OTRDIENA 2"
  | "TREŠDIENA 2"
  | "CETURTDIENA 2"
  | "PIEKTDIENA 2"
  | "SESTDIENA 2"
  | "SVĒTDIENA 2";

export const WORKDAY_SHEET_NAMES: WorkDaySheetName[] = [
  "PIRMDIENA",
  "OTRDIENA",
  "TREŠDIENA",
  "CETURTDIENA",
  "PIEKTDIENA",
  "SESTDIENA",
  "SVĒTDIENA",
  "PIRMDIENA 2",
  "OTRDIENA 2",
  "TREŠDIENA 2",
  "CETURTDIENA 2",
  "PIEKTDIENA 2",
  "SESTDIENA 2",
  "SVĒTDIENA 2",
];

export const generatePrintableData = (
  wb: CustomWorkBook,
  setPrintableData: Dispatch<React.SetStateAction<PrintableData>>
) => {
  const temp: PrintableData = {};

  WORKDAY_SHEET_NAMES.forEach((sheetName) => {
    const cells = wb[sheetName];
    if (cells) {
      // Explicitly check and initialize temp[sheetName] if it doesn't already exist
      if (temp[sheetName] === undefined) {
        temp[sheetName] = { nutrition: {}, printableFoods: {} };
      }
      temp[sheetName] = {
        printableFoods: getStringifiedMealsFromSheet(cells), // as PrintableMealsWithFoods
        nutrition: findNutritionNamesOneRowAbove(cells) // as PrintableNutritions
      };
    }
  });

  // Update the state with the generated data
  setPrintableData(reorderPrintableData(temp));

  return temp;
};

const reorderPrintableData = (unorderedData: PrintableData): PrintableData => {
  const orderedData: PrintableData = {};

  // Iterate through the correct order of sheet names
  WORKDAY_SHEET_NAMES.forEach((sheetName) => {
    if (unorderedData[sheetName]) {
      // Only copy the data if it exists
      orderedData[sheetName] = unorderedData[sheetName];
    }
  });

  return orderedData;
};