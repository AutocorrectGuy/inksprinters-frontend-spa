const round = (num:number) => Number(num.toFixed(2))

export type CalculatedType = { coneHeight: number | null; apexAngle: number | null }

export const calculateConeProperties = (diameterTop: number, diameterBottom: number, printHeight: number): CalculatedType => {
  const [rTop, rBottom] = [diameterTop / 2, diameterBottom / 2]
  const rDiff = Math.abs(rTop - rBottom)

  return {
    apexAngle: round(Math.atan(rDiff / printHeight) * (180 / Math.PI)),
    coneHeight: round((Math.sqrt(printHeight ** 2 + rDiff ** 2) * (rTop > rBottom ? rTop : rBottom)) / rDiff),
  }
}
