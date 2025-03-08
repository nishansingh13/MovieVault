import { createContext, useContext } from "react";

const ConfigContext = createContext();

export const useConfig = () => {
    return useContext(ConfigContext);
};

export const ConfigProvider = ({ children }) => {
    const config = {
        server: "http://localhost:5000",
        imageBaseUrl: "https://image.tmdb.org/t/p/original"
    };

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
};
