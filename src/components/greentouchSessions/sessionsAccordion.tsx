import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useTranslations } from "next-intl";

export function SessionsAccordion() {

  const t = useTranslations("sessionsPage.additionalData.sessionsAccordion");

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lg">{t("accordionItem1.title")}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance text-lg">
          <p>
            {t("accordionItem1.content")}
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-lg">{t("accordionItem2.title")}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance text-lg">
          <p>
            {t("accordionItem2.content")}
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-lg">{t("accordionItem3.title")}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance text-lg">
          <p>
            {t("accordionItem3.content")}
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
