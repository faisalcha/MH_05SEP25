'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Pending() {
  const API = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';
  const AUTH = process.env.ADMIN_BEARER || 'Bearer dev';
  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    const res = await axios.get(API + '/v1/admin/workers', { headers: { Authorization: AUTH }});
    setItems(res.data);
  };
  useEffect(()=>{ load(); }, []);

  const verify = async (id: string, approve: boolean) => {
    await axios.post(API + '/v1/admin/workers/' + id + '/verify', { approve }, { headers: { Authorization: AUTH }});
    await load();
  };

  return (
    <div>
      <h1>Pending Workers</h1>
      <table border={1} cellPadding={6}>
        <thead><tr><th>Name</th><th>Phone</th><th>Skills</th><th>CNIC</th><th>Action</th></tr></thead>
        <tbody>
          {items.map((w:any)=>(
            <tr key={w.id}>
              <td>{w.user?.name || '-'}</td>
              <td>{w.user?.phone}</td>
              <td>{w.skills}</td>
              <td>{w.cnicImageUrl ? <a href={w.cnicImageUrl} target="_blank">View</a> : '-'}</td>
              <td>
                <button onClick={()=>verify(w.id, true)}>Approve</button>
                <button onClick={()=>verify(w.id, false)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
