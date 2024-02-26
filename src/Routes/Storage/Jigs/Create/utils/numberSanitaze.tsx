import { JigTemplate } from "../../../../../libraries/dexie/models/jig.model"

type ClampType = { min: number, max: number }

const DEFAULT_CLAMP = { min: 0, max: 999 }

export const INPUT_FIELD_CLAMPS: Partial<{ [key in keyof JigTemplate]: ClampType }> = {
  pageSizeX: { min: 100, max: 800 },
  pageSizeY: { min: 100, max: 640 },
  copies: {min: 0, max: 999}
}

export const clampNumber = (value: number, clamp = DEFAULT_CLAMP) =>
  Math.max(Math.min(value, clamp.max), clamp.min)

// Returns then number from string with regex
export const carveOutNumberValue = (input: string) => {
  if (!input.trim())
    return 0

  const match = /-?\d*\.?\d+/.exec(input)
  if (!match)
    return 0

  const num = parseFloat(match[0])
  if (!isNaN(num) && isFinite(num))
    return num

  return 0
}