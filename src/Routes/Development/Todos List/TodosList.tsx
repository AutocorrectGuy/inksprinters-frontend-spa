import { useEffect, useState } from 'react'
import MainContentContainer from '../../../Layouts/MainLayout/components/MainLayoutContainer'
import IMG_FLOWER from './flower.jpg'
import { TODOS_ARRAY } from './todosArray'

const todosArrayLen = TODOS_ARRAY.length
const randomEntryIndex = () => Math.floor(Math.random() * todosArrayLen)
const getRandomTodo = () => TODOS_ARRAY[randomEntryIndex()]

const TodosList = () => {
  const [currentTodo, setCurrentTodo] = useState<string>(getRandomTodo())
  useEffect(() => {
    setInterval(() => {
      setCurrentTodo(getRandomTodo())
    }, 10000)
  }, [])

  return (
    <MainContentContainer h1="Todos List">
      <div className="grow relative w-full text-lg flex flex-col items-center justify-center">
        <img className='absolute left-0 h-full blur-lg' src={IMG_FLOWER} />
        <img className='absolute right-0 h-full blur-md' src={IMG_FLOWER} />
        <img className='absolute h-full' src={IMG_FLOWER} />
        <div className='absolute top-0 bottom-0 left-0 right-0 flex items-end justify-center p-10'>
          <div className='text-neutral-200 bg-black/90 text-3xl font-thin rounded-lg px-6 py-3 max-w-sm mb-8'>{currentTodo}</div>
        </div>
      </div>
    </MainContentContainer>
  )
}

export default TodosList
