'use client';

import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import styled from "styled-components";

// export default withPageAuthRequired(function App () {
//     return (
//         <Container>
//             <Link href={'/settings'}>Settings</Link>
//         </Container>
//     );
// });

export default function Main () {
    return (
        <Container>
            <Link href={'/settings'}>Settings</Link>
        </Container>
    );
};


const Container = styled.div`
    
`;