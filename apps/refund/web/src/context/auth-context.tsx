import { createContext, ReactNode, useEffect, useState } from "react";

type AuthContext = {
  session: UserApiResponse | null
  save: (data: UserApiResponse) => void
  isLoading: boolean
  remove: () => void
}

const LOCAL_STORAGE_KEY = "@refund"

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] =  useState<UserApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  function save(data: UserApiResponse) {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data.user))
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, JSON.stringify(data.token))
    
    setSession(data)
  }

  function remove() {
    setSession(null)

    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`)
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`)

    window.location.assign("/")
  }

  function loadUser() {
    const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`)
    const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`)

    if(user && token) {
      setSession({
        token,
        user: JSON.parse(user),
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    loadUser()
  } , [])

  return (
    <AuthContext.Provider value={{ session, save, isLoading, remove }}>
      {children}
    </AuthContext.Provider>
  );
}
