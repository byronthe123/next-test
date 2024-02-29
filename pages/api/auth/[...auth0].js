import { handleAuth } from '@auth0/nextjs-auth0';

// import auth0 from '../../../utils/auth0';

export default async function auth(req, res) {
  try {
    await handleAuth(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
