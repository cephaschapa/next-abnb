'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import { useCallback, useState } from "react";
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import useRegisterModel from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modals";
import Heading from "../Heading";
import Input from "../inputs/Input";
import {toast} from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";

const RegisterModel = () => {
    const registerModel = useRegisterModel();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        axios.post('/api/register', data)
            .then((res) => {
                toast.success('Success')
                registerModel.onClose();
                loginModal.onOpen()
            })
            .catch((err) => {
                toast.error("Something went wrong");
            })
            .finally(() => {
                setIsLoading(false);
            })   
    }

    
    const toggle = useCallback(() => {
        loginModal.onOpen();
        registerModel.onClose();
    }, [loginModal, registerModel]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome to Airbnb" 
                subtitle="Create an Account" 
            />
            <Input 
                id="email"
                label="Email"
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="name"
                label="Name"
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
                        Already have an account?
                   </div>
                   <div
                        onClick={toggle}
                        className="
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                        "
                   >
                        Log in
                   </div>
                </div>
            </div>
        </div>
    );

    return (
       <Modal 
        disabled={isLoading}
        isOpen={registerModel.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModel.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
       />
    );
}

export default RegisterModel;