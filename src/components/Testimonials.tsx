import { Card, CardContent } from "../components/ui/card.tsx";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Santos",
      role: "Nail Designer - São Paulo",
      content: "O ManiHub revolucionou meu negócio! Agora consigo organizar minha agenda e nunca mais perco clientes. Minha receita aumentou 40% em 3 meses.",
      rating: 5,
      avatar: "MS"
    },
    {
      name: "Ana Costa",
      role: "Manicure Autônoma - Rio de Janeiro", 
      content: "Finalmente encontrei uma plataforma que entende as necessidades de quem trabalha com nail art. O controle financeiro é perfeito!",
      rating: 5,
      avatar: "AC"
    },
    {
      name: "Juliana Lima",
      role: "Studio de Unhas - Belo Horizonte",
      content: "Uso o ManiHub há 6 meses e não consigo mais trabalhar sem ele. Meus clientes adoram a facilidade de agendamento online.",
      rating: 5,
      avatar: "JL"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            O que dizem nossos clientes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mais de 1.000 profissionais já transformaram seus negócios com o ManiHub
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-card bg-gradient-card hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-foreground mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;