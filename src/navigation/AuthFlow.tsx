import React, { useState } from 'react';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

export default function AuthFlow() {
  const [screen, setScreen] = useState<'login' | 'register'>('login');

  if (screen === 'register') {
    return <RegisterScreen onGoLogin={() => setScreen('login')} />;
  }
  return <LoginScreen onGoRegister={() => setScreen('register')} />;
}
