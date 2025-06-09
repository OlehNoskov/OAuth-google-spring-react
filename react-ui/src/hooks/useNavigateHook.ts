import {useNavigate} from "react-router-dom";

const navigate = useNavigate();

export const useNavigateHome = () => {
    navigate('/home');
};