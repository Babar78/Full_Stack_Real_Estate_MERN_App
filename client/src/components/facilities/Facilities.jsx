import React, { useContext } from 'react'
import { Box, Button, Group, NumberInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useAuth0 } from '@auth0/auth0-react';
import UserDetailsContext from '../../context/userDetailsContext.js';
import useProperties from "../../hooks/useProperties.jsx";
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { createResidency } from '../../utils/api.js';

function Facilities(
    {
        prevStep,
        propertyDetails,
        setPropertyDetails,
        setOpened,
        setActive
    }
) {

    const form = useForm({
        initialValues: {
            title: propertyDetails?.bedrooms,
            description: propertyDetails?.parkings,
            price: propertyDetails?.bathrooms,
        },
        validate: {
            bedrooms: (value) => (value < 1 ? "Must have atleast one room" : null),
            bathrooms: (value) => value < 1 ? "Must have atleast one bathroom" : null
        }
    })

    const {
        bedrooms,
        parkings,
        bathrooms
    } = form.values;

    const handleSubmit = () => {
        const { hasErrors } = form.validate();

        if (!hasErrors) {
            setPropertyDetails((prev) => ({
                ...prev,
                facilities: {
                    bedrooms, parkings, bathrooms
                },
            }))
            mutate()
        }
    }

    // Upload Property Logic

    const { user } = useAuth0();
    const {
        userDetails: { token },
    } = useContext(UserDetailsContext);
    const { refetch: refetchProperties } = useProperties();

    const { mutate, isLoading } = useMutation({
        mutationFn: () => createResidency({
            ...propertyDetails, facilities: {
                bedrooms, parkings, bathrooms
            }
        }, token),

        onError: ({ response }) => toast.error(response.data.message, { position: "bottom-right" }),

        onSettled: () => {
            toast.success("Property Added Successfully", { position: "bottom-right" });
            setPropertyDetails({
                title: "",
                description: "",
                price: 0,
                country: "",
                city: "",
                address: "",
                image: null,
                facilities: {
                    bedrooms: 0,
                    parkings: 0,
                    bathrooms: 0,

                },
                userEmail: user?.email
            })
            setOpened(false);
            setActive(0);
            refetchProperties();
        }


    })

    return (
        <Box maw={"50%"} mx="auto" my="md">
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>

                <NumberInput
                    withAsterisk
                    label="No. of Bedrooms"
                    min={0}
                    // placeholder="Number of Bedrooms"
                    {
                    ...form.getInputProps('bedrooms')
                    }
                />
                <NumberInput
                    withAsterisk
                    label="No. of Parkings"
                    min={0}
                    // placeholder="Number of Bedrooms"
                    {
                    ...form.getInputProps('parkings')
                    }
                />
                <NumberInput
                    withAsterisk
                    label="No. of Bathrooms"
                    min={0}
                    // placeholder="Number of Bedrooms"
                    {
                    ...form.getInputProps('bathrooms')
                    }
                />
                <div className="flexColCenter">
                    <Group position="center" mt={"xl"}>
                        <Button variant="default" onClick={prevStep}>Previous Step</Button>
                        <Button color="green" type="submit" disabled={isLoading}>
                            {
                                isLoading ? "Submitting..." : "Add Property"
                            }
                        </Button>
                    </Group>
                </div>
            </form>
        </Box>
    )
}

export default Facilities