import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import FooterPelanggan from './FooterPelanggan';
import NavbarPelanggan from './NavbarPelanggan';


const GuestLayout = () => {

  return (
    <>
      <NavbarPelanggan />

      <main style={{ minHeight: '80vh' }}>
        <Outlet />
      </main>

      {/* Footer khusus pelanggan */}
      <FooterPelanggan />

      {/* Footer umum guest (ungu) */}
      {/* <FooterGuest /> */}
    </>
  );

};

export default GuestLayout;