import { Editor } from '@monaco-editor/react'
import { useState } from 'react'
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer'
import { getMaxContainerHeight } from '../../../Layouts/MainLayout/config/MainLayout.config'

const Monaco = () => {
  const [editorText, setEditorText] = useState<string>('hello world')

  return (
    <MainContentContainer h1='Monaco text editor'>

      <div className="flex w-full max-w-7xl grow flex-col overflow-hidden">
        <div className="flex h-full flex-col overflow-hidden">
          <Editor
            value={editorText as string}
            theme="vs-dark"
            className='grow h-full overflow-hidden'
            language="markdown"
            loading={''}
            width={'100%'}
            height={getMaxContainerHeight(window.innerHeight)}
            onChange={(val) => setEditorText(val as string)}
          />
        </div>
      </div>
    </MainContentContainer>
  )
}

export default Monaco
