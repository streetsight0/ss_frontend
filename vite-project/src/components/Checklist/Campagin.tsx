import React, { useState, useEffect } from 'react';
import Checklist from './Checkbox';
import apiClient from '../../utils/axiosConfig';
import Loader from "../../components/Loader/Loader";

const App: React.FC = () => {
  const [, setSelectedItems] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get("/api/billboard/getbillboards")
      .then((response) => {
        const fetchedItems = response.data.map(
          (billboard: { billboard_series: string; location: { name: string } }) =>
            `${billboard.billboard_series} - ${billboard.location.name}`
        );
        setItems(fetchedItems);
        setIsLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch data');
        setIsLoading(false);
        console.error('Error fetching billboards:', error);
      });
  }, []);

  const handleSelectionChange = (selected: string[]) => {
    setSelectedItems(selected);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Checklist items={items} onSelectionChange={handleSelectionChange} />
    </div>
  );
};

export default App;
