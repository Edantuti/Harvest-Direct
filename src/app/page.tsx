"use client"

import HomeHeader from "~/components/HomeHeader";

export default  function HomePage() {
  return (
    <main className="">
      <HomeHeader></HomeHeader>
      <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-6xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-slate-50 to-slate-400">Harvest Direct</h2>
        <p className="text-white text-lg text-center">Fresh Produce to your Home direct</p>
      </section>
    </main>
  );
}
