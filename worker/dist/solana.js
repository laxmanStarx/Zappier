"use strict";
// import { Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction, PublicKey, sendAndConfirmTransaction, Connection } from "@solana/web3.js";
// import base58 from "bs58";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSol = void 0;
// const connection = new Connection("https://api.mainnet-beta.solana.com", "finalized");
function sendSol(to, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        //     const keypair = Keypair.fromSecretKey(base58.decode((process.env.SOL_PRIVATE_KEY ?? "")))
        //     console.log(keypair.publicKey);
        //     const transferTransaction = new Transaction().add(
        //         SystemProgram.transfer({
        //           fromPubkey: keypair.publicKey,
        //           toPubkey: new PublicKey(to),
        //           lamports: parseFloat(amount) * LAMPORTS_PER_SOL, // 0.1 => 10 ^ 8
        //         })
        //     );
        //     await sendAndConfirmTransaction(connection, transferTransaction, [keypair]);
        //     console.log("sol Sent!")
    });
}
exports.sendSol = sendSol;
