// Appwrite client initialization
// Replace the placeholder values below with your real endpoint + project ID.
// These are safe to expose for a public web app (DO NOT put API keys here).

import { Client, Account, ID } from 'https://cdn.jsdelivr.net/npm/appwrite@13.0.0/dist/esm/sdk.min.js';

const APPWRITE_ENDPOINT = 'https://fra.cloud.appwrite.io/v1'; // e.g. 'https://cloud.appwrite.io/v1'
const APPWRITE_PROJECT_ID = '68da57fb00310e024717'; // <-- set this

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

const account = new Account(client);

export { client, account, ID };
