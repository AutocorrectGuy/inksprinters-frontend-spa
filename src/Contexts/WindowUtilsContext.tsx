import React, { createContext, ReactNode, useState, useEffect } from 'react'

// Define the context type
type WindowUtilsContextType = {
  isDesktopWidth: boolean
  showSecondRow: boolean
  navbarData: {
    rowTwo: string[]
  }
  windowDimensions: {
    width: number
    height: number
  }
}

// Dummy data to be used in the context
const dummyData = {
  navbar: {
    rowTwo: ['Feed', 'Tracks', 'Sound Kits', 'Publishing', 'Beat ID', 'Gift Cards', 'Lemonaide'],
  },
}

const desktopWidth = 768 // Define desktop width threshold

// Create the context
export const WindowUtilsContext = createContext<WindowUtilsContextType>({
  isDesktopWidth: window.innerWidth >= desktopWidth,
  showSecondRow: true,
  navbarData: dummyData.navbar,
  windowDimensions: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
})

// Context Provider component
type WindowUtilsProviderProps = {
  children: ReactNode
}

export const WindowUtilsProvider: React.FC<WindowUtilsProviderProps> = ({ children }) => {
  const [isDesktopWidth, setIsDesktopWidth] = useState(window.innerWidth >= desktopWidth)
  const [showSecondRow, setShowSecondRow] = useState(true)
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight
      setIsDesktopWidth(newWidth >= desktopWidth)
      setWindowDimensions({ width: newWidth, height: newHeight })
    }
    const handleScroll = () => setShowSecondRow(window.scrollY <= 100)

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <WindowUtilsContext.Provider
      value={{ isDesktopWidth, showSecondRow, navbarData: dummyData.navbar, windowDimensions }}
    >
      {children}
    </WindowUtilsContext.Provider>
  )
}
