'use client';

import React from "react";
import useRentModel from "@/app/hooks/useRentModal";
import Modal from "./Modals";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

interface RentModalProps {

}

const RentModal = () => {
    const rentModal = useRentModel();
    const router = useRouter();
    const [step, setStep] = React.useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = React.useState(false);

    const {register, handleSubmit, setValue, watch, formState: {errors}, reset} = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price:1,
            title: '',
            description: ''
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc')

    const Map = React.useMemo(() => {
        return dynamic(() => import('../Map'), {
            ssr: false
        })
    }, [location])

    const setCustomeValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true, 
            shouldDirty: true,
            shouldTouch: true
        });
    }
    
    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(step !== STEPS.PRICE){
            return onNext();
        }

        setIsLoading(true)
        axios.post('/api/listings', data)
            .then(()=>{
                toast.success('Listing Created')
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY)
                rentModal.onClose()
            })
            .catch((err)=>{
                console.log(err)
                toast.error('Something went wrong')
            })
            .finally(()=>{
                setIsLoading(false)
            })
    }

    const actionLabel = React.useMemo(() => {
        if(step === STEPS.PRICE){
            return 'Create';
        }

        return 'Next';
    }, [step]);

    const secondaryActionLabel = React.useMemo(() => {
        if(step === STEPS.CATEGORY){
            return undefined;
        }

        return 'Back';
    }, [step])

    let bodyContent = (
        <div 
            className="flex flex-col gap-8"
        >
            <Heading
                title="Which of the best describes you place?"
                subtitle="Pick a category"
            />
            <div 
                className="
                    grid 
                    grid-cols-1
                    md:grid-cols-2 
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto
                "
            >  
                {
                    categories.map((item)=>(
                        <div
                            key={item.label}
                            className="col-span-1"
                        >
                            <CategoryInput 
                                onClick={(category)=> setCustomeValue('category', category)}
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    ))
                }
            </div>

        </div>
    )

    if(step === STEPS.LOCATION){
        bodyContent = (
            <div className="
                flex
                flex-col
                gap-8
                "
            >
                <Heading 
                    title="Where's your place located?"
                    subtitle="Help guests find your place by entering an address"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomeValue('location', value)}
                />
                <Map
                    center={location?.latlng}
                />
            </div>
        )
    }

    if(step === STEPS.INFO){
        bodyContent = (
            <div 
                className="
                    flex
                    flex-col
                    gap-8
                "
            >
                <Heading 
                    title="Share some details about your place"
                    subtitle="What amenities do you have?"
                />
                
                <Counter 
                    title="Number of Guests"
                    subtitle="How many guests you host?"
                    value={guestCount}
                    onChange={(value)=> setCustomeValue('guestCount', value)}
                />
                <hr />
                <Counter 
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value)=> setCustomeValue('roomCount', value)}
                />
                <hr />
                <Counter 
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(value)=> setCustomeValue('bathroomCount', value)}
                />

            </div>
        )
    }

    if(step === STEPS.IMAGES){
        bodyContent = (
            <div
                className="
                    flex
                    flex-col
                    gap-8
                "
            >
                <Heading 
                    title="Add some photos of your place"
                    subtitle="Guests love photos. Add high-resolution photos that represent your space and guest access."
                />
                <ImageUpload 
                    value={imageSrc}
                    onChange={(value)=>setCustomeValue('imageSrc', value)}
                />
            </div>
        )
    }

    if(step == STEPS.DESCRIPTION){
        bodyContent=(
            <div
                className="flex flex-col gap-8"
            >
                <Heading 
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
                <Input 
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input 
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if(step == STEPS.PRICE) {
        bodyContent = (
            <div
                className="
                    flex
                    flex-col
                    gap-8
                "
            >
                <Heading 
                    title="Now, set your price"
                    subtitle="How much do you charge per night"
                />
                <Input 
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secodaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Airbnb your home"
            body={bodyContent}
        />
    );
}

export default RentModal;