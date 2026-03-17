

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function StepsForFilm() {
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
      <section className="py-6 md:py-12 lg:py-20">
        <div className="container ">
          <div className="pb-6 md:pb-8 lg:pb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-normal text-[#2C2C2C] text-center">
            Steps For Film Industry Professionals
          </h2>
          <p className="mt-3 text-base md:text-lg font-medium leading-normal text-[#8B8B8B] text-center">
            Find the answers you are looking for in the section below.
          </p>
        </div>
      
          <Accordion type="single" collapsible className="w-full">
            {faqItems?.map((item, index) => (
              <AccordionItem
                key={index+1}
               value={`item-${index}`}
                className=" mb-1"
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