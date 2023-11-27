import React from "react";
import { useState } from "react";
import { Button, Drawer, Menu } from "antd";
import { AlignLeftOutlined  } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const [openMenu, setopenMenu] = useState(false);

  const ok = () => {
    setopenMenu(true);
    console.log(openMenu);
  };
  return (
    <>
      <div
        className="menu-Icon"
        style={{ backgroundColor: "#006D77", color: "white", padding: 10 }}
      >
        <AlignLeftOutlined 
          onClick={ok}
          style={{ color: "white", fontSize: 25, display: "inline" }}
        />
        <span style={{ marginLeft: "45%", color: "white" }}>
          <h3 id="notewiz-heading" style={{ display: "inline",textAlign:"right" }}>  NoteWiz</h3>
        </span>
      </div>
      <span className="app-Menu">
        <AppMenu />
      </span>
      <Drawer
        open={openMenu}
        onClose={() => {
          setopenMenu(false);
        }}
        closable={true}
        style={{ backgroundColor: "#006D77" }}
      >
        <h3 style={{color:'white'}}>NoteWiz</h3>
        <AppMenu isInline="false" />
      </Drawer>
    </>
  );
}

const AppMenu = ({ isInline }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Menu
      onClick={({ key }) => {
        
        navigate(key);
      }}
      style={{ backgroundColor: "#006D77", border: "none",color:"white" }}
      mode={isInline ? "inline" : "horizontal"}
      items={[
        
        ...(isLoggedIn
          ? [
             
              {
                label: "Home",
                key: "/",
              },
              {
                label: "About",
                key: "/about",
              },
              { 
                label: "Logout", 
                key: "/logout"
              },
            ]
          : [
              { label: "Login", key: "/login" },
              { label: "Register", key: "/register" },
            ]),
      ]}
    >
      
      
    </Menu>
  );
};

export default Navbar;
