'use client';
import { createContext, useContext } from 'react';

// default language
const LangContext = createContext('uk'); 

export const useLang = () => useContext(LangContext);
export default LangContext;
