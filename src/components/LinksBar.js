// import React from "react";
// import {
//   Paper,
//   Container,
//   Box,
//   Button,
//   IconButton,
//   Menu,
//   MenuItem,
//   useMediaQuery,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useNavigate, useLocation } from "react-router-dom";
// import { scroller } from "react-scroll";
// import { useTheme } from "@mui/material/styles";

// const LinksBar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activeTab, setActiveTab] = React.useState("billing");
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // 👈 md ~ 900px

//   const tabs = [
//     { id: "billing", label: "Billing", type: "scroll" },
//     { id: "about", label: "About", type: "scroll" },
//     { id: "projects", label: "Projects", type: "scroll" },
//     { id: "contact", label: "Contact", type: "scroll" },
//     { id: "netmetering", label: "Net Metering", type: "route", path: "/netmetering" },
//   ];

//   React.useEffect(() => {
//     if (location.pathname === "/netmetering") setActiveTab("netmetering");
//   }, [location.pathname]);

//   const handleClick = (tab) => {
//     if (tab.type === "route") {
//       setActiveTab(tab.id);
//       navigate(tab.path);
//       handleMenuClose();
//       return;
//     }

//     if (location.pathname === "/") {
//       scroller.scrollTo(tab.id, { duration: 450, smooth: true, offset: -80 });
//       setActiveTab(tab.id);
//     } else {
//       navigate("/", { state: { scrollTo: tab.id } });
//       setActiveTab(tab.id);
//     }
//     handleMenuClose();
//   };

//   const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         position: "fixed",
//         top: 40,
//         left: 0,
//         right: 0,
//         zIndex: 1100,
//         borderRadius: 0,
//       }}
//     >
//       <Container maxWidth="lg">
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             py: 1.5,
//           }}
//         >
//           {/* ✅ Logo */}
//           <Box >
//             <img
//               src="/logo.png"
//               alt="logo"
//               style={{
//                 width: 70,
//                 objectFit: "fill",
//                 cursor: "pointer", // 👈 hover pe pointer cursor
//               }}
//               onClick={() => {
//                 setActiveTab("billing");
//                 navigate("/", { state: { scrollTo: "billing" } });
//               }}
//             />
//           </Box>

//           {/* ✅ Desktop Links */}
//           {!isMobile ? (
//             <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
//               {tabs.map((tab) => (
//                 <Button
//                   key={tab.id}
//                   onClick={() => handleClick(tab)}
//                   sx={{
//                     color: activeTab === tab.id ? "#002e5b" : "text.secondary",
//                     borderBottom: activeTab === tab.id ? "3px solid #002e5b" : "none",
//                     borderRadius: 0,
//                     px: 2.5,
//                     fontSize: "0.95rem",
//                     "&:hover": {
//                       backgroundColor: "rgba(0,46,91,0.05)",
//                       color: "#002e5b",
//                     },
//                   }}
//                 >
//                   {tab.label}
//                 </Button>
//               ))}
//             </Box>
//           ) : (
//             <>
//               {/* ✅ Mobile Dropdown Menu */}
//               <IconButton onClick={handleMenuOpen}>
//                 <MenuIcon sx={{ color: "#002e5b" }} />
//               </IconButton>

//               <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleMenuClose}
//                 PaperProps={{
//                   sx: {
//                     backgroundColor: "white",
//                     color: "#002e5b",
//                     mt: 1,
//                   },
//                 }}
//               >
//                 {tabs.map((tab) => (
//                   <MenuItem
//                     key={tab.id}
//                     onClick={() => handleClick(tab)}
//                     sx={{
//                       color: activeTab === tab.id ? "#002e5b" : "text.secondary",
//                       fontWeight: activeTab === tab.id ? 600 : 400,
//                     }}
//                   >
//                     {tab.label}
//                   </MenuItem>
//                 ))}
//               </Menu>
//             </>
//           )}
//         </Box>
//       </Container>
//     </Paper>
//   );
// };

// export default LinksBar;

