import React from 'react'
import { useForm } from '@mantine/form';
import { validateString } from '../../utils/common';
import { TextInput, Box, Textarea, Group, Button, NumberInput } from '@mantine/core';

function BasicDetails({
    prevStep,
    nextStep,
    propertyDetails,
    setPropertyDetails,
}) {

    const form = useForm({
        initialValues: {
            title: propertyDetails?.title,
            description: propertyDetails?.description,
            price: propertyDetails?.price,
        },
        validate: {
            title: (value) => validateString(value),
            description: (value) => validateString(value),
            price: (value) => value < 1000 ? "Must be greater tahn $999" : null
        }
    })

    const { title, description, price } = form.values;

    const handleSubmit = () => {
        const { hasErrors } = form.validate();

        if (!hasErrors) {
            setPropertyDetails((prev) => ({
                ...prev, title, description, price
            }))
            nextStep()
        }
    }

    return (
        <Box maw="50%" mx="auto" my="md">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit()
                }}
            >
                <TextInput
                    withAsterisk
                    label="Title"
                    placeholder="Property Name"
                    {
                    ...form.getInputProps('title')
                    } />
                <Textarea
                    withAsterisk
                    label="Description"
                    placeholder="Property Description"
                    {
                    ...form.getInputProps('description')
                    } />
                <NumberInput
                    withAsterisk
                    label="Price"
                    placeholder="1000"
                    {
                    ...form.getInputProps('price')
                    } />

                <div
                    className='flexColCenter'
                >
                    <Group position="center" mt={"xl"}>
                        <Button
                            variant='default'
                            onClick={prevStep}
                        >
                            Previous Step
                        </Button>
                        <Button
                            type="submit"
                        >
                            Next Step
                        </Button>
                    </Group>
                </div>
            </form>

        </Box>
    )
}

export default BasicDetails