import {useSelector} from 'react-redux';
import { selectCurrentToken } from '../Features/Auth/authSlice';
import { jwtDecode } from 'jwt-decode';

const useAuth = () =>{
    const token = useSelector(selectCurrentToken);
    if(token){
        const decode = jwtDecode(token);
        const {username} = decode.UserInfo;

        return {username}
    }

    return {username:''}
}

export default useAuth;