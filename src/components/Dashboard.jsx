import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useAuth0();
  
  const [bills, setBills] = useState([]);
  const [billName, setBillName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [receiptFile, setReceiptFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = 'http://localhost:5000/api/bills';

  // Fetch saved bills from MongoDB Atlas on component mount / user login
  useEffect(() => {
    const fetchBills = async () => {
      if (!user?.email) return;
      try {
        const response = await axios.get(`${BACKEND_URL}?email=${user.email}`);
        setBills(response.data);
      } catch (error) {
        console.error('Error fetching bills from backend:', error);
      }
    };

    fetchBills();
  }, [user]);

  // Submit new bill to backend (with optional Dropbox receipt upload)
  const handleAddBill = async (e) => {
    e.preventDefault();
    if (!billName || !amount || !dueDate) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('userEmail', user.email);
      formData.append('name', billName);
      formData.append('amount', amount);
      formData.append('dueDate', dueDate);
      
      if (receiptFile) {
        formData.append('receipt', receiptFile);
      }

      const response = await axios.post(BACKEND_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Add newly saved bill to local state
      setBills([response.data, ...bills]);

      // Reset form input fields
      setBillName('');
      setAmount('');
      setDueDate('');
      setReceiptFile(null);
    } catch (error) {
      console.error('Error saving bill:', error);
      alert('Failed to save bill. Make sure server.js is running!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fcfaf8', display: 'flex', justifyContent: 'center', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      
      {/* Central Card Container matching your design */}
      <div style={{ background: '#ffffff', width: '100%', maxWidth: '750px', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', height: 'fit-content' }}>
        
        {/* Header inside Card */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f3f4f6', paddingBottom: '20px', marginBottom: '30px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#831843', margin: '0 0 4px 0' }}>NOVA</h1>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Smart Bill Reminder</p>
          </div>
          <button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            style={{ background: '#831843', color: '#ffffff', border: 'none', padding: '8px 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
          >
            Logout
          </button>
        </div>

        {/* User Greeting */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 4px 0' }}>Welcome</h3>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{user?.email || user?.name}</p>
        </div>

        {/* Add New Bill Form */}
        <div style={{ marginBottom: '40px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '15px' }}>Add New Bill</h4>
          
          <form onSubmit={handleAddBill} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input
              type="text"
              placeholder="Bill Name"
              value={billName}
              onChange={(e) => setBillName(e.target.value)}
              style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #d1d5db', background: '#ffffff', fontSize: '14px', outline: 'none' }}
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #d1d5db', background: '#ffffff', fontSize: '14px', outline: 'none' }}
              required
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #d1d5db', background: '#ffffff', fontSize: '14px', outline: 'none', color: dueDate ? '#000' : '#9ca3af' }}
              required
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600' }}>Upload Receipt Image (Dropbox)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setReceiptFile(e.target.files[0])}
                style={{ fontSize: '13px', color: '#4b5563' }}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              style={{ background: '#831843', color: '#ffffff', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Saving to Cloud...' : 'Add Bill'}
            </button>
          </form>
        </div>

        {/* Your Bills List */}
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#831843', marginBottom: '15px' }}>Your Bills</h4>
          {bills.length === 0 ? (
            <p style={{ fontSize: '14px', color: '#9ca3af', fontStyle: 'italic' }}>No bills added yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {bills.map((bill) => (
                <div key={bill._id || bill.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <div>
                    <h5 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1f2937' }}>{bill.name}</h5>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      Due: {bill.dueDate} {bill.receiptUrl && `| Receipt Saved to Dropbox`}
                    </span>
                  </div>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#831843' }}>{bill.amount}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;