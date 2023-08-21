import { create } from "zustand"
import { typedLocalStorage } from "$helpers/storage"
import { OpenAPI } from "sdk/core/OpenAPI"
import { User } from "sdk"

export type AuthData = {
  jwt: string
  user: User
}
type AuthStore = {
  user?: User | null
  loading: boolean
  init(): void
  onLogin(data: AuthData): void
  onLogout(): void
}

const initialState: Pick<AuthStore, "loading" | "user"> = {
  user: undefined,
  loading: true
}

const useAuth = create<AuthStore>((set, get) => ({
  ...initialState,
  init: async(): Promise<void> => {
    const sessionToken = typedLocalStorage.getItem("session", "raw")

    if (sessionToken) {
      try {
        // eslint-disable-next-line no-console
        console.log("TRYING TO LOGIN")
        throw "failed"
      } catch (err) {
        get().onLogout()
      }
    } else {
      get().onLogout()
    }
  },
  onLogin: ({ jwt, user }: AuthData): void => {
    OpenAPI.TOKEN = jwt
    typedLocalStorage.setItem("session", jwt)
    set({ user, loading: false })
  },
  onLogout: (): void => {
    OpenAPI.TOKEN = undefined
    typedLocalStorage.removeItem("user")
    typedLocalStorage.removeItem("session")
    set({ user: null, loading: false })
  }
}))

export default useAuth
