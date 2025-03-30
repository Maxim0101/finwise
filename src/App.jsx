import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import Community from "./pages/Community";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Settings from "./pages/settings";
import Resources from "./pages/Resources";

// Importing the lesson pages
import Lesson1 from "./pages/beginner/bl1"; // Example for Beginner Lesson 1

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lessons" element={<Lessons />} />
      {/* Beginner Lessons */}
      <Route path="/beginner/lesson1" element={<Lesson1 />} />

      <Route path="/community" element={<Community />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/resources" element={<Resources />} />
    </Routes>
  );
}

export default App;

