"use client";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Header from "@/src/components/header";
import { NextPage } from "next";
import * as anchor from "@project-serum/anchor";
import idl from "@/src/idl/predictiongame.json";

const accounts = idl.accounts;

const EditorPage: NextPage = () => {
  const connection = new anchor.web3.Connection(
    anchor.web3.clusterApiUrl("devnet"),
    "confirmed"
  );

  return (
    <div>
      <h1>Please open a table</h1>
    </div>
  );
};

export default EditorPage;
