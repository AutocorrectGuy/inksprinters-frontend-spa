import { TextEncodingType } from '../../config/TextEditorSettings'
import { encodingCharSets } from './encodingCharSets'

// Identifies characters in the text that are not part of Windows-1252 encoding
export const collectForeignCharacters = (
  monacoValue: string,
  encoding: TextEncodingType,
): { [key: string]: number[] } => {
  const foreignChars: { [key: string]: number[] } = {}

  // Don't bother checking if encoding is UTF-8
  if (encoding === 'UTF-8') return foreignChars

  // Get the character set for the encoding
  const charSet = encodingCharSets[encoding]

  // Iterate over each line of text and check for foreign characters
  monacoValue.split('\n').forEach((lineText, lineIndex) => {
    for (let char of lineText) {
      if (char === '\n' || char === '\r' || charSet.has(char)) continue

      // Record the line index of the foreign character
      if (Object.keys(foreignChars).includes(char)) {
        if (!foreignChars[char].includes(lineIndex)) {
          // Add the line index to the array of line indexes for the foreign character if it doesn't already exist
          foreignChars[char] = [...foreignChars[char], lineIndex]
        }
      } else {
        foreignChars[char] = [lineIndex]
      }
    }
  })

  return foreignChars
}
