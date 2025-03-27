import AvailableBillBoards from "../AvailableBillBoards/AvailableBillBoards";
import AllBillBoards from "../AllBillBoards/AllBillBoards";
import "./getbillboard.css";  
import axios from "axios";
import { useEffect,useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const GetBillBoards = () => {
  const [billboardCount, setBillboardCount] = useState(0);

  useEffect(()=>{
    const fetchBillboardCount = async()=>{
      try {
        const response = await axios.get(`${BASE_URL}/api/billboard/getbillboards`)
        setBillboardCount(response.data.length);
        console.log(response.data.length)
      }
      catch(error){ 
        console.error("Error fetching billboard count:", error);
      }
    };
    fetchBillboardCount();
  },[])
  return (
    <div>
        <h2 className="main-heading">Billboards |Total {billboardCount}</h2>
     
      <AllBillBoards />
      {/* <h2 className="section-title">Available Billboards</h2> */}
      <AvailableBillBoards />
    </div>
  );
};

export default GetBillBoards;
