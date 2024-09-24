// SalesStamp.jsx
import { useEffect, useState } from "react";
import Sale from "./Sale";
import "./SalesStamp.css";

const SalesStamp = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    import("../../util/Sale.json")
      .then((module) => setData(module.default)) // Set the data from the imported JSON
      .catch((error) => console.error("Failed to load JSON:", error)); // Handle errors
  }, []);

  return (
    <div className="sales-container">
      {data.map((item) => (
        <Sale key={item.id} {...item} />
      ))}
    </div>
  );
};

export default SalesStamp;
