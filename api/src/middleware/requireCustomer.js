import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

const requireCustomer = ClerkExpressRequireAuth();

export default requireCustomer;
