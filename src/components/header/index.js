"use client";
import Link from "next/link";

export default function Header() {

  return (
    <header className="p-4 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto">
            <h1>Odds Scanner</h1>
            <nav>
              <ul className="flex space-x-4">
                <li><Link href="/">UK</Link></li>
                <li><Link href="/pt">PT</Link></li>
                <li><Link href="/es">ES</Link></li>
                <li><Link href="/br">BR</Link></li>
                <li><Link href="/us">US</Link></li>
                <li><Link href="/fr">FR</Link></li>
              </ul>
            </nav>

            <nav>
              <ul className="flex space-x-4">
                <li><Link href="/br/contato">contato</Link></li>
                <li><Link href="/br/artigos">Artigos</Link></li>
              </ul>
            </nav>
        </div>
    </header>
  );
}
