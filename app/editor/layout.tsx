"use client";
import idl from "@/src/idl/predictiongame.json";
import { Popover } from "@headlessui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const wallet = useWallet();
  return (
    <div>
      {wallet.connected ? (
        <div className="">
          <div className="bg-black w-full">
            <Popover.Group className="flex lg:gap-x-12 gap-x-4 mx-auto max-w-7xl p-6 lg:px-8">
              {idl.accounts.map((account) => (
                <Link
                  href={`/editor/${account.name}`}
                  className="text-sm font-semibold leading-6 text-white hover:text-gray-300"
                >
                  {account.name}
                </Link>
              ))}
            </Popover.Group>
          </div>
          {children}
        </div>
      ) : (
        <div>
          <p>Please connect your wallet</p>
        </div>
      )}
    </div>
  );
}
