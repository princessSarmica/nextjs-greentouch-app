"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { setGreentouchSessionReleaseDate } from "@/actions/greentouch-session";
import { useTransition } from "react";
import { toast } from "sonner";
import error from "@/app/error";
import {
  CalendarClockIcon
} from "lucide-react";

export function ReleaseDateDialog({ sessionName }: { sessionName: string }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("12:00");
  const [isPending, startTransition] = useTransition();

  const handleSave = async () => {
    if (!date || !time) return;

    const [hours, minutes] = time.split(":").map(Number);
    const finalDate = new Date(date);
    finalDate.setHours(hours);
    finalDate.setMinutes(minutes);

    startTransition(async () => {
      const result = await setGreentouchSessionReleaseDate(sessionName, finalDate);
      if (result.success) {
        toast.success("Release date set successfully.");
        setOpen(false);
      } else {
        console.error("Error posting news article:", error); 
        toast.error("Failed to create news article."); 
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button variant="outline" size="sm">
            <CalendarClockIcon className="h-4 w-4" />
            Set Release Date
        </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
            <DialogTitle>Set release date</DialogTitle>
            <DialogDescription>
                Choose the date and time when <b>{sessionName}</b> should become available.
            </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
            {/* Date Picker */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Date</label>
                <Popover>
                <PopoverTrigger asChild>
                    <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                    >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    />
                </PopoverContent>
                </Popover>
            </div>

            {/* Time Input */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Time</label>
                <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                />
            </div>
            </div>

            <DialogFooter>
            <Button onClick={handleSave} disabled={isPending || !date}>
                {isPending ? "Saving..." : "Save"}
            </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
