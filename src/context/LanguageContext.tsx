import { createContext } from 'react';

import { type DisplayLanguage } from '@/constants/display-languages';

const LanguageContext = createContext<DisplayLanguage>('fi');
export default LanguageContext;
