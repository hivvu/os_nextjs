"use client";
import React, { createContext, useContext } from "react";

const ConfigContext = createContext(null);

export function ConfigProvider({ config, children }) {
    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
}

export function useSiteConfig() {
    const config = useContext(ConfigContext);
    if (!config) {
        throw new Error("useSiteConfig must be inside a <ConfigProvider>");
    }
    return config;
}