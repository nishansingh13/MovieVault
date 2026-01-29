import { createContext, useContext, useState } from "react";

const ConfigContext = createContext();

export const useConfig = () => {
    return useContext(ConfigContext);
};

export const ConfigProvider = ({ children }) => {
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [hide, setHide] = useState(false);

    const config = {
    
        server: "https://movievault-pxb0.onrender.com",
        imageBaseUrl: "https://image.tmdb.org/t/p/original",
        isSearching,
        setIsSearching,
        searchResults,
        setSearchResults,
        hide,
        setHide
    };

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
};
