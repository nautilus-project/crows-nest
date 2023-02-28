/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from "@metaplex-foundation/beet";
import * as web3 from "@solana/web3.js";
import * as beetSolana from "@metaplex-foundation/beet-solana";

/**
 * Arguments used to create {@link Game}
 * @category Accounts
 * @category generated
 */
export type GameArgs = {
  id: number;
  startTimestamp: beet.bignum;
  startPrice: beet.bignum;
  endPrice: beet.bignum;
  ended: boolean;
  bump: number;
};

export const gameDiscriminator = [27, 90, 166, 125, 74, 100, 121, 18];
/**
 * Holds the data for the {@link Game} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class Game implements GameArgs {
  private constructor(
    readonly id: number,
    readonly startTimestamp: beet.bignum,
    readonly startPrice: beet.bignum,
    readonly endPrice: beet.bignum,
    readonly ended: boolean,
    readonly bump: number
  ) {}

  /**
   * Creates a {@link Game} instance from the provided args.
   */
  static fromArgs(args: GameArgs) {
    return new Game(
      args.id,
      args.startTimestamp,
      args.startPrice,
      args.endPrice,
      args.ended,
      args.bump
    );
  }

  /**
   * Deserializes the {@link Game} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0
  ): [Game, number] {
    return Game.deserialize(accountInfo.data, offset);
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link Game} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig
  ): Promise<Game> {
    const accountInfo = await connection.getAccountInfo(
      address,
      commitmentOrConfig
    );
    if (accountInfo == null) {
      throw new Error(`Unable to find Game account at ${address}`);
    }
    return Game.fromAccountInfo(accountInfo, 0)[0];
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  static gpaBuilder(
    programId: web3.PublicKey = new web3.PublicKey(
      "2gUBz87HJU1w1JWWvNnZ7yjWHJZLhABdj1NrmAUU2A2z"
    )
  ) {
    return beetSolana.GpaBuilder.fromStruct(programId, gameBeet);
  }

  /**
   * Deserializes the {@link Game} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [Game, number] {
    return gameBeet.deserialize(buf, offset);
  }

  /**
   * Serializes the {@link Game} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return gameBeet.serialize({
      accountDiscriminator: gameDiscriminator,
      ...this,
    });
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link Game}
   */
  static get byteSize() {
    return gameBeet.byteSize;
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link Game} data from rent
   *
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    connection: web3.Connection,
    commitment?: web3.Commitment
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(
      Game.byteSize,
      commitment
    );
  }

  /**
   * Determines if the provided {@link Buffer} has the correct byte size to
   * hold {@link Game} data.
   */
  static hasCorrectByteSize(buf: Buffer, offset = 0) {
    return buf.byteLength - offset === Game.byteSize;
  }

  /**
   * Returns a readable version of {@link Game} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      id: this.id,
      startTimestamp: (() => {
        const x = <{ toNumber: () => number }>this.startTimestamp;
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      startPrice: (() => {
        const x = <{ toNumber: () => number }>this.startPrice;
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      endPrice: (() => {
        const x = <{ toNumber: () => number }>this.endPrice;
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      ended: this.ended,
      bump: this.bump,
    };
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const gameBeet = new beet.BeetStruct<
  Game,
  GameArgs & {
    accountDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ["accountDiscriminator", beet.uniformFixedSizeArray(beet.u8, 8)],
    ["id", beet.u8],
    ["startTimestamp", beet.i64],
    ["startPrice", beet.i64],
    ["endPrice", beet.i64],
    ["ended", beet.bool],
    ["bump", beet.u8],
  ],
  Game.fromArgs,
  "Game"
);
