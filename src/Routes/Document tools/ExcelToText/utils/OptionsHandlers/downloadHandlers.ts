import { TextEncodingType } from '../../config/TextEditorSettings'

export const handleDownload = async (inputText: string, encoding: TextEncodingType) => {
  try {
    const response = await fetch('/api/download-encoded-text-file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: inputText,
        encoding: encoding,
      }),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    // Getting the blob from the response
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)

    // Creating a temporary link to download the file
    const downloadLink = document.createElement('a')
    downloadLink.href = url
    downloadLink.download = 'download.txt' // You can set a default name or extract it from headers
    document.body.appendChild(downloadLink)
    downloadLink.click()

    // Clean up
    window.URL.revokeObjectURL(url)
    document.body.removeChild(downloadLink)
  } catch (error) {
    console.error('Error during file download:', error)
  }
}
