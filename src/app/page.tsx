import Image from "next/image";

interface I_Car {
    name: string;
    price: string;
    img: string;
}

const showCar = [
    {
        name: "Mazda CX-3",
        price: "85.9 萬 ~ 92.9 萬元",
        img: "/cx3.jpg",
    },
    {
        name: "Mazda 3",
        price: "79.9 萬 ~ 101.8 萬元",
        img: "/mazda3.jpg",
    },
    {
        name: "Mazda CX-5",
        price: "104.9 萬 ~ 139.9 萬元",
        img: "/cx5.jpg",
    },
    {
        name: "Mazda CX-60",
        price: "118.9 萬 ~ 171.9 萬元",
        img: "/cx60.jpg",
    },
];

function CarCard({ name, price, img }: I_Car) {
    return (
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <img
                src={img}
                alt={name}
                className="w-full h-32 object-cover mb-4 rounded"
            />
            <div className="text-lg font-semibold mb-2">{name}</div>
            <div className="text-gray-500 mb-4">${price}</div>
            <a
                href="/info"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer">
                View
            </a>
        </div>
    );
}

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] h-[calc(100vh-45px)]  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col items-center gap-[32px] row-start-2">
                <h1 className="text-4xl font-bold">歡迎來到Car-manager</h1>
                <p className="text-lg text-gray-600">
                    提供您購車的建議與車款資訊。
                </p>
                {/* 熱門車款卡片列表 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
                    {showCar.map((car) => (
                        <CarCard
                            key={car.name}
                            name={car.name}
                            price={car.price}
                            img={car.img}
                        />
                    ))}
                </div>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer">
                    <Image
                        aria-hidden
                        src="/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    Learn
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer">
                    <Image
                        aria-hidden
                        src="/window.svg"
                        alt="Window icon"
                        width={16}
                        height={16}
                    />
                    Examples
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer">
                    <Image
                        aria-hidden
                        src="/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                    />
                    Go to nextjs.org →
                </a>
            </footer>
        </div>
    );
}
