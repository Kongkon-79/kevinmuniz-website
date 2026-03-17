import { Card, CardContent } from "@/components/ui/card";
import { PenTool, Clapperboard } from "lucide-react";

type RoleItem = {
  id: number;
  role: string;
  icon: React.ElementType;
  steps: string[];
};

const roleData: RoleItem[] = [
  {
    id: 1,
    role: "Author",
    icon: PenTool,
    steps: [
      "Create An Account",
      "Publish your story",
      "Promote and network",
    ],
  },
  {
    id: 2,
    role: "Film maker",
    icon: Clapperboard,
    steps: [
      "Create An Account",
      "Discover the story you like",
      "Finance the next masterpiece",
    ],
  },
];

export default function HowItWorksSection() {
  return (
    <section className="w-full py-10 md:py-14 lg:py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 md:text-base">
            See how your contributions have made a difference. Meet the people
            whose lives have been transformed by your generosity.
          </p>
        </div>

        <div className="mt-14 space-y-12">
          {roleData.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.id}
                className="border-0 bg-transparent shadow-none"
              >
                <CardContent className="flex flex-col items-center p-0">
                  <h3 className="text-lg font-medium text-slate-900">
                    {item.role}
                  </h3>

                  <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-2xl">
                    <Icon className="h-10 w-10 text-indigo-500" strokeWidth={1.8} />
                  </div>

                  <div className="mt-6 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {item.steps.map((step, index) => (
                      <div
                        key={index}
                        className="flex h-11 items-center justify-center rounded-md border border-indigo-200 bg-transparent px-4 text-center text-sm font-medium text-slate-700 transition-all duration-200 hover:border-indigo-400 hover:bg-white"
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}