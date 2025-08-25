import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Calendar, Users, TrendingUp, Clock, CreditCard, Star } from "lucide-react";


const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "Agendamento Inteligente",
      description: "Gerencie sua agenda com facilidade. Visualize horários livres, confirme agendamentos e evite conflitos.",
      image: "/assets/feature-schedule.jpg",
    },
    {
      icon: Users,
      title: "Gestão de Clientes",
      description: "Mantenha o histórico completo de cada cliente, preferências e histórico de serviços.",
      image:"/assets/feature-clients.jpg",
    },
    {
      icon: TrendingUp,
      title: "Controle Financeiro",
      description: "Acompanhe seus ganhos, despesas e tenha relatórios detalhados do seu negócio.",
      image: "/assets/feature-finance.jpg",
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Economize Tempo",
      description: "Automatize tarefas repetitivas e foque no que realmente importa: seus clientes.",
    },
    {
      icon: CreditCard,
      title: "Aumente sua Receita",
      description: "Otimize sua agenda e nunca mais perca um agendamento por desorganização.",
    },
    {
      icon: Star,
      title: "Experiência Premium",
      description: "Ofereça um atendimento profissional que seus clientes vão adorar.",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Features */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Tudo que você precisa em um só lugar
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubra como o ManiHub pode revolucionar a gestão do seu negócio de nail art
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-card bg-gradient-card hover:shadow-elegant transition-all duration-300 group">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex p-4 bg-gradient-hero rounded-full mb-4 group-hover:shadow-elegant transition-all duration-300">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;