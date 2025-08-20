"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "./button"
import { Calendar } from "./calendar"
import { Input } from "./input"
import { Label } from "./label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover"
import { ChangeEvent, useEffect, useState } from "react"

function formatDate(date: Date | undefined) {
    if (!date) {
        return ""
    }

    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}

function isValidDate(date: Date | undefined) {
    if (!date) {
        return false
    }
    return !isNaN(date.getTime())
}

type DatePickerProps = {
    onChange: (date: Date | undefined) => void
    id?: string
    placeholder?: string
}

// Fix date picker so it works with react-hook-form

export function DatePicker({ onChange, id = "date" }: DatePickerProps) {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date>(
        new Date()
    )
    const [month, setMonth] = useState<Date | undefined>(date)
    const [value, setValue] = useState(formatDate(date))

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const date = new Date(value)
        setValue(value)
        setMonth(date)
        onChange(date)
    }

    const handleSelect = (date: Date | undefined) => {
        if (!date) return;

        setDate(date)
        setValue(formatDate(date))
        onChange(date)
        setOpen(false)
    }
    
    return (
        <div className="flex flex-col gap-3">
            <div className="relative flex gap-2">
                <Input
                    id={id}
                    value={value}
                    className="bg-background pr-10"
                    onChange={handleChange}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault()
                            setOpen(true)
                        }
                    }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="date-picker"
                        variant="ghost"
                        className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                    >
                    <CalendarIcon className="size-3.5" />
                    <span className="sr-only">Select date</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                >
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        month={month}
                        onMonthChange={setMonth}
                        onSelect={handleSelect}
                    />
                </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
