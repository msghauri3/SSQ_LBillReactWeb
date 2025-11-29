import React from "react";

const TopBar = () => {
  const styles = {
    topbar: {
      backgroundColor: "#002b5b",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "30px",
      padding: "0 40px",
      fontSize: "14px",
      fontWeight: "500",
      position: "sticky",   // ✅ sticky instead of fixed
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1000,
      boxSizing: "border-box",
    }
    ,
    left: {
      letterSpacing: "0.5px",
    },
    right: {
      display: "flex",
      gap: "20px",
    },
    link: {
      color: "white",
      textDecoration: "none",
      transition: "color 0.3s",
    },
  };

  return (
    <div style={styles.topbar}>
      <div style={styles.left}>
        <span>Bahria Town, Lahore Billing System</span>
      </div>
      {/* <div style={styles.right}>
        <a
          href="/login"
          style={styles.link}
          onMouseOver={(e) => (e.target.style.color = "#1e90ff")}
          onMouseOut={(e) => (e.target.style.color = "white")}
        >
          LOGIN
        </a>
        <a
          href="/signup"
          style={{ ...styles.link, fontWeight: "bold" }}
          onMouseOver={(e) => (e.target.style.color = "#1e90ff")}
          onMouseOut={(e) => (e.target.style.color = "white")}
        >
          SIGN UP
        </a>
      </div> */}
    </div>
  );
};

export default TopBar;
