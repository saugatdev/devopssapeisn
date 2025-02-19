const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
      try {
        // Access role from req.user.user.role
        const userRole = req.user?.user?.role;
        console.log("User Role from req.user.user:", userRole); 
        
        
        if (!userRole || !allowedRoles.includes(userRole)) {
          return res.status(401).json({ message: "Access Denied" });
        }
  
        next(); 
      } catch (error) {
        console.error("Error in authorizeRoles middleware:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
    };
  };
  
  export default authorizeRoles;
  