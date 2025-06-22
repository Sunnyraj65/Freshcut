import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return <SignIn path="/sign-in" routing="path" />;
};

export default SignInPage;