import React from "react";
import {
  Paper,
  Container,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import { useTheme } from "@mui/material/styles";

const LinksBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState("billing");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // 👈 sirf mobile ke liye

  const tabs = [
    { id: "billing", label: "Billing", type: "scroll" },
    { id: "about", label: "About", type: "scroll" },
    { id: "projects", label: "Projects", type: "scroll" },
    { id: "contact", label: "Contact", type: "scroll" },
    { id: "netmetering", label: "Net Metering", type: "route", path: "/netmetering" },
  ];

  React.useEffect(() => {
    if (location.pathname === "/netmetering") setActiveTab("netmetering");
  }, [location.pathname]);

  const handleClick = (tab) => {
    if (tab.type === "route") {
      setActiveTab(tab.id);
      navigate(tab.path);
      handleMenuClose();
      return;
    }

    if (location.pathname === "/") {
      scroller.scrollTo(tab.id, { duration: 450, smooth: true, offset: -80 });
      setActiveTab(tab.id);
    } else {
      navigate("/", { state: { scrollTo: tab.id } });
      setActiveTab(tab.id);
    }
    handleMenuClose();
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        top: 30, // 👈 Title bar ke niche
        left: 0,
        right: 0,
        zIndex: 1100,
        borderRadius: 0,
        height: "70px", // 👈 Height thori badhai
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg" sx={{ height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            py: 1, // 👈 Padding maintain kari
          }}
        >
          {/* ✅ Logo - Right side space kam kiya */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center",
            marginLeft: 3, // 👈 Left side spacing minimal
            flexShrink: 0, // 👈 Logo ka size fixed rahega
            marginRight: -2
          }}>
            <img
              src="/logo.png"
              alt="logo"
              style={{
                width: 70, // 👈 Logo size badhaya
                height: 90, // 👈 Height bhi badhai
                objectFit: "contain",
                cursor: "pointer",
              }}
              onClick={() => {
                setActiveTab("billing");
                navigate("/", { state: { scrollTo: "billing" } });
              }}
            />
          </Box>

          {/* ✅ Desktop Links - center me rahenge */}
          {!isMobile ? (
            <Box sx={{ 
              flex: 1, 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center",
              marginRight: 8, // 👈 Right side space kam kiya ta ke options center me rahen
            }}>
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => handleClick(tab)}
                  sx={{
                    color: activeTab === tab.id ? "#002e5b" : "text.secondary",
                    borderRadius: 0,
                    px: 2.5,
                    py: 1.5, // 👈 Padding maintain kari
                    fontSize: "0.95rem",
                    minHeight: "auto",
                    position: 'relative', // 👈 Underline animation ke liye
                    overflow: 'hidden', // 👈 Animation overflow hide karega
                    "&::after": {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: activeTab === tab.id ? '80%' : '0%',
                      height: '3px',
                      backgroundColor: '#002e5b',
                      transition: 'all 0.3s ease-in-out',
                      transform: 'translateX(-50%)',
                    },
                    "&:hover::after": {
                      width: '80%',
                      backgroundColor: '#002e5b',
                    },
                    "&:hover": {
                      backgroundColor: "rgba(0,46,91,0.05)",
                      color: "#002e5b",
                    },
                  }}
                >
                  {tab.label}
                </Button>
              ))}
            </Box>
          ) : (
            <>
              {/* ✅ Mobile Dropdown Menu - sirf mobile par dikhega */}
              <IconButton 
                onClick={handleMenuOpen}
                sx={{ 
                  padding: "10px",
                  flexShrink: 0, // 👈 Menu icon ka size fixed rahega
                  "&:hover": { backgroundColor: "rgba(0,46,91,0.05)" }
                }}
              >
                <MenuIcon sx={{ color: "#002e5b", fontSize: "1.8rem" }} />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    backgroundColor: "white",
                    color: "#002e5b",
                    mt: 1, // 👈 Uper se gap badhaya (previously 0.5)
                    width: "100vw",
                    maxWidth: "100%",
                    left: "0 !important",
                    right: "0 !important",
                    borderRadius: 0,
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {tabs.map((tab) => (
                  <MenuItem
                    key={tab.id}
                    onClick={() => handleClick(tab)}
                    sx={{
                      color: activeTab === tab.id ? "#002e5b" : "text.secondary",
                      fontWeight: activeTab === tab.id ? 600 : 400,
                      fontSize: "1rem",
                      py: 1.5,
                      borderBottom: "1px solid rgba(0,0,0,0.1)",
                      display: 'flex', // 👈 Center alignment ke liye
                      justifyContent: 'center', // 👈 Text ko center me laya
                      textAlign: 'center', // 👈 Text center align
                      position: 'relative', // 👈 Mobile menu animation ke liye
                      overflow: 'hidden', // 👈 Animation overflow hide karega
                      "&::after": {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        width: activeTab === tab.id ? '60%' : '0%',
                        height: '2px',
                        backgroundColor: '#002e5b',
                        transition: 'all 0.3s ease-in-out',
                        transform: 'translateX(-50%)',
                      },
                      "&:hover::after": {
                        width: '60%',
                      },
                      "&:last-child": {
                        borderBottom: "none",
                      },
                      "&:hover": {
                        backgroundColor: "rgba(0,46,91,0.05)",
                      },
                    }}
                  >
                    {tab.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Box>
      </Container>
    </Paper>
  );
};

export default LinksBar;