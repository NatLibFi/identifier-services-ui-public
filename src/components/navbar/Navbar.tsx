import DesktopNavigationMenu from '@/components/navbar/DesktopNavigationMenu';
import MobileNavigationMenu from '@/components/navbar/MobileNavigationMenu';

function Navbar() {
  return (
    <>
      {/* Note: only one of the navigations is displayed. Selection is based on screen size. */}
      <DesktopNavigationMenu />
      <MobileNavigationMenu />
    </>
  );
}

export default Navbar;
