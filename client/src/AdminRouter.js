import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import "./App.css";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import { Home, ManageMed, AllOrders, UploadMed, Logout, EditMed } from "./pages";
import { useStateContext } from "./contexts/ContextProvider";

const AdminRouter = () => {
  const { setCurrentColor, setCurrentMode, currentMode,currentColor, activeMenu,themeSettings,setThemeSettings} = useStateContext();
  
  
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  
  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
     
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4 " style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={`dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full
              ${activeMenu ? "md:ml-72" : "flex-2"}`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            <div>
            {themeSettings && (<ThemeSettings />)}
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />

                {/* Pages*/}
                <Route path="/upload-medicine" element={<UploadMed />} />
                <Route path="/manage-medicines" element={<ManageMed />} />
                <Route path="/all-orders" element={<AllOrders />} />
                <Route path="/edit-med/:id" element={<EditMed />} />

                {/* Logging Out*/}
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
        
    </div>
  );
};

export default AdminRouter;
