import './Footer.css';

type FooterProps = {
  variant?: 'public' | 'admin';
};

function Footer({ variant = 'public' }: FooterProps) {
  return (
    <footer className={`footer footer--${variant}`}>
      <p>Made by Yi-Ying Ko © 2026. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
