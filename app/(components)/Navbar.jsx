import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <div className="absolute bg-black right-3 top-3">
            <Link href="https://github.com/itsmeprinceyt/currency_exchange" target="_blank">
                <Image src="/github-mark-white.png" 
                height={20}
                width={20}
                alt="github logo" />
            </Link>
        </div>
    );
}