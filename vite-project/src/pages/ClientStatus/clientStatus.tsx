import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './clientStatus.css';

interface Client {
  _id: string; 
  client_name: string;
  client_email: string;
  company_name: string;
  additional_companies: string[];
  address: string;
  contact: string;
}

const ClientTable: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const apiEndpoint = `${BASE_URL}/api/client/getclients`;

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        if (Array.isArray(response.data.data)) {
          setClients(response.data.data);
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        setError('Failed to fetch client data');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleEdit = (client: Client) => {
    console.log(`Editing client with ID: ${client._id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!Array.isArray(clients)) {
    return <div>Unexpected data format</div>;
  }

  return (
    <div className="table-container">
      <h1>Client List</h1>
      <table>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Client Email</th>
            <th>Company Name</th>
            <th>Additional Companies</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td>{client.client_name}</td>
              <td>{client.client_email}</td>
              <td>{client.company_name}</td>
              <td>{client.additional_companies.join(', ')}</td>
              <td>{client.address}</td>
              <td>{client.contact}</td>
              <td>
                <button onClick={() => handleEdit(client)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
