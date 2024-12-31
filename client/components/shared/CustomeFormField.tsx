"use client"
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Control, UseFormReturn } from "react-hook-form"
import { FormFieldTypes } from "@/types/types"
import Image from "next/image"
import PhoneInput from "react-phone-number-input"
import 'react-phone-number-input/style.css'
import { E164Number } from "libphonenumber-js/core"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

interface CustomFormFieldProps {
    control: Control<any>,
    name: string,
    label?: string,
    placeholder?: string,
    desc?: string,
    fieldType: FormFieldTypes,
    icon?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    className?: string
    renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any, props: CustomFormFieldProps }) => {
    const [showPassword, setShowPassword] = useState(false)
    const { fieldType, placeholder, showTimeSelect, renderSkeleton, children, className } = props
    switch (fieldType) {
        case FormFieldTypes.PASSWORD:
            return (<FormControl>
                <div className="relative  w-full md:w-3/4">
                    <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" className="shad-input  " {...field} />
                    <button type="button" className="absolute top-1/4 right-1 text-gray-700 z-10" onClick={() => setShowPassword(!showPassword)} >
                        {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                </div>
            </FormControl>)
        case FormFieldTypes.INPUT:
            return (
                <FormControl>
                    <Input placeholder={placeholder} {...field} className={cn("shad-input border-0 ", className)} />
                </FormControl>

            )
        case FormFieldTypes.TEXTAREA:
            return (<FormControl>
                <Textarea placeholder={placeholder} {...field} className="shad-textArea" disabled={props.disabled} />
            </FormControl>)
        case FormFieldTypes.PHONE_INPUT:
            return (
                <PhoneInput defaultCountry="ET"
                    placeholder={placeholder}
                    onChange={field.onChange}
                    international withCountryCallingCode
                    value={field.value as E164Number | undefined}
                    className={cn("shad-input w-full md:w-[75%] bg-white  rounded-md p-2 ")} />

            )
        case FormFieldTypes.DATE_PICKER:
            return <FormControl>
                <DatePicker
                    selected={field.value}
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                    showTimeSelect={showTimeSelect ?? false}
                    placeholderText={placeholder}
                    dateFormat={"dd/MM/yyyy"}
                    wrapperClassName="date-picker"
                    className="shad-input rounded-md p-4 text-sm"
                />
            </FormControl>

        case FormFieldTypes.SKELETON:
            return renderSkeleton ? renderSkeleton(field) : null

        case FormFieldTypes.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="shad-select-trigger" onClick={(value) => console.log("triggered")}>
                                <SelectValue placeholder={props.placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="shad-select-content">
                            {children}
                        </SelectContent>
                    </Select>
                </FormControl>
            );
        case FormFieldTypes.CHECKBOX:
            return <FormControl>
                <div className="flex items-center gap-4">
                    <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor={props.name} className="checkbox-lable">{props.label}</Label>
                </div>
            </FormControl>
    }

}

const CustomFormField = (props: CustomFormFieldProps) => {
    const { control, label, name, fieldType } = props
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col space-y-4">

                    {fieldType !== FormFieldTypes.CHECKBOX && label &&
                        <FormLabel>{label}</FormLabel>
                    }
                    <RenderField field={field} props={props} />
                    <FormMessage className="text-red-500" />
                </FormItem>
            )}
        />
    )
}

export default CustomFormField