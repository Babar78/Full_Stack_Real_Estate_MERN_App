import React, { useState, useRef, useEffect } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import './UploadImage.css'
import { Button, Group } from '@mantine/core';

function UploadImage({ propertyDetails, setPropertyDetails, nextStep, prevStep }) {

    const [imageURL, setImageURL] = useState(propertyDetails.image);
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    const handleNext = () => {
        setPropertyDetails((prev) => ({
            ...prev, image: imageURL
        }))
        nextStep()

    }

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: "drzzqxncd",
                uploadPreset: "prn7n2bv",
                maxFiles: 1
            },
            (error, result) => {
                if (result.event === 'success') {
                    setImageURL(result.info.secure_url);
                }
            }
        )
    }
        , [])


    return (
        <div className='flexColCenter uploadWrapper'>
            {
                !imageURL ? (
                    <div className='flexColCenter uploadZone' onClick={() => widgetRef.current?.open()}>
                        <AiOutlineCloudUpload size={50} color="gray" />
                        <span>Upload Image</span>
                    </div>
                ) : (
                    <div className="uploadedImage" onClick={() => widgetRef.current?.open()}>
                        <img src={imageURL} alt="property Image" />
                    </div>
                )
            }
            <Group position="center" mt={"xl"}>
                <Button
                    variant='default'
                    onClick={prevStep}
                >
                    Previous Step
                </Button>
                <Button
                    onClick={handleNext}
                    disabled={!imageURL}
                >
                    Next Step
                </Button>
            </Group>
        </div >
    )
}

export default UploadImage