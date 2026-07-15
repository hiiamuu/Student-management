// ShadcnForm.jsx
// NOTE: This is a starter integrated with React Hook Form.
// Replace your component body with this pattern and extend remaining fields similarly.

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function ShadcnForm() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            card: "",
            month: "",
            comments: "",
            sameAddress: true,
        },
        mode: "onTouched",
    });

    const onSubmit = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                placeholder="Name on Card"
                {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p>{errors.name.message}</p>}

            <Input
                placeholder="Card Number"
                {...register("card", { required: "Card number is required" })}
            />
            {errors.card && <p>{errors.card.message}</p>}

            <Controller
                name="month"
                control={control}
                rules={{ required: "Month is required" }}
                render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="01">01</SelectItem>
                                <SelectItem value="02">02</SelectItem>
                                <SelectItem value="03">03</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            />
            {errors.month && <p>{errors.month.message}</p>}

            <Textarea placeholder="Comments" {...register("comments")} />

            <Controller
                name="sameAddress"
                control={control}
                render={({ field }) => (
                    <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                )}
            />

            <Button type="submit">Submit</Button>
        </form>
    );
}
