import React, { useState, useEffect } from 'react'
import Markdown from 'markdown-to-jsx'
import { connectController as wrapGlobalGameData } from '../../../gameItems'
import { Button, CodeContainer, WindowModal } from '../../../gameItems/components'

const InstructionsWindow = ({
  isOpen,
  globalGameActions,
  setInstructionsWindowVisibility
}) => {
  const initWidth = 700
  const initHeight = initWidth

  const contentFileName = 'InstructionsWindow.md'
  const [fileContent, setFileContent] = useState('')

  useEffect(() => {
    import(`./${contentFileName}`)
        .then(res => {
            fetch(res.default)
                .then(res => res.text())
                .then(res => setFileContent(res))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
  })

  return (
    <WindowModal
      initTop={window.innerHeight * 0.1}
      initLeft={window.innerWidth - (initWidth + 100)}
      initHeight={initHeight}
      initWidth={initWidth}
      backgroundPath='./assets/trimmed/window_trimmed.png'
      dragAreaHeightPercent={12}
      windowTitle='Connection Instructions'
      isOpen={isOpen}
      contentContainerStyle={{ paddingTop: 0 }}
    >
      <div
        className='content'
        style={{
          float: 'left',
          width: '100%',
          height: '100%',
          overflowY: 'scroll',
          overflowX: 'hidden'
        }}
      >
        <div
          style={{
            marginTop: '1%',
            marginBottom: '5%',
            color: '#16DC8C',
            fontFamily: 'Roboto, Arial, Helvetica Neue, Helvetica, sans-serif',
            fontSize: 16
          }}
        >
          <Markdown>{fileContent}</Markdown>
        </div>
        <Button
          className='is-warning'
          onClick={() => {
            globalGameActions.dialog.continueDialog()
            setInstructionsWindowVisibility(false)
          }}
        >
          Done
        </Button>
      </div>
    </WindowModal>
  )
}

export default wrapGlobalGameData(InstructionsWindow)
