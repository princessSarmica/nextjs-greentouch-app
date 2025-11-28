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
import {
  CalendarClockIcon
} from "lucide-react";
import error from "@/app/[locale]/error";

interface setReleaseDateDialogProps {
    setReleaseDateDialogTranslations: {
        sessionTitle: string;
        title: string;
        description1: string;
        description2: string;
        labelDate: string;
        labelTime: string;
        actionButton: string;
    },
    sessionName: string;
}

export function ReleaseDateDialog({ setReleaseDateDialogTranslations, sessionName }: setReleaseDateDialogProps) {
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
            {setReleaseDateDialogTranslations.title}
        </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
            <DialogTitle>{setReleaseDateDialogTranslations.title}</DialogTitle>
            <DialogDescription>
                {setReleaseDateDialogTranslations.description1} <b>{setReleaseDateDialogTranslations.sessionTitle}</b> {setReleaseDateDialogTranslations.description2}
            </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
            {/* Date Picker */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">{setReleaseDateDialogTranslations.labelDate}</label>
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
                <label className="text-sm font-medium">{setReleaseDateDialogTranslations.labelTime}</label>
                <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                />
            </div>
            </div>

            <DialogFooter>
            <Button onClick={handleSave} disabled={isPending || !date}>
                {isPending ? setReleaseDateDialogTranslations.actionButton : setReleaseDateDialogTranslations.actionButton}
            </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
