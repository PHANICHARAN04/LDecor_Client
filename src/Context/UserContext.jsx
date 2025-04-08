import { createContext, useContext, useEffect, useState } from "react";

const context=createContext()



function UserContext({children}) {
    const [user, setUser] = useState(null);     
    const [loading, setLoading] = useState(true);    
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);  
    const [isAdmin, setIsAdmin] = useState(false);
   
    useEffect(() => { 
      async function profile() {
        try {
          const storedToken = localStorage.getItem("token");
          if (storedToken) {
            setToken(storedToken);
            const response = await fetch("http://localhost:5000/api/auth/profile", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedToken}`,
              },
            });
            const data = await response.json();
            // console.log(data);
            
            if (response.ok) {
              setUser(data);
              setIsAuthenticated(true);
              setIsAdmin(data?.role === 'admin');
            } else {
              console.error("Failed to fetch profile:", data.message);
            }
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
        
      }
      profile()
    },[])

  return (
    <context.Provider value={{user,setUser,token,isAdmin,setIsAdmin,setToken,loading,isAuthenticated}}>
        {children}
    </context.Provider>
  )
}
export const useAuth= () => {
   
    return useContext(context);
};
export default UserContext