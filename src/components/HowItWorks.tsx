import { Button } from "../components/ui/button.tsx";
import { ArrowRight, UserPlus, Calendar, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Cadastre-se Gratuitamente",
      description: "Crie sua conta em menos de 2 minutos e configure seu perfil profissional."
    },
    {
      number: "02", 
      icon: Calendar,
      title: "Configure sua Agenda",
      description: "Defina seus horários de trabalho, serviços oferecidos e preços."
    },
    {
      number: "03",
      icon: TrendingUp,
      title: "Comece a Gerenciar",
      description: "Receba agendamentos, gerencie clientes e acompanhe seu crescimento."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Como funciona?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Três passos simples para transformar a gestão do seu negócio
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="text-center">
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-hero rounded-full text-white font-bold text-xl mb-6 group-hover:shadow-elegant transition-all duration-300">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              
              {/* Arrow connector (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 text-primary/30">
                  <ArrowRight className="w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="hero" className="text-lg px-8 py-4 h-auto">
            Começar Agora - É Grátis
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Sem cartão de crédito necessário • Configuração em 2 minutos
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;