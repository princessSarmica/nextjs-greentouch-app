"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

function Slider({
  className,
  value: externalValue,
  min = 0,
  max = 100,
  onValueChange,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
    const [currentValue, setCurrentValue] = React.useState<number[]>(
      Array.isArray(externalValue)
        ? externalValue
        : [typeof externalValue === "number" ? externalValue : min]
    )

  React.useEffect(() => {
    if (externalValue) {
      setCurrentValue(
        Array.isArray(externalValue) ? externalValue : [typeof externalValue === "number" ? externalValue : min]
      )
    }
  }, [externalValue, min])

  const handleChange = (val: number[]) => {
    setCurrentValue(val)
    onValueChange?.(val)
  }

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      value={currentValue}
      min={min}
      max={max}
      step={1}
      onValueChange={handleChange}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className="bg-muted relative grow overflow-hidden rounded-full h-1.5"
      >
        <SliderPrimitive.Range className="bg-primary absolute h-full" />
      </SliderPrimitive.Track>

      {currentValue.map((val, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="relative group ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        >

          <div className="absolute left-1/2 -translate-x-1/2 -top-22">
            <Badge
              className={cn(
                "transition-opacity duration-200",
                "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
              )}
            >
              {val}
            </Badge>
          </div>

          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-8 h-8">
            <Image
              src="/slider-figure.svg"
              alt="Figure"
              width={16}
              height={16}
              className="w-16 h-16 select-none"
            />
        </div>
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
