import React from 'react';
import './mpp_login_layout.css';
import { BoType } from '../../components/BoType';
interface LoginLayoutProps {
    boType: BoType;
    onPressLoginButon: (() => void) | null;
}
declare const ComponentName: React.FC<LoginLayoutProps>;
export default ComponentName;
