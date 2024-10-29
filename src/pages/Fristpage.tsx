import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

function FristPage(){
    const nav = useNavigate();
    useEffect(()=>{
        console.log(localStorage.getItem("data"))
        if(localStorage.getItem("data") != null){
            nav("/home");
        }
        else{
            nav("/login");
        }
    },[nav]);
    return <>
    
        <div style={{display : "flex" ,flexDirection : "column"}}>
            Frist Page
        </div>
  
    </>
}
export default FristPage