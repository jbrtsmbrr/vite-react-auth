import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { PrivateFetch } from "../utils/privateFetch..utils";

export interface AuthenicatedUser {
  id: string;
  name: string;
  lastname: string;
  age: number;
  username: string;
}

const AuthenticationContext = createContext<{
  user: AuthenicatedUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthenicatedUser | null>>;
  loading: boolean;
} | null>(null);

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);

  if (!context)
    throw new Error(
      "useAuthentication must be used within a AuthenticationProvider"
    );

  return context;
};

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthenicatedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      setLoading(true);
      const response = await PrivateFetch("http://localhost:4004/auth/current", {
        credentials: "include",
      });
      const result = (await response.json()) as {
        data: {
          user: AuthenicatedUser | null;
        } | null;
        errors: { message: string }[];
        success: boolean;
      };

      setUser(result?.data?.user ?? null);
      setLoading(false);
    })();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{ user, setUser, loading }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
