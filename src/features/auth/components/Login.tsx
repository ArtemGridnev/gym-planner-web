import LoginForm from "./forms/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import AuthCardLayout from "./AuthCardLayout";

type LoginProps = {
    redirectPath?: string | null;
  };
  
  export default function Login({ redirectPath = null }: LoginProps) {
    const navigate = useNavigate();
  
    return (
      <AuthCardLayout
        title="Sign in"
        footer={
          <>
            Don't have an account? <Link to="/register">Create account</Link>
          </>
        }
      >
        <LoginForm onSuccess={() => navigate(redirectPath ?? "/train-sessions")} />
      </AuthCardLayout>
    );
  }