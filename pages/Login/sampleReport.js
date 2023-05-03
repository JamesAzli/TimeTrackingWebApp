import React from 'react'
import {db} from "../../firebase"
 import {auth} from "../../firebase"
import firebase from "firebase/app";
import {getAuth,onAuthStateChanged} from "firebase/auth";
import { useState,useEffect } from 'react'

function sampleReport() {

    const [reports, setReports] = useState([]);
    const [uid, setUid] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
        return () => {
          unsubscribe();
        };
      }, [auth]);

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = getAuth().currentUser;
            const userId = currentUser.uid;
            const reportsRef = db.collection("Admin-Reports");
            const snapshot = await reportsRef.where("userId", "==", userId).get();
            const reportsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setReports(reportsData);
        };
        fetchData();
      }, []);

  return (
    <div>
      <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>  
          <th>Time In</th>
          <th>Time Out</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report) => (
          <tr key={report.id}>
            <td>{report.name}</td>
            <td>{report.location}</td>
            <td>{report.timeIn}</td>
            <td>{report.timeout}</td>
            <td>{report.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default sampleReport
