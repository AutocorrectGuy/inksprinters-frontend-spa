import { Editor, useMonaco } from '@monaco-editor/react'
import { useEffect, useRef, useState } from 'react'
import { editor as editorType } from 'monaco-editor'
import { useExcelToTextContext } from '../../../../contexts/ExcelToTextContext'
import { collectForeignCharacters } from '../../../../utils/Encoding/collectForeignCharacters'
import { lineSpacingHandler } from '../../../../utils/OptionsHandlers/lineSpacingHandler'
import { collectDecorations } from './DecorationManager'

const MonacoEditor = () => {
  const { sheetData, setColumnValues, editorText, setEditorText, setForeignChars, selectedCols, appSettings } =
    useExcelToTextContext()

  const [decorations, setDecorations] = useState<string[]>([])
  const [isThemeLoaded, setIsThemeLoaded] = useState(false)
  const [activeTabIndex, setActiveTabIndex] = useState<number>(selectedCols[0])
  const [mounted, setMounted] = useState<boolean>(false)
  const editorRef = useRef<editorType.IStandaloneCodeEditor | null>(null)
  const monaco = useMonaco()

  // Initialize editor on mount
  const onMount = (editor: editorType.IStandaloneCodeEditor) => {
    editorRef.current = editor
    setMounted(true)
  }

  // Load theme and set a flag when it's loaded
  useEffect(() => {
    if (!monaco) return
    import('monaco-themes/themes/GitHub Dark.json').then((data) => {
      monaco.editor.defineTheme('github-dark', data as editorType.IStandaloneThemeData)
      setIsThemeLoaded(true)
    })
  }, [monaco])

  useEffect(() => {
    updateDecorationsAndCollectChars(editorText as string)
  }, [mounted, activeTabIndex, editorText, appSettings])

  // Updates decorations and collect non-Windows-1252 characters
  const updateDecorationsAndCollectChars = (newValue: string) => {
    if (!monaco || !editorRef.current) return

    const foreignChars = collectForeignCharacters(newValue, appSettings.textEncoding)
    setForeignChars(foreignChars)
    setDecorations(editorRef.current.deltaDecorations(decorations, collectDecorations(foreignChars, monaco)))
  }

  // Handles editor text content changes
  const onChange = (val: string) => setEditorText(val)

  const handleTabClick = (tabIndex: number) => {
    setActiveTabIndex(tabIndex)
    setColumnValues(() => sheetData[tabIndex])
    setEditorText(() => lineSpacingHandler(appSettings, sheetData[tabIndex]))
  }

  return (
    <div className="flex-grow">
      {isThemeLoaded ? (
        <div className="flex h-full flex-col">
          <div role="tablist" className="tabs tabs-lifted gap-1">
            {selectedCols.length > 1 &&
              selectedCols.map((i) => (
                <div
                  key={`monaco-tab-index-${i}`}
                  role="tab"
                  className={`tab rounded-tr-[16px] font-bold ${
                    i === activeTabIndex ? 'tab-active bg-purple-800 text-gray-300' : 'bg-base-300'
                  }`}
                  onClick={() => handleTabClick(i)}
                >
                  Column Nº {i + 1}
                </div>
              ))}
          </div>
          <Editor
            value={editorText as string}
            theme="github-dark"
            className="flex-grow"
            loading={''}
            width={'100%'}
            height={'100%'}
            options={{
              minimap: { enabled: false },
            }}
            onMount={onMount}
            onChange={(val) => onChange(val as string)}
          />
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </div>
  )
}

export default MonacoEditor
