import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import { auth } from '../../firebase';
import {getAuth, listUsers} from 'firebase/auth';
function superAdminReps() {

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    async function fetchDocuments() {
      const querySnapshot = await getDocs(collection(db, "Client-Login"));
      const documents = querySnapshot.docs.map((doc) => doc.data());
      const uniqueDocuments = Array.from(new Map(documents.map((doc) => [doc.email, doc])).values());
      setDocuments(uniqueDocuments);
    }
    fetchDocuments();
  }, []);
  
  return (
    <div>
        <h2>Users:</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Display Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document, index) => (
            <tr key={index}>
              <td>{document.email}</td>
              <td>{document.displayName}</td>
              <td>{document.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default superAdminReps;
