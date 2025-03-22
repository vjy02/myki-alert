import Hero from "@/components/hero";

export default async function Home() {
  return (
    <div className="h-full gap-16 w-full flex flex-col justify-start">
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4 self-center">
      </main>
    </div>
  );
}
