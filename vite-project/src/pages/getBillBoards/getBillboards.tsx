import  { useEffect, useState } from "react";
import AvailableBillBoards from "../AvailableBillBoards/AvailableBillBoards";
import AllBillBoards from "../AllBillBoards/AllBillBoards";
import Loader from "../../components/Loader/Loader"; 
import "./getbillboard.css";  
import apiClient from "../../utils/axiosConfig";

const GetBillBoards = () => {
  const [billboardCount, setBillboardCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBillboardCount = async () => {
      try {
        const response = await apiClient.get("/api/billboard/getbillboards");
        setBillboardCount(response.data.length);

        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } catch (error) {
        console.error("Error fetching billboard count:", error);
        setLoading(false);
      }
    };

    fetchBillboardCount();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2 className="main-heading">Billboards | Total {billboardCount}</h2>
      <AllBillBoards />
      <AvailableBillBoards />
    </div>
  );
};

export default GetBillBoards;
