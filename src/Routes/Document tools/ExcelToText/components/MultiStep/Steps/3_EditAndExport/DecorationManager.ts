const getUniqueValuesFromObjectArrays = <T>(data: Record<string, T[]>): T[] => {
  let uniqueValues = new Set<T>()

  // Add each value to a Set to ensure uniqueness
  for (let values of Object.values(data)) values.forEach((value) => uniqueValues.add(value))

  return Array.from(uniqueValues)
}

export const collectDecorations = (foreignChars: { [key: string]: number[] }, monaco: any) =>
  getUniqueValuesFromObjectArrays(foreignChars).map((lineIndex) => ({
    options: { isWholeLine: true, className: 'bg-red-500' },
    range: new monaco!.Range(lineIndex + 1, 1, lineIndex + 1, 1),
  }))
