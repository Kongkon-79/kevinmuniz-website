import { Card, CardContent } from "@/components/ui/card";
import { Clapperboard, Handshake, Lock } from "lucide-react";

const features = [
  {
    icon: Clapperboard,
    title: "Powerful Story Showcases",
    description:
      "Writers present their original IPs, creative vision, mood boards, and comprehensive production plans within a professionally structured campaign format aimed at engaging and securing serious industry professionals.",
  },
  {
    icon: Handshake,
    title: "Verified Industry Backers",
    description:
      "Producers, cast members, and contributors can apply directly to campaigns, making collaboration structured, transparent, and efficient.",
  },
  {
    icon: Lock,
    title: "Transparent Collaboration",
    description:
      "Clear roles, expectations, and project updates ensure everyone involved understands the roadmap to put the story on screen.",
  },
];

export default function WhyOurPlatformSection() {
  return (
    <section className="w-full py-10 md:py-14 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Why Our Platform
          </h2>
          <p className="mt-3 text-sm font-medium text-slate-500 md:text-base">
            Why Create & Back Films Here?
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Card
                key={index}
                className="border border-transparent bg-transparent shadow-none transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="flex flex-col items-center px-4 py-6 text-center md:px-6">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl border border-violet-300 bg-white/70 shadow-sm">
                    <Icon className="h-7 w-7 text-sky-500" strokeWidth={2.2} />
                  </div>

                  <h3 className="text-xl font-semibold leading-snug bg-gradient-to-r from-[#8C5CFF] to-[#2EABFC] bg-clip-text text-transparent">
                    {feature.title}
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-7 text-slate-700 md:text-base">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
