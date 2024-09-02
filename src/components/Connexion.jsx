import "../asset/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Connexion() {
    let navigation = useNavigate();

    const connexion = () => {
        axios.post('https://api.betaseries.com/oauth/access_token?client_id=4a594a99c9e2&client_secret=73dd7eff7aeaa90a5751962fd82b86ae&redirect_uri=http://betaseries/callback&code=658745a915f3de8e3489f60f68044ebb').then(axiosReponse => {
            return axiosReponse.data
        })  
            .then((data) => {
                if(data.access_token){
                    navigation({
                        pathname: '/'
                    });
                }
            }).catch(reason => {
                console.log(reason);
                return navigation({
                    pathname: '/error',
                });
            })
    }
    return (
        <>
            < Header />
            <div className="auth_container">
                <div className="auth-info" onClick={connexion}>
                    <h1>Se connecter</h1>
                    <FontAwesomeIcon icon={faRightToBracket} className="auth-info-icon" />
                </div>
            </div>
        </>

    )
}