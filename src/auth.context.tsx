import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "./backend/auth/auth.service";
import { app } from "./backend/config";
import { ReactChannelIO } from "react-channel-plugin";

const auth = getAuth(app);

interface AuthContextType {
  user: User | null;
  userRef: any;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRef, setUserRef] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const docRef = await getUser(user.uid);
        setUserRef(docRef!.ref);
      } else {
        setUser(null);
        setUserRef(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userRef }}>
      <ReactChannelIO
        pluginKey={"fa60ac5a-5ab5-4552-a565-d39bd88d400c"}
        autoBoot
        mobileMessengerMode="iframe"
        // customLauncherSelector="#channelTalk"
        language="ko"
      >
        {loading ? <div>로딩 중...</div> : children}
      </ReactChannelIO>
    </AuthContext.Provider>
  );
};
