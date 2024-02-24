import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Lazy loading for routes
const MainPage = React.lazy(() => import("./Pages/MainPage"));
const Login = React.lazy(() => import("./Pages/Login"));
const Register = React.lazy(() => import("./Pages/Register"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/" element={<MainPage />} />
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
}

export default App;
