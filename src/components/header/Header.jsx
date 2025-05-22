import Link from "next/link";

export function Header({ config }) {

  return (
    <header className="p-4 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto">
        <h1>Odds Scanner</h1>

        <nav>
          <ul className="flex space-x-4" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '10px' }}>
            <li><Link href="/">Homepage UK</Link></li>
            <li><Link href="/pt">Homepage PT</Link></li>
            <li><Link href="/es">Homepage ES</Link></li>
            <li><Link href="/br">Homepage BR</Link></li>
            <li><Link href="/us">Homepage US</Link></li>
            <li><Link href="/fr">Homepage FR</Link></li>
          </ul>
        </nav>

        <nav>
          <ul className="flex space-x-4" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '10px' }}>
            <li><Link href="/br/artigos">Artigos (BR)</Link></li>
            <li><Link href="/pt/artigos">Artigos (PT)</Link></li>
            <li><Link href="/br/artigos/guias">Guias (BR)</Link></li>
            <li><Link href="/pt/artigos/guias">Guias (PT)</Link></li>
            <li><Link href="/br/artigos/noticias">Noticias (BR)</Link></li>
            <li><Link href="/pt/artigos/noticias">Noticias (PT)</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
