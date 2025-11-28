"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type ComboboxTopicProps = {
  value: string;
  onChange: (v: string) => void;
  topics?: string[]; // reactive prop
  placeholder?: string;
  commandInput?: string;
  widthClass?: string;
};

export default function ComboboxTopic({
  value,
  onChange,
  topics = [],
  placeholder = "Select or add topic...",
  commandInput = "Search or type to add...",
  widthClass = "w-[full]",
}: ComboboxTopicProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    // če je trenutni value odstranjen iz topics (npr. zaradi refresh), ga pustimo - ne spreminjamo
  }, [topics]);

  const filtered = React.useMemo(() => {
    const q = inputValue.trim().toLowerCase();
    if (!q) return topics;
    return topics.filter((t) => t.toLowerCase().includes(q));
  }, [inputValue, topics]);

  const canAddNew =
    inputValue.trim().length > 0 &&
    !topics.some((t) => t.toLowerCase() === inputValue.trim().toLowerCase());

  const handleSelect = (val: string) => {
    onChange(val);
    setInputValue("");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(widthClass, "justify-between")}
        >
          {value ? value : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={cn(widthClass, "p-0")}>
        <Command>
          <CommandInput
            placeholder={commandInput}
            className="h-9"
            value={inputValue}
            onValueChange={(v) => setInputValue(v)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && canAddNew) {
                e.preventDefault();
                handleSelect(inputValue.trim());
              }
            }}
          />
          <CommandList>
            <CommandEmpty>No topics found.</CommandEmpty>
            <CommandGroup>
              {filtered.map((topic) => (
                <CommandItem
                  key={topic}
                  value={topic}
                  onSelect={(currentValue) => handleSelect(currentValue)}
                >
                  {topic}
                  <Check className={cn("ml-auto", value === topic ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
              {canAddNew && (
                <CommandItem
                  key={`__add__${inputValue}`}
                  value={inputValue.trim()}
                  onSelect={() => handleSelect(inputValue.trim())}
                >
                  <span className="font-medium">Add &quot;{inputValue.trim()}&quot;</span>
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
