import React, { useState, useRef, useEffect } from "react";
import { Container,  TextField, MenuItem,  Button,  Box, FormControl, InputLabel, Typography, Select,  Alert, CircularProgress} from "@mui/material";
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { generateElectricityPDF } from "../reports/ElectricityBill";
import { generateMaintenancePDF } from "../reports/MaintenanceBill"; 
import { generateNetMeteringPDF } from "../reports/NetMeteringBill"; 

const Billing = () => {
  const [billingData, setBillingData] = useState({
    billingType: "electricity",
    btNo: "",
    project: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const btNoRef = useRef(null);

  useEffect(() => {
    if (btNoRef.current) {
      btNoRef.current.focus();
    }
  }, []);

  // Professional color palette with perfect contrast
  const colors = {
    primary: "#2563eb", // Professional blue
    primaryLight: "#3b82f6",
    primaryDark: "#1d4ed8",
    secondary: "#64748b", // Neutral gray
    accent: "#f59e0b", // Amber accent
    text: "#ffffff", // White text for better contrast on background
    textLight: "#e2e8f0",
    textLighter: "#cbd5e1",
    success: "#10b981",
    error: "#dc2626",
    warning: "#f59e0b"
  };

  // ✅ Dropdown options
  const projects =
    billingData.billingType === "maintenance"
      ? [
        { value: "MohlanwalResidential", label: "MOHLANWAL - Residential" },
        { value: "MohlanwalCommercial", label: "MOHLANWAL - Commercial" },
        { value: "Orchards", label: "Orchard / EMC / NASHEMAN / ROSE GARDEN" },
      ]
      : [
        { value: "Mohlanwal", label: "Mohlanwal" },
        { value: "Orchards", label: "Orchard / EMC / NASHEMAN / ROSE GARDEN" },
      ];



  const handleInputChange = (e) => {
    setBillingData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleProjectChange = (e) => {
    setBillingData((prev) => ({ ...prev, project: e.target.value }));
    if (error) setError("");
  };

  const handleBillingTypeChange = (type) => {
    setBillingData((prev) => ({ ...prev, billingType: type }));
    if (error) setError("");
  };


  // // Hard coded Data, without api
  // const handleGenerate = async () => {
  //   setLoading(true);
  //   setError("");

  //   try {
  //     // ---------------------------------------------------
  //     // ⚙️ Hardcoded PDF generation logic
  //     // ---------------------------------------------------
  //     let pdfFunction = null;

  //     // 1️⃣ Maintenance Bill
  //     if (billingData.billingType === "maintenance") {
  //       pdfFunction = generateMaintenancePDF;
  //       console.log("🧾 Maintenance Bill Selected");
  //     }

  //     // 2️⃣ Electricity / Net Metering
  //     else if (billingData.billingType === "electricity") {
  //       if (billingData.project === "Orchards") {
  //         pdfFunction = generateNetMeteringPDF;
  //         console.log("⚡ Orchards Project → Net Metering Bill Selected");
  //       } else {
  //         pdfFunction = generateElectricityPDF;
  //         console.log("💡 Electricity Bill Selected (Normal)");
  //       }
  //     }

  //     // ---------------------------------------------------
  //     // 3️⃣ Validate selection
  //     // ---------------------------------------------------
  //     if (!pdfFunction) {
  //       setError("Unable to determine which bill to generate.");
  //       setLoading(false);
  //       return;
  //     }

  //     // ✅ Instead use dummy or existing billingData
  //     console.log("📄 Generating PDF directly...");
  //     pdfFunction(billingData, projects);
  //   } catch (err) {
  //     console.error("❌ Error:", err);
  //     setError("Error generating bill. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleGenerate = async () => {
    if (!billingData.billingType) return setError("Please select billing type");
    if (!billingData.btNo) return setError("Please enter BTNo");
    if (!billingData.project) return setError("Please select project");

    setLoading(true);
    setError("");

    try {
      let formattedBTNo = billingData.btNo.trim().toUpperCase();


      // 🔍 Maintenance prefix + project validation
      if (billingData.billingType === "maintenance") {
        const selectedProject = projects.find(p => p.value === billingData.project);
        const projectLabel = selectedProject?.label || "";

        // 🧾 Check if BTNo and selected project mismatch
        if (formattedBTNo.startsWith("BTL-") && !projectLabel.includes("MOHLANWAL - Residential")) {
          setError("Wrong Project Selected");
          return;
        }

        if (formattedBTNo.startsWith("BTLC-") && !projectLabel.includes("MOHLANWAL - Commercial")) {
          setError("Wrong Project Selected");
          return;
        }

        if (formattedBTNo.startsWith("BTOM-") && !projectLabel.includes("Orchard")) {
          setError("Wrong Project Selected");
          return;
        }
      }

      

      // ✅ Normalize project before API call
      let projectForApi = billingData.project;
      if (projectForApi === "MohlanwalResidential" || projectForApi === "MohlanwalCommercial") {
        projectForApi = "Mohlanwal";
      }

      // ✅ Auto prefix logic based on billing type + projectForApi
      if (
        !formattedBTNo.startsWith("BTL-") &&
        !formattedBTNo.startsWith("BTO-") &&
        !formattedBTNo.startsWith("BTLC-") &&
        !formattedBTNo.startsWith("BTOM-")
      ) {
        if (billingData.billingType === "electricity") {
          // 🔌 Electricity Bill Prefix
          if (projectForApi === "Mohlanwal") {
            formattedBTNo = `BTL-${formattedBTNo}`;
          } else if (projectForApi === "Orchards") {
            formattedBTNo = `BTO-${formattedBTNo}`;
          }
        }

        else if (billingData.billingType === "maintenance") {
          // 🧾 Maintenance Bill Prefix
          if (billingData.project === "MohlanwalResidential") {
            formattedBTNo = `BTL-${formattedBTNo}`;
          }
          else if (billingData.project === "MohlanwalCommercial") {
            formattedBTNo = `BTLC-${formattedBTNo}`;
          }
          else if (projectForApi === "Orchards") {
            formattedBTNo = `BTOM-${formattedBTNo}`;
          }
        }
      }




      // 🔧 Change base URL here manually
      const baseUrl = "https://localhost:7108/api";
      // const baseUrl = "http://172.20.228.2/api";
      // const baseUrl = "https://btbilling-f9g3ahd4gpexhxha.canadacentral-01.azurewebsites.net/api";
      // const baseUrl = "http://34.31.174.65:5050/api";
      // const baseUrl = "http://103.175.122.32/api";
      //  const baseUrl = "https://softwaredemo.space/api";
  
      
      
      const maintenanceUrl = `${baseUrl}/MaintenanceBill?btNo=${formattedBTNo}&project=${projectForApi}`;
      const netMeterUrl =    `${baseUrl}/ElectricityBillsNetMeter?BTNo=${formattedBTNo}&Project=${projectForApi}`;
      const electricityUrl = `${baseUrl}/ElectricityBill?btNo=${formattedBTNo}&project=${projectForApi}`;
      let apiUrl = "";
      let pdfFunction = null;

      // ---------------------------------------------------
      // 1️⃣ STEP: Maintenance
      // ---------------------------------------------------
      if (billingData.billingType === "maintenance") {
        apiUrl = maintenanceUrl
        pdfFunction = generateMaintenancePDF;
      }

      // ---------------------------------------------------
      // 2️⃣ STEP: Electricity / Net Metering Detection
      // ---------------------------------------------------
      else if (billingData.billingType === "electricity") {

        const netResponse = await fetch(netMeterUrl);

        if (netResponse.ok) {
          const netData = await netResponse.json();

          if (netData && netData.electricityBillsNetMeter) {
            apiUrl = netMeterUrl;
            pdfFunction = generateNetMeteringPDF;

          } else {
            apiUrl = electricityUrl
            pdfFunction = generateElectricityPDF;
          }
        } else {
          apiUrl = electricityUrl
          pdfFunction = generateElectricityPDF;
        }
      }

      // ---------------------------------------------------
      // 3️⃣ STEP: Validate API selection
      // ---------------------------------------------------
      if (!apiUrl || !pdfFunction) {
        setError("Unable to determine which bill to generate.");
        setLoading(false);
        return;
      }

      // console.log("🌐 Fetching Data From:", apiUrl);
      const response = await fetch(apiUrl);

      if (response.status === 404) {
        setError("No bill found for this BTNo and Project.");
        setLoading(false);
        return;
      }

      if (!response.ok) throw new Error("Failed to fetch bill data");

      const data = await response.json();

      if (!data || Object.keys(data).length === 0) {
        setError("No bill data found.");
        setLoading(false);
        return;
      }

      // ---------------------------------------------------
      // 4️⃣ STEP: Generate PDF
      // ---------------------------------------------------
      pdfFunction(data, projects);
    } catch (err) {
      // console.error("❌ Error:", err);
      setError("Error fetching bill data. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  const resetForm = () => {
    setBillingData({ billingType: "electricity", btNo: "", project: "" });
    setError("");
    // 👇 After reset, focus again on BT Number field
    if (btNoRef.current) {
      btNoRef.current.focus();
    }
  };

  // ⬇️ Add this function inside your component
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submit/refresh
      handleGenerate();
    }
  };


  // Enhanced field styles with modern look
  const fieldStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)',
    '&:hover fieldset': {
      borderColor: colors.primaryLight,
    },
    '&.Mui-focused fieldset': {
      borderColor: colors.primary,
      borderWidth: '2px',
    },
  },
  "& .MuiInputBase-root": { 
    height: "44px", // 👈 field height
    borderRadius: '10px',
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center', // 👈 keeps input text vertically centered
  },
  "& .MuiOutlinedInput-input": { 
    padding: "0 14px", // 👈 no vertical padding, so text stays centered
    color: '#1e293b',
  },
  "& .MuiInputLabel-root": {
    transform: "translate(14px, 10px) scale(1)", // 👈 label start position
    fontSize: '15px',
    color: '#64748b',
    "&.Mui-focused, &.MuiFormLabel-filled": {
      transform: "translate(14px, -8px) scale(0.85)", // 👈 label moves up nicely
      color: colors.primary,
      backgroundColor: '#ffffff',
      padding: '0 6px',
      fontWeight: '600'
    },
  },
  width: "100%",
};


  // Generate Bill Button - Professional blue
  const primaryButtonStyle = {
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(37, 99, 235, 0.4)',
    fontWeight: 'bold',
    textTransform: 'none',
    padding: '16px 24px',
    height: '56px',
    fontSize: '16px',
    letterSpacing: '0.5px',
    minWidth: '160px',
    color: '#ffffff',
    '&:hover': {
      background: `linear-gradient(135deg, ${colors.primaryDark} 0%, #1e40af 100%)`,
      boxShadow: '0 8px 25px rgba(37, 99, 235, 0.5)',
      transform: 'translateY(-1px)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
    '&:disabled': {
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'rgba(255, 255, 255, 0.5)',
      boxShadow: 'none',
    },
    transition: 'all 0.3s ease'
  };

  
  const resetButtonStyle = {
    border: `2px solid rgba(220, 38, 38, 0.6)`, // red border
    borderRadius: '12px',
    color: "white", // red text
    fontWeight: '600',
    textTransform: 'none',
    padding: '16px 20px',
    height: '56px',
    fontSize: '14px',
    backgroundColor: 'rgba(220, 38, 38, 0.1)', // light red background
    letterSpacing: '0.5px',
    minWidth: '100px',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      backgroundColor: 'rgba(220, 38, 38, 0.2)', // darker red on hover
      border: `2px solid rgba(220, 38, 38, 0.9)`,
      boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
      transform: 'translateY(-1px)',
      color: '#b91c1c', // darker red text on hover
    },
    '&:active': {
      transform: 'translateY(0)',
    },
    transition: 'all 0.3s ease'
  };


  // Billing type buttons - Glass effect
  const billingTypeButtonStyle = (isActive) => ({
    borderRadius: '12px',
    textTransform: 'none',
    fontWeight: 'bold',
    padding: '16px 20px',
    flex: 1,
    minWidth: '140px',
    height: '56px',
    fontSize: '15px',
    background: isActive 
      ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`
      : 'rgba(255, 255, 255, 0.15)',
    color: isActive ? '#ffffff' : colors.text,
    border: isActive ? 'none' : `2px solid rgba(255, 255, 255, 0.4)`,
    boxShadow: isActive 
      ? '0 6px 20px rgba(37, 99, 235, 0.4)' 
      : '0 4px 12px rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      background: isActive 
        ? `linear-gradient(135deg, ${colors.primaryDark} 0%, #1e40af 100%)`
        : 'rgba(255, 255, 255, 0.25)',
      boxShadow: isActive 
        ? '0 8px 25px rgba(37, 99, 235, 0.5)' 
        : '0 6px 20px rgba(255, 255, 255, 0.2)',
      transform: 'translateY(-1px)',
    },
    transition: 'all 0.3s ease'
  });

  // Icons for billing types
  const getBillingTypeIcon = (type, isActive) => {
    const iconStyle = {
      fontSize: '20px',
      marginRight: '8px',
      color: isActive ? '#ffffff' : colors.text
    };

    switch (type) {
      case 'electricity':
        return <ElectricBoltIcon sx={iconStyle} />;
      case 'maintenance':
        return <HomeRepairServiceIcon sx={iconStyle} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      backgroundImage: 'url("/bahria-town-background.jpg")', // Add your Bahria Town image path here
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      py: { xs: 3, md: 3 },
      px: { xs: 2, sm: 3 },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 43, 91, 0.2)', // Reduced overlay opacity
        backdropFilter: 'blur(5px)', // Reduced blur effect
        zIndex: 1,
      }
    }}>
      
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        
        {/* Header Section - Combined to remove extra space */}
        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 3,
              color: colors.text,
              fontSize: { xs: "1.8rem", md: "2.2rem" },
              lineHeight: 1.3,
              textAlign: "center",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
            }}
          >
            <Box
              component="span"
              sx={{
                display: "inline-block",
                // background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                color: "white",
                px: 2.5,
                py: 0.8,
                // borderRadius: "10px",
                // boxShadow: "0 6px 20px rgba(37, 99, 235, 0.5)",
                mr: 1.5,
                fontSize: { xs: "1.3rem", md: "1.8rem" },
                // border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              BAHRIA TOWN BILLING SYSTEM
            </Box>
            {/* BAHRIA TOWN BILLING SYSTEM{" "} */}
            <Typography
              component="span"
              sx={{
                fontWeight: "600",
                color: colors.textLight,
                fontSize: { xs: "1rem", md: "1.2rem" },
                ml: 1,
                textShadow: "0 1px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              Generate Duplicate Bill
            </Typography>
          </Typography>




          {/* <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              fontWeight: '600', 
              color: colors.textLight,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              letterSpacing: '0.3px',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
              mb: 0 // Remove bottom margin to eliminate extra space
            }}
          >
            Generate Duplicate Bill
          </Typography> */}
        </Box>

        {/* Error Message - Glass effect */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2, // Reduced margin
              borderRadius: '10px',
              boxShadow: '0 3px 10px rgba(220, 38, 38, 0.3)',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: 'rgba(220, 38, 38, 0.85)',
              color: 'white',
              backdropFilter: 'blur(8px)',
              py: 1,
              '& .MuiAlert-icon': {
                fontSize: '22px',
                color: 'white'
              }
            }}
          >
            {error}
          </Alert>
        )}

        {/* Billing Type Selection with Icons - Directly after subtitle */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            gap: 1.5, 
            justifyContent: 'center',
            flexWrap: { xs: 'wrap', sm: 'nowrap' }
          }}>
            {["electricity", "maintenance"].map((type) => (
              <Button 
                key={type} 
                variant={billingData.billingType === type ? "contained" : "outlined"} 
                onClick={() => handleBillingTypeChange(type)}
                sx={billingTypeButtonStyle(billingData.billingType === type)}
                startIcon={getBillingTypeIcon(type, billingData.billingType === type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Form Fields - Reduced spacing */}
        <Box sx={{ mb: 3 }} onKeyDown={handleKeyDown}>
          {/* BTNo Input */}
          <Box sx={{ mb: 2 }}>
            <TextField 
              sx={fieldStyles} 
              label="BT Number" 
              name="btNo" 
              value={billingData.btNo} 
              onChange={handleInputChange} 
              placeholder="Enter your BT Number (e.g 12345)" 
              fullWidth 
              inputRef={btNoRef}   // ✅ Yeh line zaroori hai
            />
          </Box>

          {/* Project Dropdown */}
          <Box>
            <FormControl fullWidth sx={fieldStyles}>
              <InputLabel>Select Project</InputLabel>
              <Select 
                name="project" 
                value={billingData.project} 
                onChange={handleProjectChange} 
                label="Select Project"
              >
                {projects.map((project) => (
                  <MenuItem key={project.value} value={project.value}>
                    {project.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Action Buttons - Reduced spacing */}
        <Box sx={{ 
          display: 'flex', 
          gap: 1.5, 
          justifyContent: 'center',
          alignItems: 'center',
          mt: 3
        }}>
          <Button 
            variant="contained" 
            onClick={handleGenerate} 
            size="large" 
            disabled={loading}
            sx={primaryButtonStyle}
          >
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={18} color="inherit" />
                Generating...
              </Box>
            ) : (
              "Generate Bill"
            )}
          </Button>
          <Button 
            variant="outlined" 
            onClick={resetForm} 
            size="large" 
            sx={resetButtonStyle}
            startIcon={<RestartAltIcon />}
          >
            Reset
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Billing;