export const getUser = () => {
   if (typeof window === "undefined") {
      return null; // Return null if running on the server
   }

   const user = sessionStorage.getItem("user");
   return user ? JSON.parse(user) : null;
};
