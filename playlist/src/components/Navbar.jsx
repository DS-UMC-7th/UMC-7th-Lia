import { CartIcon } from "../constants/icons";
import { useSelector } from "react-redux";

const Navbar=()=>{
    const {amount}=useSelector((state)=>state.cart)
    return(
        <nav>
            <div>
                <h3>REAL DATA UMC PlayList</h3>
                <div>
                    <CartIcon/>
                </div>
                <div>
                    <p>{amount}</p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar