import React from 'react'
import { FormControl, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';

interface Props {
    /**
     * The label text to display above the input field.
     */
    label: string;

    /**
     * The current value of the input.
     */
    value: string | number;

    /**
     * Callback fired when the input value changes.
     * @param value - The new value (string or number) entered by the user.
     */
    onChange: (value: string | number) => void;

    /**
     * The HTML input type.
     */
    type: "email" | "password" | "text" | "number";

    /**
     * Placeholder text shown when the input is empty.
     */
    placeholder: string;

    /**
     * Unique ID for the input field (used for label association).
     */
    id: string;

    /**
     * Whether the input is required for form submission.
     */
    required: boolean;
}

/**
 * A reusable input field component with label and styling,
 * designed to work with the app's form system.
 *
 * @param {string} id - Unique ID for the input field (also used for accessibility with the label).
 * @param {string} label - Text displayed above the input to describe its purpose.
 * @param {string | number} value - Current value of the input field.
 * @param {(value: string | number) => void} onChange - Callback triggered when the input value changes.
 * @param {"email" | "password" | "text" | "number"} type - Type of input element (determines keyboard and validation behavior).
 * @param {string} placeholder - Text shown when the input field is empty.
 * @param {boolean} required - Whether the field must be filled in before form submission.
 */


export const InputField = ({
    id,
    label,
    value,
    onChange,
    type,
    placeholder,
    required,
    ...props
} : Props) => {
    return (
        <FormItem className=' flex flex-col gap-4'>
            <FormLabel htmlFor={id} className=' text-muted-foreground'>
                {label}
            </FormLabel>
            <FormControl>
                <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required = {required}
                    {...props}
                />
            </FormControl>
        </FormItem>
    )
}
