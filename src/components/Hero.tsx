import { Button } from "../components/ui/button.tsx";
//@ts-ignore
import Link from "next/link";

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-hero opacity-95"></div>
            <div
                className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20"
                style={{ backgroundImage: `url(${"/assets/nail-art-hero.jpg"})` }}
            ></div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Transforme seu
                        <span className="pb-3 block bg-gradient-to-r from-white to-primary-glow bg-clip-text ">
                            Negócio de Nail Art
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                        O ManiHub é a plataforma completa para manicures profissionais gerenciarem
                        agendamentos, clientes e finanças de forma simples e eficiente.
                    </p>


                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/signup" passHref>

                            <Button size="lg" variant="hero" className="text-lg px-8 py-4 h-auto">
                                Começar Gratuitamente
                            </Button>

                        </Link>

                        <Button
                            size="lg"
                            variant="outline"
                            className="text-primary border-primary px-8 py-4 h-auto hover:bg-primary/10 hover:text-primary transition-all"
                        >
                            Ver Demonstração
                        </Button>
                    </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float hidden lg:block"></div>
                <div className="absolute bottom-20 right-10 w-16 h-16 bg-primary-glow/20 rounded-full animate-float hidden lg:block" style={{ animationDelay: '1s' }}></div>
            </div>
        </section>
    );
};

export default Hero;