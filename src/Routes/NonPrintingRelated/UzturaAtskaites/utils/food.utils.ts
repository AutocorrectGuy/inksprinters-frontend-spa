import { Cells2d } from "../UzturaAtskaites";
import { hasNumber } from "./utils";

// Column index (from row) that contains the quantity of food (in grams)
const MEAL_QUANTITY_COLUMN_INDEX = 5;

export type MealType =
  | "Brokastis:"
  | "Otrās brokastis:"
  | "Pusdienas:"
  | "Launags:"
  | "Vakariņas:";

type MealRowIndexes = { [key in MealType]?: number };

const MEAL_KEY_WORDS: MealType[] = [
  "Brokastis:",
  "Otrās brokastis:",
  "Pusdienas:",
  "Launags:",
  "Vakariņas:",
];

export type PrintableMealsWithFoods = { [key in MealType]?: string };

export const getMealKeywordRowIndexes = (cells: Cells2d): MealRowIndexes => {
  let indexes: { [key: string]: number } = {};
  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
      let mealName = cells[i][j]?.toString();
      if (!mealName) continue;

      mealName = mealName.replaceAll(`""`, "").trim();
      if (MEAL_KEY_WORDS.includes(mealName as MealType)) {
        indexes[mealName] = i;
        break;
      }
      // stop loop after all meal indexes are collected
      if (Object.keys(indexes).length === 5) break;
    }
  }

  return indexes;
};

export const foodWithQuantity = (mealRow: (string | number)[]): string => {
  let food = mealRow[0] as string; // meal name is allways a string
  food = food.toLowerCase();
  const quantity = mealRow[MEAL_QUANTITY_COLUMN_INDEX] as number;
  
  return hasNumber(food) ? food : `${food} (${quantity} g)`;
};

export const getSingleMealRows = (
  cells: Cells2d,
  mealKeywordRowIndexes: MealRowIndexes,
  mealName: MealType
) => {
  let startRow = mealKeywordRowIndexes[mealName];
  if (typeof startRow !== "number") {
    console.error(`Problem while reading meal ${mealName}`);
    return [];
  } else {
    startRow++; // start directly below the meal name
  }

  let currRow = startRow;
  let foodsRows: (string | number)[][] = [];

  // Continue until an empty cell is encountered or the end of the array is reached
  while (currRow < cells.length) {
    const row = cells[currRow];
    const food = row[0]?.toString();
    if (food && food.length > 0) {
      foodsRows.push(row as (string | number)[]);
    } else {
      // Break the loop if the cell is empty
      break;
    }
    currRow++; // Move to the next row
  }

  return foodsRows; // Return the collected rows
};

export const getMealsWithRows = (
  cells: Cells2d,
  mealKeywordRowIndexes: MealRowIndexes
) => {
  const mealsWithRows: { [key in MealType]?: (string | number)[][] } = {};

  Object.keys(mealKeywordRowIndexes).forEach((mealName) => {
    const rows = getSingleMealRows(
      cells,
      mealKeywordRowIndexes,
      mealName as MealType
    );
    mealsWithRows[mealName as MealType] = rows;
  });

  return mealsWithRows;
};

export const stringifyAllMeals = (mealsData: {
  [key in MealType]?: (string | number)[][];
}) => {
  const temp: { [key in MealType]?: string } = {};

  // Iterate over the specified order of meal keywords
  MEAL_KEY_WORDS.forEach((mealType, i) => {
    const rowsOfFoods = mealsData[mealType];
    
    if (rowsOfFoods) {
      // Only process if rowsOfFoods is not undefined
      temp[mealType] =
        rowsOfFoods.map((foodRow) => foodWithQuantity(foodRow)).join(", ")
    }
  });

  return temp;
};

export const getStringifiedMealsFromSheet = (
  cells: Cells2d
): PrintableMealsWithFoods => {
  const mealKeywordRowIndexes = getMealKeywordRowIndexes(cells);
  const allMealsData = getMealsWithRows(cells, mealKeywordRowIndexes);
  return stringifyAllMeals(allMealsData);
};
