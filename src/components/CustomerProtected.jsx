import React from 'react';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

const CustomerProtected = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default CustomerProtected;
