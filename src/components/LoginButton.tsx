"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const LoginButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Connecté : {session.user?.email}</p>
        <button onClick={() => signOut()}>Se déconnecter</button>
      </>
    );
  }

  return (
    <button onClick={() => signIn("google")}>Se connecter avec Google</button>
  );
};

export default LoginButton;
