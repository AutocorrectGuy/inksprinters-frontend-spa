import React, { useCallback, useEffect, useRef, useState } from 'react'
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer'
import * as monaco from 'monaco-editor'
import { Editor } from '@monaco-editor/react'
import { getMaxContainerHeight, styles } from '../../../Layouts/MainLayout/config/MainLayout.config'
import Worker from 'web-worker';


type Props = {}

type MonacoType = typeof monaco
const debounce = <F extends (...args: any[]) => void>(func: F, waitFor: number) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

const CodeRunner = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<string>('');
  const [terminalOutput, setTerminalOutput] = useState<string>('');
  const [widths, setWidths] = useState<{ editor: number, terminal: number }>({ editor: 0, terminal: 0 });
  const height = getMaxContainerHeight(window.innerHeight) - styles.breadCrumbHeight

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWidths({
          editor: containerRef.current.clientWidth * 0.7,
          terminal: containerRef.current.clientWidth * 0.3
        });
      }
    };

    // Set initial widths
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const executeCode = (code: string) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    // Basic sanitization - remove common network request functions
    const sanitizedCode = code.replace(/\b(fetch|XMLHttpRequest|axios)\s*\(/g, 'fetchRequest(');

    const workerScript = `
      self.onmessage = function(e) {
        let logOutput = '';
        const originalConsoleLog = console.log;
  
        console.log = (...args) => {
          logOutput += args.join(' ') + '\\n';
        };
  
        self.fetch = () => { throw new Error("Network requests are disabled."); };
        self.XMLHttpRequest = function() { throw new Error("Network requests are disabled."); };
  
        try {
          eval(e.data);
          postMessage({ type: 'success', result: logOutput });
        } catch (error) {
          postMessage({ type: 'error', error: error.message });
        } finally {
          console.log = originalConsoleLog;
        }
      };
    `;

    const worker = new Worker(URL.createObjectURL(new Blob([workerScript], { type: 'application/javascript' })));

    worker.onmessage = (e) => {
      clearTimeout(timeoutId); // Clear the timeout if worker responded
      if (e.data.type === 'success') {
        setTerminalOutput(e.data.result);
      } else {
        setTerminalOutput(`Error: ${e.data.error}`);
      }
      worker.terminate();
    };

    worker.onerror = (e) => {
      clearTimeout(timeoutId); // Clear the timeout if there was an error
      setTerminalOutput(`Worker Error: ${e.message}`);
      worker.terminate();
    };

    worker.postMessage(sanitizedCode);

    // Setup a timeout to terminate the worker from the main thread
    timeoutId = setTimeout(() => {
      worker.terminate();
      setTerminalOutput('Execution timed out (potential infinite loop, 5000ms timeout).');
    }, 5000); // 5-second timeout
  };

  const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: MonacoType) => {
    if (!containerRef.current)
      return

    setWidths({
      editor: containerRef.current.clientWidth * 0.6,
      terminal: containerRef.current.clientWidth * 0.4
    });

    editor.addAction({
      id: 'execute-code',
      label: 'Execute Code',
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      ],
      run: function (ed) {
        executeCode(ed.getValue());
      }
    });

    // Load the stored code from localStorage when the component mounts
    const savedCode = localStorage.getItem('code');
    if (savedCode !== null) {
      editor.setValue(savedCode)
      setInput(savedCode); // Set the saved code into the editor
    }
  };

  /**
   * Localstorage stuff
   */

  const saveCodeToLocalStorage = useCallback((code: string) => {
    localStorage.setItem('code', code);
  }, []);

  const debouncedSave = useCallback(debounce((code: string) => {
    saveCodeToLocalStorage(code);
  }, 500), [saveCodeToLocalStorage]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setInput(value);
      debouncedSave(value);
    }
  };

  return (
    <MainContentContainer h1='JavaScript Code Runner' fullWidth>
      <div ref={containerRef} className="w-full grow">
        {widths.editor !== 0 &&
          <div className='flex w-full grow overflow-hidden'>
            {/* Code editor */}
            <div style={{ width: widths.editor }} className='overflow-hidden'>
              <Editor
                value={input}
                theme="vs-dark"
                language="javascript"
                loading={''}
                onMount={handleEditorMount}
                width='100%' // Editor will take the full width of its container
                height={height}
                onChange={(val) => handleEditorChange(val)}
                options={{
                  fontSize: 17
                }}
              />
            </div>
            {/* Terminal */}
            <div className='leading-5 bg-black/5 whitespace-pre-wrap flex flex-col flex-grow'
              style={{ height: height, width: widths.terminal }}
            >
              <div className='flex items-center justify-start p-2'>
                <button className='w-fit bg-[#723748] hover:bg-[#CA5160] text-white font-semibold text-2xl px-4 py-2 rounded-lg'
                  onClick={() => executeCode(input)}>
                  Run code
                </button>
              </div>

              <pre className='text-[17px] text-[#CFCBC4] whitespace-pre-line overflow-y-auto w-full px-2 pb-2 grow'
              >
                {terminalOutput}
              </pre>
            </div>
          </div>}
      </div>
    </MainContentContainer>
  );
};

export default CodeRunner;