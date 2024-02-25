'use client';
import * as web3 from '@solana/web3.js'
import {useState} from 'react'
import {clusterApiUrl} from "@solana/web3.js";
export default function Home() {
    const [text, setText] = useState('')
    const [balance, setBalance] = useState(0);
    const [address, setAddress] = useState('');
    const [executable, setExecutable] = useState('');
    const addressHandler = async(address: string) => {
        try {
            console.log(address);
            const pubkey = new web3.PublicKey(address);
            setAddress(pubkey.toBase58());
            setExecutable((web3.PublicKey.isOnCurve(pubkey.toBuffer()).toString()));
            const conn = new web3.Connection(clusterApiUrl("devnet"))
            conn.getBalance(pubkey).then(balance => setBalance(balance/web3.LAMPORTS_PER_SOL));
        }
        catch (error) {
            setAddress('')
            setBalance(0)
            setExecutable('')
            alert(error)
        }

    }
    return (
      <div className="flex flex-col items-center h-screen w-screen border border-white rounded-2xl gap-10 p-20">
          <h1 className="text-5xl mt-10">Yet Another Solana Balance Fetcher</h1>
          <div className="flex flex-col items-center">
              <h2 className="text-3xl my-10">
                  Enter your Solana address
              </h2>
              <div className="flex flex-row items-center gap-10">
                  <input id="addressbox" className="bg-gray-300 text-black" type={"text"} value={text} onChange={(e) => setText(e.target.value)}/>
                  <button className="rounded-2xl bg-blue-600 p-1.5 border border-blue-200 shadow-lg" onClick={async() => addressHandler(text)}>Go!</button>
              </div>
          </div>
          <div
              className="w-3/4 h-5/6 border border-white rounded-2xl p-2 gap-20 items-center justify-center flex flex-col">
              <div>Address: {address}</div>
              <div>Balance: {balance}</div>
              <div>Executable?: {executable.valueOf()}</div>
          </div>

      </div>
  );
}