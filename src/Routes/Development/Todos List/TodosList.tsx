import React from 'react'
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer'

const TODOS = [
  'Create the TODOs component 😂',
  'Create border for the main container',
  'Design "Center Artwork" page',
  'Implement Main searchbar',
  'Learn about IndexedDB Dexie.js library',
  'Build "Add Article component"',
  'Build "Find Article(s) component"',
  'Implement "dexie.js" search results of articles into searchbar',
  'Resolve the "Refresh" problem'
]

const TodosList = () => {
  return (
    <MainContentContainer h1='Todos List'>
      <div className='p-4 text-lg grow'>
        {TODOS.map((todo, i) => <div className='rounded-lg my-1 px-3 py-2 bg-white/5 w-fit'>{`${i + 1}. ${todo}`}</div>)}
      </div>
    </MainContentContainer>
  )
}

export default TodosList