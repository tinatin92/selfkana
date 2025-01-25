import { Navigate } from "react-router-dom"

import { useAtom } from "jotai"
import { PropsWithChildren } from "react"
import { Outlet } from "react-router-dom"
import { userAtom } from "@/store/auth"
import { APP_PATHS } from "@/routes/default/index.enum"

const AuthGuard: React.FC <PropsWithChildren> = ({children}) =>{
    const [user]= useAtom(userAtom)
   

     if(!user) {
          return  <Navigate to={'/' + APP_PATHS.SIGNUP} />
        }


    return children || <Outlet />
}

export default AuthGuard