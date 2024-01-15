import { Outlet } from "react-router-dom";
import { useEffect,useRef,useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import usePersist from "../../hooks/usePersist";


const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)
    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh,{
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
    }]= useRefreshMutation()

    useEffect(()=>{
        if(effectRan.current === true || !import.meta.env.DEV){
            const verifyRefreshToken = async()=>{
                try{
                    await refresh()
                    setTrueSuccess(true)
                }catch(err){
                    console.log(err)
                }
            }

            if(!token && persist) verifyRefreshToken()
        }

        return ()=> effectRan.current = true
        
    // eslint-disable-next-line
    },[])

    let content;

    if(!persist){
        console.log('no persist')
        content = <Outlet/>
    }
    else if(isLoading){
        console.log('loading')
        content = <span className="loading loading-spinner loading-lg text-primary"></span>
    }else if(isError){
        console.log('Error')
        content = (
            <Outlet/>
        )
    }else if(isSuccess && trueSuccess){
        console.log('success')
        content = <Outlet/>
    }else if(token && isUninitialized){
        console.log('token and uninitialized')
        content = <Outlet/>
    }

    return content
}

export default PersistLogin