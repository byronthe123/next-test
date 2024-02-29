import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
// import dayjs from 'dayjs';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

// dayjs.extend(utc);
// dayjs.extend(timezone);
// dayjs.extend(duration);
// dayjs.extend(relativeTime);


export default function App({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    );
}
