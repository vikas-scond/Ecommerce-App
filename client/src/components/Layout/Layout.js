import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
const Layout = (props) => {
  return (
    <div>
      <Header />
      <main style={{ minHeight: "75vh" }}>
        <Toaster
          toastOptions={{
            success: {
              duration: 2000,
            },
          }}
        />
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
