import RegisterForm from "./forms/RegisterFrom";
import { Link, useNavigate } from "react-router-dom";
import AuthCardLayout from "./AuthCardLayout";

export default function Register() {
    const navigate = useNavigate();

    return (
        <AuthCardLayout
            title="Sign up"
            footer={
                <>
                    Already have an account? <Link to="/login">Sign in</Link>
                </>
            }
        >
            <RegisterForm onSuccess={() => navigate("/train-sessions")} />
        </AuthCardLayout>
    );
}