import { Cells2d } from "../UzturaAtskaites";

export type NutritionType = "OBV" | "Tauki" | "Ogļhidrāti" | "Kcal";
export type PrintableNutritions = { [key in NutritionType]?: string | number };

const NUTRITION_COLUMNS: { [key in NutritionType]: number } = {
  OBV: 6,
  Tauki: 7,
  Ogļhidrāti: 8,
  Kcal: 9,
};

export const findNutritionNamesOneRowAbove = (
  cells: Cells2d
): PrintableNutritions => {
  const result: PrintableNutritions = {};

  Object.entries(NUTRITION_COLUMNS).forEach(([nutritionType, colIndex]) => {
    for (let rowIndex = cells.length - 1; rowIndex > 0; rowIndex--) {
      const cellValue = cells[rowIndex][colIndex]?.toString().trim();

      if (cellValue === nutritionType) {
        const nutritionValue = Number(cells[rowIndex - 1][colIndex]).toFixed(1);
        result[nutritionType as NutritionType] =
          nutritionValue !== null ? nutritionValue : undefined;
        break;
      }
    }
  });

  return result;
};
