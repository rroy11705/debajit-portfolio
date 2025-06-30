// File path: src/components/layout/Header.tsx
import Link from 'next/link';
import { Navigation } from './Navigation';
import { MobileMenu } from './MobileMenu';
import LetsTalkModal from './LetsTalkModal';

export const Header = () => {
  return (
    <div className="fixed bg-white border-b border-solid border-black top-0 left-0 right-0 z-50">
      <header className="container mx-auto flex justify-between items-center py-4 px-4 md:px-0">
        <Link href="/" className="flex items-center font-display font-extrabold text-black text-xl md:text-2xl">
          Debajit Dey
        </Link>

        <Navigation
          items={[
            { label: 'About', href: '#about' },
            { label: 'Services', href: '#services' },
            { label: 'Portfolio', href: '#portfolio' },
            { label: 'Contact', href: '#contact' },
          ]}
        />

        <div className='flex flex-row items-center gap-4'>
          <MobileMenu
            // TODO: Add MobileMenu props
            items={[
              { label: 'About', href: '#about' },
              { label: 'Services', href: '#services' },
              { label: 'Portfolio', href: '#portfolio' },
              { label: 'Contact', href: '#contact' },
            ]}
          />
          <LetsTalkModal />
        </div>
      </header>
    </div>
  );
};
