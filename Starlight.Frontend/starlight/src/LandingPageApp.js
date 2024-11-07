import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button/new';
import TextField from '@atlaskit/textfield';
import './styleoflandingpage.css'; 
import axios from 'axios';
import Background from './assets/background-image/backgroundd.png';
import ModalBackground from './assets/background-image/pur.png';
import GirlImage from './assets/modal-image/girlimage.png'; 
import LogoImage from './assets/background-image/logoo.png';

const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
  font-family: 'Anta', sans-serif; 
  margin: 0;
  padding: 0;
  overflow: hidden; 
`;

const ModalTitle = styled.h2`
  position: absolute;
  top: 40px; 
  left: 205px; 
  text-align: center;
`;


const ButtonContainer = styled.div`
  display: flex; 
  justify-content: flex-start; 
  margin-top: 30px; 
  width: 100%; 
`;

const BackgroundLandingPage = styled.div`
  background-image: url(${Background});
  position: relative;
  height: 100vh; 
  width: 100%; 
  background-size: cover;
  background-position: center;
  z-index: 0;
`;

const ModalBackground2 = styled.div`
  background-image: url(${ModalBackground});
  background-size: cover; 
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 0; 
  width: 32%; 
  height: 100%;
  object-fit: cover; 
`;

const LogoImage2 = styled.img`
  position: absolute;
  top: 316px; 
  right: 335px; 
  width: 75px; 
  height: 95px;
  z-index: 0; 
`;


const GirlImage2 = styled.img`
  width: auto; 
  height: 100%; 
  object-fit: cover; 
  border-radius: 10px; 
  position: absolute; 
  bottom: 0; 
  right: 0; 
  z-index: 1;
`;

const SignUpButton = styled.button`
  margin-left: 10px;
  padding: 20px 30px;
  background-color: white; 
  color: black; 
  border: none;
  border-radius: 35px;
  font-family: 'Anta', sans-serif;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    background-color: #841EFC;
    color: white 
  }
`;

const LoginButton = styled.button`
  margin-left: 10px;
  padding: 20px 30px;
  background-color: #841EFC; 
  color: white; 
  border: none;
  border-radius: 35px;
  cursor: pointer;
  font-family: 'Anta', sans-serif;
  font-size: 25px;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const NavButtons = styled.div`
  display: flex;
  justify-content: flex-end; 
  font-family: 'Anta', sans-serif;
  padding: 20px;
  z-index: 1; 
`;


const Modal = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0.92;
`;

const ModalContent = styled.div`
  display: flex; 
  background-color: #ffffff;
  margin: 8% auto;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 80%;
  max-width: 1000px;
  position: relative; 
`;


const TextFieldContainer = styled.div`
  margin: 10px 0; 
  width: 100%; 
  text-align: left;
  margin-bottom: 61px;
  margin-top: -30px;
  
  label {
    display: flex; 
    margin-bottom: 10px; 
  }
`;

const FormContainer = styled.div`
  flex: 2; 
  padding: 120px; 
  padding-left: 2px; 
  display: flex; 
  flex-direction: column; 
  align-items: flex-start; 
  margin-left: 20px;
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right; 
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  margin: 10px;

  &:hover,
  &:focus {
    color: black; 
  }
`;

const SubmitButton = styled.button`
  background-color: #841EFC; 
  color: white; 
  border: none; 
  padding: 13px 190px; 
  border-radius: 5px; 
  cursor: pointer; 
  margin-top: -35px; 
  width: 200%;
  display: block;
  margin-left: 0px;
  align-self: flex-start;
  transition: background-color 0.3s ease; 

  &:hover {
    background-color: #a135ff; 
  }
`;


const PlayButton = styled.button`
  display: flex; 
  align-items: center;
  padding: 25px 40px; 
  border-radius: 55px; 
  background-color: #67D920; 
  color: black; 
  font-size: 1.6rem; 
  font-family: 'Adlam Display', sans-serif; 
  border: none; 
  cursor: pointer; 
  transition: all 0.3s ease; 
  margin-top: 45px;
  z-index: 5;
  margin-left: 320px;

 &:hover {
    background-color: black; 
    color: #67D920; 

    div {
      background-color: #67D920; 
    }

    .play-icon {
      color: black; 
    }
  }
`;

const PlayIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px; 
  height: 50px; 
  background-color: black; 
  border-radius: 50%; 
  margin-right: 15px; 

  .play-icon {
    font-size: 1.8rem; 
    color: #67D920; 
  }
`;


const Hero = styled.div`
  text-align: left; 
  padding: 15px 20px; 
  z-index: 1; 

  h1 {
    font-size: 11.5vw;
    margin: 0;
    margin-left: 60px;
    font-family: 'Protest Revolution'; 
    color: #841efc; 
    margin-top: 30px
  }

  h2 {
    font-size: 8vw;
    margin: 0;
    margin-left: 210px;
    font-family: 'Protest Revolution'; 
    color: #fffdfd; 
  }
`;

const LandingPageApp = () => {
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState(''); 
  const [loginPassword, setLoginPassword] = useState(''); 
  const [data, setData] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); 

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000); 

      return () => clearTimeout(timer); 
    }
  }, [showSuccessModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://cluster1.swyrin.id.vn/api/register', { handle, email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('API response:', response);
      setData(response.data); 
      setShowSignUpModal(false); 
      setShowSuccessModal(true); 
  
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Registration failed. Please try again.');
    }
  };
  

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('/api/login', { email: loginEmail, password: loginPassword }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setData(response.data);
        setIsLoggedIn(true);
        setShowLoginModal(false);
      })
      .catch(error => console.error('Error logging in:', error));
  };

  const handlePlayButtonClick = () => {
    if (!isLoggedIn) {
      setShowNotificationModal(true);
    } else {
      window.location.href = 'App.js';
    }
  };

  const closeModal = () => {
    setShowLoginModal(false);
    setShowSignUpModal(false);
    setShowNotificationModal(false);
    setShowSuccessModal(false);
  };

  const FormWrapper = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: flex-start; 

