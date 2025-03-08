import { useEffect, useState } from "react";
import axios from "axios";
import "./AvaillableBillboards.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;
interface AllBillBoards {
  _id: string;
  billboard_series: string;
  location: string;
  available: boolean;
  campaing?: string;
  client?: string;
}
const AvailableBillBoards = () => {
  const [billBoards, setBillboards] = useState<AllBillBoards[]>([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/billboard/getbillboards`)
      .then((response) => setBillboards(response.data))
      .catch((error) => console.error("Error fetching billboards:", error));
  }, []);

  const unassignedBillboards = billBoards.filter(
    (billboard) => !billboard.campaing || !billboard.client
  );

  return (
    <div className="billboards-container">
      {unassignedBillboards.map((billboard) => (
        <div key={billboard._id} className="billboard-card">
          <div className="billboard-header">
            <h3 className="billboard-title">
              {billboard.billboard_series}
              {(!billboard.campaing || !billboard.client) && (
                <span className="available-text">
                  <span className="available-circle"></span> Available
                </span>
              )}
            </h3>
          </div>
         <span>Location</span> <p className="billboard-location">{billboard.location}</p>
        </div>
      ))}
    </div>
  );
};
export default AvailableBillBoards;
