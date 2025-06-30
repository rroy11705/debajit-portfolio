// File path: src/components/layout/Footer.tsx
import Link from 'next/link';

export const Footer = () => {
  // TODO: Fetch global settings for footer content

  return (
    <footer className="bg-secondary-900 bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-row items-start justify-between gap-8">
          {/* Logo and company info */}
          <div className='w-full md:w-1/4'>
            <Link href="/" className="flex items-center font-display font-extrabold text-white text-xl md:text-2xl mb-4">
              Debajit Dey
            </Link>
            <p className="text-gray-400">
              {/* TODO: Footer text from CMS */}
              Transforming ideas into dynamic visuals
              that captivate and communicate.
            </p>
          </div>

          {/* Contact info */}
          <div className='flex flex-row items-start gap-12'>
            <div className='flex flex-col items-start'>
              <h4 className="text-xl font-bold mb-4 text-white">Contact</h4>
              
              <Link target='_black' href="mailto:email@example.com" className="text-white mb-2">Email: email@example.com</Link>
              <Link target='_black' href="tel:+919876543210" className="text-white mb-4">Call: +91 9876 543 210</Link>
            </div>
            <div className='flex flex-col items-start'>
              <h4 className="text-xl font-bold mb-4 text-white">Social</h4>
              
              <Link target='_black' href="/" className="text-white mb-2">LINKEDIN</Link>
              <Link target='_black' href="/" className="text-white mb-2">INSTAGRAM</Link>
              <Link target='_black' href="/" className="text-white mb-2">BEHANCE</Link>
              <Link target='_black' href="/" className="text-white mb-2">VIMEO</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Fluxon Dynamics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
