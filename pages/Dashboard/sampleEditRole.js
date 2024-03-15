import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { auth } from '../../firebase';
import { getAuth, listUsers } from 'firebase/auth';
import {
  collection,
  updateDoc,
  setDoc,
  getDocs,
  doc
} from "firebase/firestore";

async function fetchDocuments(setDocuments) {
  const querySnapshot = await getDocs(collection(db, "Client-Login"));
  const documents = querySnapshot.docs.map((doc) => doc.data());
  const uniqueDocuments = Array.from(new Map(documents.map((doc) => [doc.uid, doc])).values());
  setDocuments(uniqueDocuments);
}

function SuperAdminReps() {
  const [documents, setDocuments] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});

  useEffect(() => {
    fetchDocuments(setDocuments);
  }, []);

  const handleEditRole = async (uid) => {
    const userRef = doc(db, 'Client-Login', uid);
    await updateDoc(userRef, { role: selectedRoles[uid] });
    await fetchDocuments(setDocuments);
  };

  const handleRoleChange = (e, uid) => {
    const updatedRoles = { ...selectedRoles, [uid]: e.target.value };
    setSelectedRoles(updatedRoles);
  };

  return (
    <div>
      <h2>Users:</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Display Name</th>
            <th>Role</th>
            <th>Edit Role</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document, index) => (
            <tr key={index}>
              <td>{document.email}</td>
              <td>{document.displayName}</td>
              <td>{document.role}</td>
              <td>
                <select
                  value={selectedRoles[document.uid] || ""}
                  onChange={(e) => handleRoleChange(e, document.uid)}
                >
                  <option value="">Select Role</option>
                  <option value="Employee">Employee</option>
                  <option value="Admin">Admin</option>
                </select>
                <button onClick={() => handleEditRole(document.uid)}>Edit Role</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SuperAdminReps;