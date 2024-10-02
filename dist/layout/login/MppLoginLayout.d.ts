import React from 'react';
import './mpp_login_layout.css';
import { BoType } from '../../components/BoType';
interface LoginLayoutProps {
    boType: BoType;
    onPressLoginButon: (() => void) | null;
    welcomeText: string;
    welcomeTextBold: string;
    welcomeSubtitle: string;
    loginTitle: string;
    loginSubtitle: string;
    buttonText: string;
    codeValue: string;
    inputPlaceHolder: string;
    setCodeValue: (code: string) => void;
    onClickErrorMessage: string;
    setOnClickErrorMessage: (error: string) => void;
}
declare const ComponentName: React.FC<LoginLayoutProps>;
export default ComponentName;
