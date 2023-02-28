"use client";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Header from "@/src/components/header";
import { NextPage } from "next";
import * as anchor from "@project-serum/anchor";
import idl from "@/src/idl/predictiongame.json";
import * as solq from "@/src/generated";
import { publicKey } from "@project-serum/anchor/dist/cjs/utils";
import { notFound } from "next/navigation";

import { useEffect, useState } from "react";

const accounts = idl.accounts;
const connection = new anchor.web3.Connection(
  anchor.web3.clusterApiUrl("devnet"),
  "confirmed"
);

const EditorPage = ({
  params,
  searchParams,
}: {
  params: { table: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const [tableAccounts, setTableAccounts] = useState<any>([]);
  const connection = new anchor.web3.Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );
  const getTableAccounts = async () => {
    //@ts-ignore
    const toget = solq[params.table];
    if (!toget) {
      notFound();
    }
    const data = await toget
      .gpaBuilder()
      .addFilter(
        "accountDiscriminator",
        solq[params.table.toLowerCase() + "Discriminator"]
      )
      .run(connection);
    if (!data) {
      notFound();
    }
    const accounts = data.map((d) => {
      const value = toget.fromAccountInfo(d.account)[0];
      return { data: value, pubkey: d.pubkey };
    });
    // set tableAccounts to the data and the accounts
    console.log(accounts);
    setTableAccounts(accounts);
  };
  useEffect(() => {
    getTableAccounts();
  }, []);

  return (
    <>
      <main className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                {idl.accounts
                  .filter((account) => account.name === params.table)
                  .map((account) => {
                    return account.type.fields.map((field) => {
                      return (
                        <th
                          key={field.name}
                          scope="col"
                          className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                        >
                          {field.name}
                        </th>
                      );
                    });
                  })}
              </tr>
            </thead>
            <tbody>
              {tableAccounts &&
                tableAccounts.map((account) => {
                  return (
                    // create a row for each account
                    <tr
                      className="border-b border-gray-200 dark:border-gray-700"
                      key={account}
                    >
                      {Object.keys(account.data).map((key) => {
                        // check if the key is an object
                        if (typeof account.data[key] === "object") {
                          // if it is an object, check if it is a public key

                          if (
                            account.data[key].constructor.name === "PublicKey"
                          ) {
                            // if it is a public key, return the base58 string
                            return (
                              <td className="px-6 py-4" key={account.data[key]}>
                                {account.data[key].toBase58()}
                              </td>
                            );
                          }
                          // if it is a bignumber, convert it from an i64 to a number
                          if (account.data[key].constructor.name === "BN") {
                            return (
                              <td className="px-6 py-4" key={account.data[key]}>
                                {account.data[key].toString()}
                              </td>
                            );
                          }
                        } else {
                          return (
                            <td className="px-6 py-4" key={account.data[key]}>
                              {account.data[key]}
                            </td>
                          );
                        }
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default EditorPage;
