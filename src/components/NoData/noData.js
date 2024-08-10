import React from "react";
import noDataImage from "../../Assets/Images/envelop.png";

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  image: {
    width: "150px",
    height: "auto",
  },
  text: {
    marginTop: "10px",
    fontSize: "16px",
    color: "#555",
  },
};

const NoData = ({ message }) => {
  return (
    <div style={styles.container}>
      <img src={noDataImage} alt="No Data" style={styles.image} />
      <p style={styles.text}>{message || "No data available"}</p>
    </div>
  );
};

export default NoData;
