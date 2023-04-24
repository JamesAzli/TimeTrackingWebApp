import React from 'react'
import firebase from 'firebase/app';
import {db} from '../../firebase'
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

function Reports() {
    const [reports, setReports] = useState([])

    useEffect(() => {
        const fetchReports = async () => {
            const querySnapshot = await getDocs(collection(db, "Reports-Admin"));
            const reportsData = querySnapshot.docs.map((doc) => doc.data());
            setReports(reportsData);
        };
        fetchReports();
      }, []);

  return (
     <div>
      <h1>Reports-Admin Collection</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Time-in</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.name}</td>
              <td>{report.location}</td>
              <td>{report.timein}</td>
              <td>{report.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Reports
