import { Button, Icon } from 'semantic-ui-react'
import { useFirestore } from '../../hooks/firestore/useFirestore'
import { useState } from 'react';
import { AuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { Timestamp } from 'firebase/firestore';
import { auth } from '../../config/firebase';

export default function SocialLogin() {
    const [status, setStatus] = useState<any>({
        loading: false,
        provider: null
    })
    const { set } = useFirestore('profiles');

    async function handleSocialLogin(selectedProvider: string) {
        setStatus({ loading: true, provider: selectedProvider });
        let provider: AuthProvider;

        if (selectedProvider === 'google') {
            provider = new GoogleAuthProvider();
        } else {
            // Handle unsupported provider
            setStatus({ loading: false, provider: null });
            return;
        }

        try {
            if (provider) {
                const result = await signInWithPopup(auth, provider);
                console.log(result);
                if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime) {
                    await set(result.user.uid, {
                        displayName: result.user.displayName,
                        email: result.user.email,
                        createdAt: Timestamp.now(),
                        photoURL: result.user.photoURL
                    })
                }
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setStatus({ loading: false, provider: null })
        }
    }

    return (
        <>
            <Button
                type='button'
                fluid color='google plus'
                style={{ marginBttom: 10 }}
                loading={status.loading && status.provider === 'google'}
                onClick={() => handleSocialLogin('google')}
            >
                <Icon name='google' /> Login with Google
            </Button>
        </>
    );
}
