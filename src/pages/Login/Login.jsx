// Styles
import './Login.css';

// Hooks
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthentication } from '../../hooks/useAuthentication';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const {login, loading, error: authError} = useAuthentication();
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if(rememberMe && email!== "") {
            localStorage.email = email;
            localStorage.rememberMe = rememberMe;
        } else {
            localStorage.email = "";
            localStorage.rememberMe = false;
        }

        const user = {
            email,
            password,
        };

        await login(user);
        
    };

    // Remember me validation
    useEffect(() => {
        if (localStorage.rememberMe && localStorage.email !== "") {
            setRememberMe(true);
            setEmail(localStorage.email);
        } else {
            setRememberMe(false);
            setEmail("");
        }
    }, []);

    useEffect(() => {
        if(authError) setError(authError);
    }, [authError]);

  return (
    <div className="container" id="login">
        <div className="d-flex vh-100 align-items-center justify-content-center">
            <main className="form-signin">
                <form onSubmit={handleSubmit}>
                    <p className="brand">Home <span>Tasks</span></p>
                    <h1 className="h6 mb-3 fw-normal">Login</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" name="email" required placeholder="Email do usuário" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" name="password" required placeholder="Senha do usuário" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="password">Senha</label>
                    </div>

                    <div className="checkbox mb-3 text-center"> 
                        <label>
                            <input type="checkbox" name="rememberMe" checked={rememberMe} 
                                onChange={() => rememberMe ? setRememberMe(false) : setRememberMe(true)}/> Lembrar
                        </label>
                    </div>

                    {!loading && <button className="w-100 btn btn-primary">Entrar</button>}
                    {loading && 
                        <button className="w-100 btn btn-primary" disabled>
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span role="status"> Aguarde...</span>
                        </button>}
                        {error && <div className="alert alert-danger mt-3 text-center" role="alert">{error}</div>}

                        <p className="mt-4 mb-3 text-muted text-center"><Link to="/createAccount">Criar uma conta</Link></p>
                </form>
            </main>
        </div>
    </div>

  );
};

export default Login;