`;

  const switchToLogin = () => {
    setShowSignUpModal(false);
    setShowLoginModal(true);
  };

  const switchToSignUp = () => {
    setShowLoginModal(false);
    setShowSignUpModal(true);
  };

  return (
    <AppContainer>
      <BackgroundLandingPage>
        <header>
          <NavButtons>
            <SignUpButton onClick={() => setShowSignUpModal(true)}>Sign up</SignUpButton>
            <LoginButton onClick={() => setShowLoginModal(true)}>Log in</LoginButton>
          </NavButtons>
        </header>
        <Hero>
          <h1>Star</h1>
          <h2>Light</h2>
        </Hero>
        <PlayButton onClick={handlePlayButtonClick} style={{ position: 'relative', zIndex: 2 }}>
          <PlayIconContainer>
            <span className="play-icon">▶</span>
          </PlayIconContainer>
          Start Game
        </PlayButton>
      </BackgroundLandingPage>
  
      {showSignUpModal && (
        <Modal>
          <ModalContent>
            <ModalBackground2 />
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <GirlImage2 src={GirlImage} alt="Girl" /> 
            <LogoImage2 src={LogoImage} alt="Logo" />
            <ModalTitle>Create Account</ModalTitle>
            <FormContainer style={{ flexDirection: 'column', justifyContent: 'space-between', height: '535px' }}>
              <form onSubmit={handleSubmit}>
                <TextFieldContainer>
                  <label htmlFor="playerName">Player Name:</label>
                  <TextField
                    id="playerName"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    required
                  />
                </TextFieldContainer>
                <TextFieldContainer>
                  <label htmlFor="email">Email:</label>
                  <TextField
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </TextFieldContainer>
                <TextFieldContainer>
                  <label htmlFor="password">Password:</label>
                  <TextField
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </TextFieldContainer>
                <FormWrapper>
                  <ButtonContainer>
                    <SubmitButton type="submit">Create Account</SubmitButton>
                  </ButtonContainer>
                  <div style={{ position: 'relative', right: '0px', marginTop: '10px', textAlign: 'left' }}>
                    <p style={{ margin: '0', display: 'block', opacity: 0.7 }}>
                      Already have an account? <span style={{ cursor: 'pointer', color: '#0090AA' }} onClick={switchToLogin}>Log In</span>.
                    </p>
                  </div>
                </FormWrapper>
              </form>
            </FormContainer>
          </ModalContent>
        </Modal>
      )}

{showLoginModal && (
  <Modal>
    <ModalContent>
      <ModalBackground2 />
      <CloseButton onClick={closeModal}>&times;</CloseButton>
      <GirlImage2 src={GirlImage} alt="Girl" /> 
      <LogoImage2 src={LogoImage} alt="Logo" />
      <ModalTitle style={{ marginLeft: '50px' }}>Log In</ModalTitle>
      <form onSubmit={handleLogin}>
        <FormContainer style={{ flexDirection: 'column', height: '403px', justifyContent: 'space-between' }}>
          <TextFieldContainer>
            <label htmlFor="loginEmail">Email:</label>
            <TextField
              id="loginEmail"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
          </TextFieldContainer>

          <TextFieldContainer>
  <label htmlFor="loginPassword" style={{ display: 'block', marginBottom: '12px', fontSize: '16px', width: '471px' }}>
    Password :</label>
            <TextField
              id="loginPassword"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
          </TextFieldContainer>
        </FormContainer>

        <FormWrapper>
          <ButtonContainer>
          <div style={{ marginTop: '-80px', marginBottom: '165px' }}>
              <SubmitButton type="submit" style={{ width: '470px', marginLeft: '22px' }}>Log In</SubmitButton>
            </div>
          </ButtonContainer>

          <div style={{ position: 'relative', right: '-20px', marginTop: '10px', textAlign: 'left' }}>
            <p style={{ margin: '0', display: 'block', opacity: 0.7, marginTop: '-150px', marginRight:'0px' }}>
              Don't have an account? <span style={{ cursor: 'pointer', color: '#0090AA' }} onClick={switchToSignUp}>Sign Up</span>.
            </p>
            <p style={{ margin: '0', display: 'block', opacity: 0.5, marginTop: '-125px', textAlign: 'right', fontStyle: 'italic', marginRight: '-220px' }}>
              <a href="/forgot-password" style={{ color: '#686161', textDecoration: 'underline', cursor: 'pointer' }}>Forgot your password?</a>
            </p>
          </div>
        </FormWrapper>
      </form>
    </ModalContent>
  </Modal>
)}

{showSuccessModal && (
        <Modal>
          <ModalContent style={{ marginTop: '370px' }}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <p>Register successful. Please log in.</p>
            </div>
          </ModalContent>
        </Modal>
      )}


      {showNotificationModal && (
        <Modal>
          <ModalContent style={{ marginTop: '370px' }}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <p>You need to log in to play the game.</p>
            </div>
          </ModalContent>
        </Modal>
      )}
      {data && <div>{JSON.stringify(data)}</div>}
    </AppContainer>
  );
};

export default LandingPageApp;

