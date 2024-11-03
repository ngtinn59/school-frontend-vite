import { Toaster } from "react-hot-toast";

export default function Toast() {
  return (
    <Toaster
      toastOptions={{
        // Define default options
        className: "",
        duration: 3000,
        style: {
          background: "#363636",
          color: "#fff",
        },

        // Default options for specific types
        error: {
          duration: 3000,
          style: {
            background: "#ff0000",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#b10000",
          },
        },
        success: {
          duration: 3000,
          style: {
            background: "rgb(34, 197, 94)",

            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "rgb(34, 197, 94)",
          },
        },
      }}
    />
  );
}
