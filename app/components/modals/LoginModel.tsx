'use client';

import {signIn} from "next-auth/react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import { useCallback, useState } from "react";
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import useLoginModel from "@/app/hooks/useLoginModal";
import useRegisterModel from '@/app/hooks/useRegisterModal';
import Modal from "./Modals";
import Heading from "../Heading";
import Input from "../inputs/Input";
import {toast} from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const loginModal = useLoginModel();
    const registerModel = useRegisterModel();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback)=>{
            setIsLoading(false);

            if(callback?.ok){
                toast.success("Login was successfull")
                router.refresh()
                loginModal.onClose()
            }

            if(!callback?.ok){
                toast.error(callback?.error)
            }

            // test@mail.com test123
        })
    }

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModel.onOpen();
    }, [loginModal, registerModel]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome back" 
                subtitle="Login to your account" 
            />
            <Input 
                id="email"
                label="Email"
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="password"
                type="password"
                label="Password"
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button 
                outline
                label="Login with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button 
                outline
                label="Login with Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div 
                className="
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                "
            >
                <div className="
                    flex 
                    flex-row 
                    justify-center 
                    items-center 
                    gap-2"
                >
                   <div>
                        Need an account?
                   </div>
                   <div
                        onClick={toggle}
                        className="
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                        "
                   >
                        Sign up
                   </div>
                </div>
            </div>
        </div>
    );

    return (
       <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
       />
    );
}

export default LoginModal;