import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { styles } from '../styles/styles';
import axios from 'axios';
import { server } from '../ServerConfigs';

const ActivationPage = () => {
    const { activation_token } = useParams();
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const navigateToLogIn = () => {
        navigate('/login')
    }

    useEffect(() => {
        if (activation_token) {
          const sendRequest = async () => {
            await axios.post(`${server}/shop/activation`, { activation_token})
            .then((res) => {
                console.log(res);
                navigateToLogIn();
              })
              .catch((err) => {
                setError(true);
              });
          };
          sendRequest();
        }
      }, []);
    

    return (
        <div>
            <div className='App'>
                <div className='flex flex-col gap-10'>
                    {error ? (
                        <p>Your token is expired!</p>
                    ) : (
                        <p>Your account has been created suceessfully!</p>
                    )}

                    <button type="button" onClick={navigateToLogIn} className={`${styles.gradientButton}`}>Go Home</button>
                </div>



            </div>
        </div>
    )
}

export default ActivationPage
