import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import PageContent from "../components/PageContent";
import SideMenu from "../components/SideMenu";
import AppRoutes from "../components/AppRoutes"; // Thêm import này vào
import { Route, Routes } from "react-router-dom";
import "./home.css";
const Account = () => {
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-[800px] m-auto">
        <h1 className="text-center text-2xl font-bold pt-5">Student Account</h1>
        <div className="text-center text-2xl font-bold pt-5">
          <p>Welcome {user?.displayName}</p>
        </div>
      </div>

      <div className="App">
        <div className="SideMenuAndPageContent pt-12">
          <SideMenu />
          <PageContent>
            <Routes>
              <Route path="/student/*" element={<AppRoutes />} />
            </Routes>
          </PageContent>
        </div>
      </div>
    </>
  );
};

export default Account;
