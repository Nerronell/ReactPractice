// src/pages/Signin.tsx
import { useNavigate } from "react-router-dom";
import { SigninForm } from "../components/SigninForm";
import { useAuth } from "../context/AuthContext";

export const Signin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <SigninForm onSuccess={() => navigate("/")} />
    </div>
  );
};