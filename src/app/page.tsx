import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start shadow-xl">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-foreground">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 opacity-80">
            Looking for a starting point? Head over to{" "}
            <a href="#" className="font-medium underline decoration-button">
              Templates
            </a>.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-button px-5 text-white transition-transform hover:scale-105 md:w-[158px]"
            href="https://vercel.com/new"
          >
            <Image
              className="brightness-0 invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border-2 border-button px-5 text-button transition-colors hover:bg-button hover:text-white md:w-[158px]"
            href="https://nextjs.org/docs"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}