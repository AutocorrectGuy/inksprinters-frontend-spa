export type TextWrapType = boolean
export type LineSpacingType = 'none' | 'single'

// Allowed encodings from `iconv` (from Laravel/php) package:
export type SpecialTextEncodingType = 'Windows-1252'
export type TextEncodingType = SpecialTextEncodingType | 'UTF-8'

export type AppSettingsType = {
  textWrap: TextWrapType
  lineSpacing: LineSpacingType
  textEncoding: TextEncodingType
}

export const initialSettings: AppSettingsType = {
  textWrap: false, // Checkbox state
  lineSpacing: 'none', // Toggle between 'none' and 'single'
  textEncoding: 'Windows-1252', // Default encoding type
}

export const textEditorInitialOptions: {
  textWrap: boolean
  lineSpacing: LineSpacingType[]
  textEncoding: TextEncodingType[]
} = {
  textWrap: false,
  lineSpacing: ['none', 'single'],
  textEncoding: ['Windows-1252', 'UTF-8'],
}

export const loadSettings = () => {
  const saved = localStorage.getItem('excel-to-text-settings')
  return saved ? JSON.parse(saved) : initialSettings
}
