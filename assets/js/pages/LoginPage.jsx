import React, {useState} from 'react';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const handleChange = event=>{
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setCredentials({...credentials, [name]:value});
    };

    const handleSubmit = event => {
        event.preventDefault();//ne recharge pas la page
        console.log(credentials);
    };
    // TODO : database connexion to register

    return (
        <>
            <h1>Connexion à QuickFactures</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Adresse email</label>
                    <input
                        onChange={handleChange}
                        value={credentials.username}
                        type="email"
                        placeholder="Adresse email de connexion"
                        name="username"
                        id="username"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        onChange={handleChange}
                        value={credentials.password}
                        type="password"
                        placeholder="Mot de passe"
                        name="password"
                        id="password"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Se connecter</button>
                </div>
            </form>
        </>//TODO: beautifull design
    );
};

export default LoginPage;