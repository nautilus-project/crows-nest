"use client";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Header from "../src/components/header";
import { NextPage } from "next";

const inter = Inter({ subsets: ["latin"] });

const HomePage: NextPage = () => {
  return (
    <>
      <main className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <h1 className="text-4xl font-bold">Crow's Nest</h1>
        <div className="grid grid-cols-2 gap-4">
          <p className="text-black">hello</p>
          <p className="text-black">hello</p>
        </div>
      </main>
    </>
  );
};

export default HomePage;
