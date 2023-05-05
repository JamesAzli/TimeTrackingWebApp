import React from 'react'
import {db} from "../../firebase"
 import {auth} from "../../firebase"
import firebase from "firebase/app";
import { collection, getDocs, query, where, collectionGroup } from "firebase/firestore";
import {getAuth,onAuthStateChanged} from "firebase/auth";
import { useState,useEffect } from 'react'

function sampleReport() {

    const [reports, setReports] = useState([]);
    // const [uid, setUid] = useState(null);
    const [displayName, setDisplayName] = useState("");
    

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
      const q = query(colRef, where("name", "==", name));
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
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report) => (
          <tr key={report.id}>
            <td>{report.name}</td>
            <td>{report.location}</td>
            <td>{report.timein}</td>
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
