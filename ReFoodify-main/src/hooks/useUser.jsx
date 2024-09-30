// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react-refresh/only-export-components */
// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
// } from "react";
// // import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// // import generateDummyData from "@/db";

// // Create a UserContext
// const UserContext = createContext(null);

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//   const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     setLoading(true);
//     const response = await fetch("http://localhost:3001/api/users/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const result = await response.json();

//     if (result) {
//       setUser(result.userId); // Update user state
//       localStorage.setItem("access_token", result.accessToken);
//       localStorage.setItem("refresh_token", result.refreshToken);
//       localStorage.setItem("user", JSON.stringify(result.userId));
//       console.log("access_token:", result.accessToken);
//       console.log("userId:", result.userId);

//       setLoading(false);
//       return result.userId;
//     }

//     setLoading(false);
//     return null;
//   };


//     // if (!response.ok) {
//       // throw new Error("Network response was not ok");
//     // }
//     // const result = await response.json();
//     // Simulate API call delay
//     // await new Promise((resolve) => setTimeout(resolve, 500));

//     // const { users } = generateDummyData();
//     // const foundUser = users.find(
//       // (u) => u.email === email && u.password === password
//     // );

//     // if (foundUser) {
//     //   const { password, ...userWithoutPassword } = foundUser;
//     //   setUser(userWithoutPassword); // Update user state
//     //   Cookies.set("user", JSON.stringify(userWithoutPassword), { expires: 7 });
//     //   setLoading(false);
//     //   return foundUser;
//     // }
//     // if (result) {
//     //   // const { password, ...userWithoutPassword } = foundUser;
//     //   setUser(result.userId); // Update user state
//     //   // Cookies.set("user", JSON.stringify(userWithoutPassword), { expires: 7 });
//     //   Cookies.set("access_token", JSON.stringify(result.accessToken));
//     //   Cookies.set("refresh_token", JSON.stringify(result.refreshToken));
//     //   console.log("access_token:", result.accessToken);
//     //   console.log("userId:", result.userId);
//     //   console.log("access_token:", result.accessToken);

//     //   setLoading(false);
//     //   // return foundUser;
//     //       return result.userId;
//     // }

//   //   setLoading(false);
//   //   return null;
//   // };

//    const signup = async (userData) => {
//      const response = await fetch("http://localhost:3001/api/users/signup", {
//        method: "POST",
//        headers: {
//          "Content-Type": "application/json",
//        },
//        body: JSON.stringify(userData),
//      });

//      if (!response.ok) {
//        throw new Error("Failed to sign up");
//      }

//      const result = await response.json();
//      return result;
//    };

//   const logout = () => {
//     setUser(null);
//     // Cookies.remove("user");
//         localStorage.removeItem("user");
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("refresh_token");
//     navigate("/login");
//   };

//   return (
//     <UserContext.Provider value={{ user, loading, login, signup, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };



// // Custom hook to use the UserContext
// export const useUser = () => {
//   return useContext(UserContext);
// };
