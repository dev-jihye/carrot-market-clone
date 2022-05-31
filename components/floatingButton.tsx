import Link from 'next/link';

interface FloatingButton {
  children: React.ReactNode;
  href: string;
}
export default function FloatingButton({ children, href }: FloatingButton) {
  return (
    <Link href={href}>
      <a className="fixed bottom-24 right-5 bg-orange-400 rounded-full p-4 shadow-xl text-white hover:bg-orange-500 cursor-pointer transition-colors">
        {children}
      </a>
    </Link>
  );
}
