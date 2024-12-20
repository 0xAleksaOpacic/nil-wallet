import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PopupRoutes } from './routes.ts';
import WalletDetails from '../components/pages/Popup/WalletDetails.tsx';
import TopUp from '../components/pages/Popup/TopUp.tsx';
import PopUpLayout from '../components/layouts/PopUpLayout.tsx';
import SendTokens from '../components/pages/Popup/SendTokens.tsx';
import Network from '../components/pages/Popup/Network.tsx';
import SignAndSend from '../components/pages/Popup/SignSend.tsx';

const PopUpRouter = () => (
  <HashRouter>
    <Routes>
      <Route path={PopupRoutes.BASE} element={<PopUpLayout />}>
        <Route index element={<WalletDetails />} />
        <Route path={PopupRoutes.TOP_UP} element={<TopUp />} />
        <Route path={PopupRoutes.SEND_TOKENS} element={<SendTokens />} />
        <Route path={PopupRoutes.NETWORK} element={<Network />} />
        <Route path={PopupRoutes.SIGN_SEND} element={<SignAndSend />} />
      </Route>
      <Route path="*" element={<Navigate to={PopupRoutes.BASE} />} />
    </Routes>
  </HashRouter>
);

export default PopUpRouter;
