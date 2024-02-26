const trimDecimals = (num:number) => parseFloat((num).toFixed(3));

export const mmToInches = (mm: number): number => trimDecimals(mm * 0.0393700787)
export const inchesToMm = (inches: number): number => trimDecimals(inches * 25.4)
// Helpers
export const strToNumbers = (str:string | undefined | null, count:number) => str && typeof str === 'string'
    ? str.split(' ').map(val => inchesToMm(Number(val))) : [...Array(count)].map((_x) => 0)
