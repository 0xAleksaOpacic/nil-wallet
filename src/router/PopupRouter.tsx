import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PopupRoutes } from './routes.ts';
import WalletDetails from '../components/pages/Popup/WalletDetails.tsx';
import PopUpLayout from '../components/layouts/PopUpLayout.tsx';


const PopUpRouter = () => (
  <HashRouter>
    <Routes>
      <Route path={PopupRoutes.BASE} element={<PopUpLayout />}>
        <Route index element={<WalletDetails />} />
      </Route>
      <Route path="*" element={<Navigate to={PopupRoutes.BASE}  />} />
    </Routes>
  </HashRouter>
);

export default PopUpRouter;
