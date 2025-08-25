import { Button } from "../components/ui/button.tsx";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* CTA Section */}
        <div className="text-center mb-16 p-8 bg-gradient-hero rounded-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronta para transformar seu negócio?
          </h2>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais que já descobriram o poder do ManiHub
          </p>
          <Button size="lg" variant="hero" className="text-lg px-8 py-4 h-auto bg-white text-primary hover:bg-white/90">
            Começar Gratuitamente
          </Button>
        </div>

        {/* Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
              ManiHub
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A plataforma completa para profissionais de nail art gerenciarem 
              seus negócios com eficiência e profissionalismo.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Funcionalidades</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Agendamento Online</li>
              <li>Gestão de Clientes</li>
              <li>Controle Financeiro</li>
              <li>Relatórios</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Suporte</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Central de Ajuda</li>
              <li>Contato</li>
              <li>Tutoriais</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-1 border-t border-border text-center">
          <p className="text-muted-foreground">
            © 2025 ManiHub. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;