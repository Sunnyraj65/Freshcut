import React from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { createRoot } from "react-dom/client";
import App from "./App";
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
import "./styles/tailwind.css";
import "./styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => window.history.pushState(null, '', to)}>
    <App />
  </ClerkProvider>
);
