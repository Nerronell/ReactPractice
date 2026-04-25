// src/pages/Signup.tsx
import { useNavigate } from "react-router-dom";
import { SignupForm } from "../components/SignupForm";
import { useAuth } from "../context/AuthContext";

export const Signup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <SignupForm onSuccess={() => navigate("/")} />
    </div>
  );
};