import "./styles.css";
import React, { useEffect, useState } from "react";

export default function App() {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getFlags() {
    try {
      let data = await fetch("https://restcountries.com/v3.1/all");
      let res = await data.json();
      setdata(res);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    getFlags();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div className="loader">
          <p>Loading...</p>
        </div>
      ) : (
        data.map((ele) => {
          return (
            <div key={ele.name.common} className="card">
              <img src={ele.flags.png} alt={ele.name.common} />

              <p>{ele.name.common}</p>
            </div>
          );
        })
      )}
    </div>
  );
}
