"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectWithSearch } from "@/components/SelectWithSearch";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { useAllCountries } from "@/hooks/useAllCountries";
import {
    LayerDirective,
    LayersDirective,
    MapsComponent,
} from "@syncfusion/ej2-react-maps";
import { world_map } from "@/constants/world_map";

import { budgetOptions, groupTypes, interests, travelStyles } from '@/constants';
import Spinner from "@/components/Spinner";
import { useCreateTrip } from "../hook/useTripApi";

const formSchema = z.object({
    country: z.string().min(3, { message: "Country is required." }),
    duration: z.coerce
        .number()
        .min(1, { message: "Duration must be at least 1." }),
    group_type: z.string().min(3, { message: "Group type is required." }),
    travel_style: z.string().min(3, { message: "Travel style is required." }),
    interests: z.string().min(3, { message: "Interests in required." }),
    budget_estimate: z
        .string()
        .min(3, { message: "Budget Estimate is required." }),
});

export const CreateTripForm = () => {
    const { loading, allCountries } = useAllCountries();
    const {loading : isLoading , onCreateTrip} = useCreateTrip()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            country: "",
            duration: 0,
            group_type: "",
            travel_style: "",
            interests: "",
            budget_estimate: "",
        },
    });


    const countryData = allCountries.map((country) => ({
        label: country.name,
        value: country.name,
        img: country.flag?.png || country.flag?.svg || "",
    }));

    const mapDate = [
        {
            country: form.watch("country"),
            color: "#EA382E",
            coordinates:
                allCountries.find((c) => c.name === form.watch("country"))
                    ?.coordinates || [],
        },
    ];

    

    const isDisable =
        !form.watch("budget_estimate") ||
        !form.watch("country") ||
        !form.watch("duration") ||
        !form.watch("group_type") ||
        !form.watch("interests") ||
        !form.watch("travel_style");

    return (
        <div className="grid p-0 md:grid-cols-2 gap-8">

            <Form {...form}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit(onCreateTrip)();
                    }}
                    className=" flex flex-col gap-6 "
                >
                    <div className=" grid grid-cols-2 gap-6">
                        {/* start to country */}
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem className=" flex flex-col gap-4">
                                    <FormLabel className=" text-muted-foreground">Country</FormLabel>
                                    <FormControl>
                                        <SelectWithSearch
                                            placeholder="country"
                                            value={field.value}
                                            onChangeValue={field.onChange}
                                            List={countryData}
                                            loading={loading}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                        {/* end to country */}

                        {/* start to duration */}
                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <InputField
                                    id="duration"
                                    placeholder="Enter trips duration..."
                                    value={field.value}
                                    onChange={field.onChange}
                                    required={true}
                                    type="number"
                                    label="Duration"
                                />
                            )}
                        />
                        {/* end to duration */}

                        {/* start to group type */}
                        <FormField
                            control={form.control}
                            name="group_type"
                            render={({ field }) => (
                                <FormItem className=" flex flex-col gap-4 col-span-2">
                                    <FormLabel className=" text-muted-foreground">Group type</FormLabel>
                                    <FormControl>
                                        <SelectWithSearch
                                            placeholder="Group type"
                                            value={field.value}
                                            onChangeValue={field.onChange}
                                            List={groupTypes.map((value) => (
                                                {
                                                    label : value,
                                                    value
                                                }
                                            ))}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                        {/* end to group type */}

                        {/* start to Travel style */}
                        <FormField
                            control={form.control}
                            name="travel_style"
                            render={({ field }) => (
                                <FormItem className=" flex flex-col gap-4 col-span-2">
                                    <FormLabel className=" text-muted-foreground">Travel style</FormLabel>
                                    <FormControl>
                                        <SelectWithSearch
                                            placeholder="Travel style"
                                            value={field.value}
                                            onChangeValue={field.onChange}
                                            List={travelStyles.map((value) => (
                                                {
                                                    label : value,
                                                    value
                                                }
                                            ))}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                        {/* end to Travel style */}

                        {/* start to interests */}
                        <FormField
                            control={form.control}
                            name="interests"
                            render={({ field }) => (
                                <FormItem className=" flex flex-col gap-4">
                                    <FormLabel className=" text-muted-foreground">Interests</FormLabel>
                                    <FormControl>
                                        <SelectWithSearch
                                            placeholder="Interests"
                                            value={field.value}
                                            onChangeValue={field.onChange}
                                            List={interests.map((value) => (
                                                {
                                                    label : value,
                                                    value
                                                }
                                            ))}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                        {/* end to interests */}

                        {/* start to Budget Estimate */}
                        <FormField
                            control={form.control}
                            name="budget_estimate"
                            render={({ field }) => (
                                <FormItem className=" flex flex-col gap-4 ">
                                    <FormLabel className=" text-muted-foreground">Budget Estimate</FormLabel>
                                    <FormControl>
                                        <SelectWithSearch
                                            placeholder="Budget Estimate"
                                            value={field.value}
                                            onChangeValue={field.onChange}
                                            List={budgetOptions.map((value) => (
                                                {
                                                    label : value,
                                                    value
                                                }
                                            ))}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                        {/* end to Budget Estimate */}
                    </div>

                    <Button disabled={isDisable} className="w-[100px]" >
                        {isLoading ? <Spinner /> : "Submit"}
                    </Button>
                </form>
            </Form>
            <Card className="overflow-hidden flex-1 p-0 w-full h-full">
                <CardContent className=" p-0">
                    <MapsComponent className=" h-full flex-1 ">
                        <LayersDirective >
                            <LayerDirective
                                
                                shapeData={world_map}
                                dataSource={mapDate}
                                shapeDataPath="country"
                                shapePropertyPath={"name"}
                                shapeSettings={{
                                    colorValuePath: "color",
                                    fill: "#e5e5e5",
                                    
                                }}
                            />
                        </LayersDirective>
                    </MapsComponent>
                </CardContent>
            </Card>
        </div>
    );
};
