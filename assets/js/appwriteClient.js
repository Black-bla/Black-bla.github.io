// Appwrite client initialization
// Replace the placeholder values below with your real endpoint + project ID.
// These are safe to expose for a public web app (DO NOT put API keys here).

import { Client, Account, ID } from 'https://cdn.jsdelivr.net/npm/appwrite@13.0.0/dist/esm/sdk.min.js';

// Appwrite configuration
const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1'; // Updated to main cloud endpoint
const APPWRITE_PROJECT_ID = '68da57fb00310e024717'; // Your project ID

// Validate configuration
if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID) {
  console.error('Appwrite configuration missing. Please set APPWRITE_ENDPOINT and APPWRITE_PROJECT_ID.');
}

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

// For development, you might want to add these for better debugging:
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  // Add localhost to your Appwrite project's platforms in the console
  console.log('Development mode detected. Make sure localhost is added to your Appwrite project platforms.');
}

const account = new Account(client);

// Helper function to handle Appwrite errors
export function handleAppwriteError(error) {
  console.error('Appwrite Error:', error);
  
  // Common error messages that are user-friendly
  const errorMessages = {
    'user_not_found': 'User not found. Please check your credentials.',
    'user_invalid_credentials': 'Invalid email or password.',
    'user_blocked': 'Your account has been blocked. Please contact support.',
    'general_argument_invalid': 'Invalid input provided.',
    'user_email_already_exists': 'An account with this email already exists.',
    'user_password_mismatch': 'Passwords do not match.',
    'general_rate_limit_exceeded': 'Too many requests. Please wait a moment.',
    'general_service_disabled': 'Authentication service is currently unavailable.',
    'project_unknown': 'Project configuration error. Please contact support.'
  };
  
  // Extract error type from Appwrite error
  const errorType = error.type || error.code;
  return errorMessages[errorType] || error.message || 'An unexpected error occurred.';
}

export { client, account, ID };
