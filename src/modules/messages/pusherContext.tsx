import React, { createContext, useContext, ReactNode, useRef } from "react";
import Pusher from "pusher-js";

interface PusherContextProps {
  pusher?: Pusher;
}

const PusherContext = createContext<PusherContextProps | undefined>(undefined);

export const PusherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const pusherRef = useRef<Pusher>(
    new Pusher("3cd1ba9bc8746d6a85f0", { cluster: "ap1" }),
  );

  return (
    <PusherContext.Provider
      value={{
        pusher: pusherRef.current,
      }}
    >
      {children}
    </PusherContext.Provider>
  );
};

export const usePuser = () => {
  const context = useContext(PusherContext);
  if (context === undefined) {
    throw new Error("usePuser must be used within a PusherProvider");
  }
  return context;
};
