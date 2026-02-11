/**
 * MaritaniLogo — Philosophical SVG Logo
 *
 * Filosofi:
 * "Maritani" = Maritim (laut) + Tani (pertanian)
 *
 * Logo ini menggabungkan dua elemen alam dalam satu bentuk organik:
 * 1. GELOMBANG (bawah) — melambangkan lautan, sumber kehidupan nelayan
 * 2. DAUN/TUNAS (atas) — melambangkan pertanian, pertumbuhan berkelanjutan
 *
 * Keduanya menyatu di tengah membentuk simbol "infinity" / aliran tak terputus,
 * merepresentasikan siklus ekosistem yang saling terhubung antara laut dan darat,
 * serta hubungan timbal balik antara produsen dan konsumen.
 *
 * Bentuk bulat keseluruhan melambangkan keutuhan, komunitas, dan keberlanjutan.
 */

interface MaritaniLogoProps {
    className?: string;
    size?: number;
}

export function MaritaniLogo({ className = "", size = 24 }: MaritaniLogoProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Maritani Logo"
        >
            {/* Outer circle — komunitas & keutuhan */}
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" opacity="0.15" />

            {/* Wave / Gelombang — Maritim (laut) */}
            <path
                d="M10 28 C14 24, 18 32, 22 26 C26 20, 30 30, 34 24 C36 21, 38 23, 38 23"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
            />

            {/* Leaf stem — batang tunas tumbuh dari gelombang */}
            <path
                d="M24 28 C24 22, 24 18, 24 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
            />

            {/* Leaf right — daun kanan (pertanian) */}
            <path
                d="M24 20 C28 16, 32 16, 33 18 C34 20, 30 22, 24 22"
                fill="currentColor"
                opacity="0.85"
            />

            {/* Leaf left — daun kiri (keseimbangan) */}
            <path
                d="M24 16 C20 12, 16 12, 15 14 C14 16, 18 18, 24 18"
                fill="currentColor"
                opacity="0.6"
            />

            {/* Root dots — akar/benih di bawah gelombang */}
            <circle cx="21" cy="33" r="1.2" fill="currentColor" opacity="0.3" />
            <circle cx="24" cy="35" r="1" fill="currentColor" opacity="0.2" />
            <circle cx="27" cy="33" r="1.2" fill="currentColor" opacity="0.3" />
        </svg>
    );
}

/**
 * MaritaniLogoMark — Versi compact untuk favicon-sized usage
 */
export function MaritaniLogoMark({ className = "", size = 20 }: MaritaniLogoProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Maritani"
        >
            {/* Simplified wave */}
            <path
                d="M6 20 C9 17, 12 23, 16 18 C20 13, 23 21, 26 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
            />

            {/* Stem */}
            <path
                d="M16 19 L16 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />

            {/* Leaf */}
            <path
                d="M16 13 C19 10, 22 10, 23 12 C24 14, 20 15, 16 15"
                fill="currentColor"
                opacity="0.8"
            />
            <path
                d="M16 11 C13 8, 10 8, 9 10 C8 12, 12 13, 16 13"
                fill="currentColor"
                opacity="0.55"
            />
        </svg>
    );
}
