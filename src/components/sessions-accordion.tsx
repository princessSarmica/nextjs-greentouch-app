import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function SessionsAccordion() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lg">Why keep a diary?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance text-lg">
          <p>
            Writing in your diary helps you gain the full benefits of using GreenTouch. It supports deeper self-awareness and allows you to reflect on and track your thoughts and feelings over time.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-lg">How does it work?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance text-lg">
          <p>
            Your diary entries are personal and only visible to you. They won&apos;t be shared with others, though the research team will access them for analysis in anonymous, confidential form. You&apos;ll receive reflective prompts during sessions but are also free to record any thoughts, emotions, or insights—especially from time spent in nature.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-lg">What if I don&apos;t write in the diary?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance text-lg">
          <p>
            A diary entry, even a brief one, is required to move on to the next session.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
