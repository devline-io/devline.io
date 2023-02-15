import Image from 'next/image';
import Link from 'next/link';

const navItems = ['Catalog', 'About', 'Pricing'];

export default function Navbar() {
    return (
        <div>
            <Image src='/logo.svg' width={200} height={35}/>
            <ul>
                {navItems.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
            <button>Sign Up</button>
        </div>
    );
}