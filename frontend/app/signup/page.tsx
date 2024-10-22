"use client"

import Appbar from "@/components/Appbar";
import {useRouter} from "next/navigation";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function () {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState(" ")
    return <div>
        <Appbar />
         <div className=" flex justify-center">
        <div className="flex pt-8 max-w-4xl">
            <div className="flex-1 pt-20 px-4 ">
                <div className=" font-semibold text-3xl  pb-4">
                    Join millions worldwide who automate their work using zapier
                </div>
                <div className="pb-6 pt-4">
                <CheckFeature label={"Easy setup, no coding required"} />
                </div>
                <div className="pb-8">
                <CheckFeature label={"Free forever for core features"} />
                </div>
                <CheckFeature label={"14-days trial of primum features & apps"} />
               
            </div>
            <div className="flex-1 pt-6 pb-6 border mt-12 px-4 ">
                <Input label={"Name"} onChange={e => {
                    setName(e.target.value) 

                }} type="text" placeholder="Your name "></Input>
                <Input label={"Email"}  onChange={e => { setEmail(e.target.value)}
            } type="text" placeholder="Your email"></Input>
                <Input label={"Password"} type="password"  onChange={e => { 
                    setPassword(e.target.value)

                }}  placeholder="Password"></Input>
                <div className="pt-4">
                    <PrimaryButton onClick={async()=>{
                      const res = await  axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
                            username: email,
                            password,
                            name

                        });
                        router.push("/login")
                        

                    }} size="big">Get Started Big</PrimaryButton>

                </div>

            </div>
        </div>
        </div>
        

    </div>
}