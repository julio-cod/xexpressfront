import * as React from 'react';
import DrawersMenuUserAdmin from '../../components/menu/DrawersMenuUserAdmin';
import DrawersMenuUser from '../../components/menu/DrawersMenuUser';
import { /*BrowserRouter as Router,*/ Route, Routes } from "react-router-dom";
import Home from '../home/home';

export default function PrincipalPage() {

    return (
        <div >
        <Routes>
        <Route path="/*" element={<DrawersMenuUserAdmin />} />
        <Route path="/Home/*" element={<Home />} />
        <Route path="/DrawersMenuUserAdmin/*" element={<DrawersMenuUserAdmin />} />
        <Route path="/DrawersMenuUser/*" element={<DrawersMenuUser />} />
        </Routes>
        </div>
    );
}