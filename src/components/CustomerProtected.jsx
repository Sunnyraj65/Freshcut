import React from 'react';
import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';

const CustomerProtected = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 space-y-6">
          <p className="text-text-secondary text-center max-w-sm">
            You need to be signed in to view this page.
          </p>
          <div className="w-full max-w-sm">
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" redirectUrl={window.location.pathname} />
          </div>
          <button
            className="mt-4 text-primary underline"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </SignedOut>
    </>
  );
};

export default CustomerProtected;
