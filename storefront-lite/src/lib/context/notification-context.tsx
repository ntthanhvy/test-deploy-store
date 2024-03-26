import useToggleState from "@lib/hooks/use-toggle-state"
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

type NotificationContextProps = {
  state: boolean
  open: () => void
  close: () => void
  timedOpen: () => void
}

const NotificationContext = createContext<NotificationContextProps | null>(null)

export const useNotificationContext = () => {
  const context = useContext(NotificationContext)
  if (context === null) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    )
  }
  return context
}

export default function NotificationProvider({ children }: PropsWithChildren) {
  const { state, open, close } = useToggleState()

  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  return (
    <NotificationContext.Provider
      value={{
        state,
        open: openAndCancel,
        close,
        timedOpen,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
