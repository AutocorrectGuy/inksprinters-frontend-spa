import { AppSettingsType } from '../../config/TextEditorSettings'

//
export const lineSpacingHandler = (settings: AppSettingsType, cellsArray: string[]) => {
  const lineSpacing = settings.lineSpacing !== 'none' ? 2 : 1
  return settings.textWrap
    ? cellsArray.map((cell) => cell.toString().replace(/[\r\n]+/g, ' ')).join('\n'.repeat(lineSpacing))
    : cellsArray.join('\n'.repeat(lineSpacing))
}
