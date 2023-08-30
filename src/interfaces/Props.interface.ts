export interface LanguageFCComponentsProps {
  lang: string;
}
export interface TextFCComponentsProps {
  textTr: {
    [key: string]: any;
  };
}
export interface NewsTextFCComponentsProps {
  textTr: {
    id: {
      name: string;
      text: string;
    };
  };
}

export interface LngTextFCComponentsProps {
  lang: string;
  textTr: {
    [key: string]: any;
  };
}
export interface NavBarFCComponentsProps {
  lang: string;
  textTr: {
    [key: string]: any;
  };
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NavItemFCComponentsProps {
  text: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  href: string;
  pathName: string;
}

export interface CountdownTimerProps {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}
export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface ShipList {
  id: number;
  name: string;
  img: string;
}

export interface LanguageShipComponentsProps {
  lang: string;
  id: string;
}
