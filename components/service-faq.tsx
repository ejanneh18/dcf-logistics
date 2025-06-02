"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FAQItem {
  question: string
  answer: string
}

interface ServiceFAQProps {
  title?: string
  description?: string
  faqs: FAQItem[]
}

export default function ServiceFAQ({
  title = "Frequently Asked Questions",
  description = "Find answers to common questions about our services",
  faqs,
}: ServiceFAQProps) {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">{title}</CardTitle>
        {description && <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">{description}</p>}
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium text-lg">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <div className="pt-2 pb-4">{faq.answer}</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
