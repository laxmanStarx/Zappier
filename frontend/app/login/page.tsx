"use client"

import Appbar from "@/components/Appbar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import {useRouter} from "next/navigation";

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

                    <Input label={"Email"} onChange={e => { setEmail(e.target.value)}
                    } type="text" placeholder="Your email"></Input>
                    <Input label={"Password"} onChange={e => {
                        setPassword(e.target.value)

                    }} type="text" placeholder="Password"></Input>
                    <div className="pt-4">
                        <PrimaryButton onClick={async() => {
                              const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
                                username: email,
                                password,
                                
    
                            });
                            localStorage.setItem("token", res.data.token);
                            router.push("/dashboard")

                        }} size="big">LogIn</PrimaryButton>

                    </div>

                </div>
            </div>
        </div>


    </div>
}