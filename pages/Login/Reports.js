import React from 'react'
import firebase from 'firebase/app';
import {db} from '../../firebase'
import {auth} from "../../firebase"
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";

function Reports() {
    const [reports, setReports] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [orderByField, setOrderByField] = useState("name");
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
            const querySnapshot = await getDocs(collection(db, "Reports-Admin"));
            const reportsData = querySnapshot.docs.map((doc) => doc.data());
            setReports(reportsData);
        };
        fetchReports();
      }, []);

      const filteredReports = reports.filter(report =>
        report.name && report.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

      const fetchSortedReports = async (q) => {
        const querySnapshot = await getDocs(q);
        const reportsData = querySnapshot.docs.map((doc) => doc.data());
        setReports(reportsData);
      };

      const handleOrderByChange = (event) => {
        const selectedValue = event.target.value;
        setOrderByField(selectedValue);
        if (selectedValue === "name") {
          const sortName = query(collection(db, "Reports-Admin"), orderBy("name", "asc"));
          fetchSortedReports(sortName);
        } else if (selectedValue === "date") {
          const sortDate = query(collection(db, "Reports-Admin"), orderBy("date", "desc"));
          fetchSortedReports(sortDate);
        }
      };

      

      // useEffect(() => {
      //   const q = query(
      //     collection(db, "Reports-Admin"),
      //     where("name", "==", displayName),
      //     where("date", ">=", startDate),
      //     where("date", "<=", endDate),
      //     orderBy(orderByField, 'desc'),
      //   );
      //   const fetchReports = async () => {
      //     const querySnapshot = await getDocs(q);
      //     const reportsData = querySnapshot.docs.map((doc) => {
      //       const reportData = doc.data();
      //       const reportDate = reportData.date.toDate();
      //       return { ...reportData, reportDate };
      //     });
      //     setReports(reportsData);
      //   };
      //   fetchReports();
      // }, [displayName, startDate, endDate, orderByField]);
      

  return (
     <div>
      <h1>Reports-Admin</h1>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name..."
      />
      <label htmlFor="order-by">
        Sort By:
      <select id="order-by" value={orderByField} onChange={handleOrderByChange}>
        <option value="name">Name</option>
        <option value="date">Date</option>
      </select>

</label>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Time-in</th>
            <th>Time-out</th>
            <th>Minutes Late</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report) => (
            <tr key={report.id}>
              <td>{report.name}</td>
              <td>{report.location}</td>
              <td>{report.timein}</td>
              <td>{report.timeout}</td>
              <td>{report.lateMinutes}</td>
              <td>{report.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Reports