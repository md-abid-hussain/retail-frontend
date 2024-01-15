import { store } from '../../app/store'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { productsApiSlice } from '../Products/productApiSlice'

const Prefetch = () => {
    useEffect(()=>{
        store.dispatch(productsApiSlice.util.prefetch('getProducts','productList',{force:true}))
    },[])

    return <Outlet/>
}

export default Prefetch