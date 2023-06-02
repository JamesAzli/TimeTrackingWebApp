import React from 'react'
import {db} from "../../firebase"
import {auth} from "../../firebase"
import firebase from "firebase/app";
import { collection, getDocs, query, where, collectionGroup, orderBy } from "firebase/firestore";
import {getAuth,onAuthStateChanged} from "firebase/auth";
import { useState,useEffect } from 'react'

function sampleReport() {

    const [reports, setReports] = useState([]);
    // const [uid, setUid] = useState(null);
    const [displayName, setDisplayName] = useState("");
    // const timeIn = report.data().timein;
    // const timeOut = report.data().timeout;
    // const timeRendered = timeOut - timeIn;
    

     useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setDisplayName(user.displayName);
      } else {
        setDisplayName(null);
    
      }
    });
  }, []);

  

  useEffect(() => {
    const fetchReports = async () => {
      const colRef = collection(db, 'Reports-Admin')
      const name = displayName
      const q = query(colRef, where("name", "==", name), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      const reportsData = querySnapshot.docs.map((doc) =>({
        id: doc.id,
        ...doc.data()
      }));
      setReports(reportsData);
     
    };
    fetchReports();
  }, [displayName]);

 

  return (
    <div>
      <p>user:{displayName}</p>
      {/* <p>{reports}</p> */}
      <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Time In</th>
          <th>Time Out</th>
          <th>Minutes Late</th>
          <th>Date</th>
          <th>Time Rendered</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report) => (
          <tr key={report.id}>
            <td>{report.name}</td>
            <td>{report.location}</td>
            <td>{report.timein}</td>
            <td>{report.timeout}</td>
            <td>{report.lateMinutes}</td>
            <td>{report.date}</td>
            <td>{report.timeOut - report.timeIn}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default sampleReport
