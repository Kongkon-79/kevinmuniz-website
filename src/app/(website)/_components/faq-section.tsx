

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
const faqItems = [
    {
      question: "How is this different from crowdfunding platforms?",
      answer:
        "Analytic Soccer is the first data platform for amateur players, offering ratings, technical–tactical analysis, structured feedback and highlights based on your game footage.",
    },
    {
      question: "Who can create a campaign?",
      answer:
        "You send us your game video and team sheet, we analyze the match, and you receive your ratings, your structured feedback  and highlights within 72 hours.",
    },
    {
      question: "Who can join as a backer?",
      answer:
        "For boys and girls from U9 to U18+, as well as teams, coaches, scouts, and parents who want real performance insight.",
    },
    {
      question: "Is funding handled on the platform?",
      answer: "Just your game video and the team sheet with player names and positions. If possible, please also send the team lineup in case the players’ jerseys aren’t clearly visible.",
    }
  ];

  return (
    <div>
      <section className="py-10 md:py-14 lg:py-16 bg-white">
        <div className="container ">
          <h4 className='text-3xl md:text-4xl lg:text-5xl text-center font-bold leading-[120%] text-[#131313] pb-4'>FAQ</h4>
      
          <Accordion type="single" collapsible className="w-full">
            {faqItems?.map((item, index) => (
              <AccordionItem
                key={index+1}
               value={`item-${index}`}
                className="bg-white mb-1"
              >
                <AccordionTrigger className="hover:no-underline py-[14px] px-6 text-left  border-b border-[#C3C3C3]">
                  <div className="flex items-center gap-6">
                    <span className="text-lg font-normal text-[#131313] leading-[120%]">
                      {/* {index+1}.  */}
                      {item.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-3 px-6 text-base text-[#616161] leading-[150%] font-normal">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>

  );
}