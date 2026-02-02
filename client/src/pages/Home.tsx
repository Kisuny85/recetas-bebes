import { Card } from "@/components/ui/card";
import { CheckCircle2, Gift, Zap, Users, Shield, BookOpen, Play } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/**
 * DESIGN PHILOSOPHY: Warm & Organic
 * - Palette: Ochre (#D4A574), Sage Green (#9CAF88), Cream (#F5EFE7), Soft Coral (#E8B4A8)
 * - Typography: Playfair Display (titles), Poppins (body)
 * - Micro-interactions: Smooth transitions, hover effects, fade-in animations
 * - Goal: Transmit warmth, trust, and safety to parents
 */

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        toast.success("¡Gracias! Revisa tu correo para descargar el PDF.");
        setEmail("");
        setName("");
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        toast.error(data.error || "Hubo un error. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Hubo un error. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: BookOpen,
      title: "500 Recetas Nutritivas",
      description: "Desde los 6 meses hasta los 3 años, organizadas por edad y método de alimentación (BLW o papillas).",
    },
    {
      icon: Zap,
      title: "Fáciles y Rápidas",
      description: "Recetas que toman menos de 15 minutos. Perfectas para padres ocupados.",
    },
    {
      icon: Shield,
      title: "Seguras y Saludables",
      description: "Todas las recetas están diseñadas por nutricionistas infantiles. Sin azúcares añadidos.",
    },
    {
      icon: Users,
      title: "Comunidad de Apoyo",
      description: "Acceso a un grupo exclusivo de padres donde compartir experiencias y resolver dudas.",
    },
  ];

  const bonuses = [
    {
      title: "Guía de Introducción de Alimentos Sólidos",
      description: "Paso a paso seguro para iniciar la alimentación complementaria",
      image: "/images/BONUS1(1).png",
    },
    {
      title: "Trucos para Superar las Etapas Difíciles",
      description: "Soluciones prácticas para cuando tu bebé rechaza la comida",
      image: "/images/MenúsSemanalesPersonalizablesparaBebés-BONUS(1).png",
    },
    {
      title: "Menús Semanales Personalizables",
      description: "Menús listos para cada semana, adaptados por edad",
      image: "/images/MenúsSemanalesPersonalizablesparaBebés-BONUS.png",
    },
    {
      title: "Método y Recetas BLW",
      description: "Todo lo que necesitas saber sobre Baby Led Weaning",
      image: "/images/portadadelibrominimalistanaranjaynegro(1).png",
    },
    {
      title: "Videos de Demostración",
      description: "Tutoriales en video de cómo preparar las recetas",
      icon: "🎥",
    },
    {
      title: "Soporte y Comunidad",
      description: "Acceso exclusivo a grupo de padres y soporte directo",
      image: "/images/soprte.png",
    },
  ];

  const testimonials = [
    {
      name: "María L",
      role: "Mamá de bebé de 10 meses",
      text: "El recetario está increíble. Soy mamá primeriza y no sabía qué darle a mi bebé, pero ahora con estas recetas me siento más tranquila. Son fáciles y mi bebé las disfruta. Me encanta que tenga recetas de BLW, me han servido un montón.",
      image: "/images/WhatsAppImage2025-01-27at12.54.44PM.jpeg",
    },
    {
      name: "Sofía Valencia",
      role: "Mamá de bebé pequeño",
      text: "Gracias por el recetario, me ha sido de mucha ayuda. Las recetas son fáciles y rápidas, y mi bebé se las come feliz. Me siento más segura sabiendo que le estoy dando comida rica y saludable.",
      image: "/images/WhatsAppImage2025-01-27at12.54.44PM(3).jpeg",
    },
    {
      name: "Yolanda C",
      role: "Mamá de bebé en transición",
      text: "Buenasss, encanta el recetario, lo he probado todo y a mi bebé le ha gustado todo. Son recetas fáciles y mi bebé disfruta 😍😍",
      image: "/images/WhatsAppImage2025-01-27at12.54.44PM(2).jpeg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5EFE7]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: "#D4A574" }}></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: "#9CAF88" }}></div>

        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6" style={{ color: "#3D3D3D" }}>
                Transforma la Alimentación de tu Bebé
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed" style={{ color: "#5D5D5D" }}>
                500 recetas nutritivas, fáciles y seguras para que tu bebé coma bien desde los 6 meses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="https://go.hotmart.com/V103308169C?ap=e3a9" target="_blank" rel="noopener noreferrer" className="btn-warm text-center">
                  Obtener Acceso Ahora
                </a>
                <button onClick={() => setShowVideo(true)} className="btn-warm-outline">
                  Ver Demo Gratis
                </button>
              </div>
              <div className="flex gap-8 text-sm md:text-base">
                <div>
                  <div className="font-bold text-2xl" style={{ color: "#D4A574" }}>500+</div>
                  <div style={{ color: "#5D5D5D" }}>Recetas</div>
                </div>
                <div>
                  <div className="font-bold text-2xl" style={{ color: "#9CAF88" }}>7 días</div>
                  <div style={{ color: "#5D5D5D" }}>Garantía</div>
                </div>
                <div>
                  <div className="font-bold text-2xl" style={{ color: "#E8B4A8" }}>6 Bonos</div>
                  <div style={{ color: "#5D5D5D" }}>Exclusivos</div>
                </div>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="fade-in-slow">
              <img
                src="/images/hero-baby-eating.jpg"
                alt="Bebé comiendo alimentos saludables"
                className="rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowVideo(false)}>
          <div className="bg-white rounded-lg max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative pt-[56.25%]">
              <video
                controls
                className="absolute inset-0 w-full h-full rounded-lg"
                src="/videos/VID-20240829-WA0001(1).mp4"
              />
            </div>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#3D3D3D" }}>
              ¿Por Qué Elegir Este Producto?
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: "#5D5D5D" }}>
              Diseñado por nutricionistas infantiles y padres como tú, que entienden los desafíos reales.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="card-warm fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Icon className="w-8 h-8" style={{ color: "#D4A574" }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: "#3D3D3D" }}>
                        {benefit.title}
                      </h3>
                      <p style={{ color: "#5D5D5D" }}>{benefit.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-20 md:py-32 bg-[#F5EFE7]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in-slow">
              <img
                src="/images/fresh-ingredients.jpg"
                alt="Ingredientes frescos para recetas de bebés"
                className="rounded-3xl shadow-lg w-full h-auto"
              />
            </div>
            <div className="fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#3D3D3D" }}>
                Ingredientes Frescos, Recetas Simples
              </h2>
              <p className="text-lg mb-6 leading-relaxed" style={{ color: "#5D5D5D" }}>
                Todas nuestras recetas usan ingredientes que encuentras en cualquier supermercado. Nada complicado, nada costoso.
              </p>
              <ul className="space-y-4">
                {[
                  "Sin conservantes ni aditivos",
                  "Métodos BLW y papillas (tú eliges)",
                  "Organizadas por edad y estación",
                  "Tiempo de preparación: 5-15 minutos",
                ].map((item, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: "#9CAF88" }} />
                    <span style={{ color: "#3D3D3D" }} className="text-lg">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bonuses Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#3D3D3D" }}>
              6 Bonos Exclusivos
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: "#5D5D5D" }}>
              Cuando compres hoy, recibirás estos bonos valorados en $150 USD completamente gratis.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {bonuses.map((bonus, index) => (
              <div key={index} className="card-warm fade-in-up overflow-hidden" style={{ animationDelay: `${index * 80}ms` }}>
                {bonus.image ? (
                  <img src={bonus.image} alt={bonus.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                ) : (
                  <div className="text-5xl mb-4 text-center">{bonus.icon}</div>
                )}
                <h3 className="text-lg font-bold mb-2" style={{ color: "#3D3D3D" }}>
                  {bonus.title}
                </h3>
                <p style={{ color: "#5D5D5D" }} className="text-sm">
                  {bonus.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-[#F5EFE7]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#3D3D3D" }}>
              Lo Que Dicen los Padres
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-warm fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold" style={{ color: "#3D3D3D" }}>
                      {testimonial.name}
                    </h3>
                    <p className="text-sm" style={{ color: "#9CAF88" }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="italic" style={{ color: "#5D5D5D" }}>
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[#FFE5EF] to-[#FFF5F8] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: "#FF6B9D" }}></div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-white px-6 py-2 rounded-full mb-6 shadow-sm">
                <span className="text-[#FF6B9D] font-bold text-sm">🎁 REGALO GRATIS</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#3D3D3D" }}>
                Descarga GRATIS: 5 Desayunos Nutritivos para tu Bebé
              </h2>
              <p className="text-lg md:text-xl mb-8" style={{ color: "#5D5D5D" }}>
                Recibe en tu correo una guía completa con 5 recetas de desayunos fáciles, rápidos y nutritivos. ¡Perfectas para empezar el día con energía!
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: "#3D3D3D" }}>
                      Tu Nombre *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ej: María"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full text-lg p-6 border-2 rounded-xl focus:border-[#FF6B9D] transition-colors"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "#3D3D3D" }}>
                      Tu Correo Electrónico *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full text-lg p-6 border-2 rounded-xl focus:border-[#FF6B9D] transition-colors"
                      disabled={isSubmitting}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-lg py-7 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
                    style={{ backgroundColor: "#FF6B9D", color: "white" }}
                  >
                    {isSubmitting ? "Enviando..." : "🎁 Descargar Mi Regalo GRATIS"}
                  </Button>
                  <p className="text-center text-sm" style={{ color: "#999" }}>
                    ✓ Sin spam | ✓ Descarga inmediata | ✓ 100% Gratis
                  </p>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "#3D3D3D" }}>
                    ¡Listo! Revisa tu correo
                  </h3>
                  <p className="text-lg" style={{ color: "#5D5D5D" }}>
                    Te hemos enviado el PDF con las 5 recetas de desayunos. Si no lo ves, revisa tu carpeta de spam.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg mb-6" style={{ color: "#5D5D5D" }}>
                <strong>¿Te gustaron las 5 recetas?</strong> Imagina tener acceso a 500 recetas más...
              </p>
              <a href="https://go.hotmart.com/V103308169C?ap=e3a9" target="_blank" rel="noopener noreferrer" className="btn-warm inline-block">
                Ver la Colección Completa
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: "#D4A574" }}></div>

        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#3D3D3D" }}>
              Comienza Hoy
            </h2>
            <p className="text-lg md:text-xl mb-8" style={{ color: "#5D5D5D" }}>
              Acceso inmediato a las 500 recetas + 6 bonos exclusivos. Garantía de 7 días sin preguntas.
            </p>

            <div className="flex flex-col gap-4 mb-8 justify-center">
              <a href="https://go.hotmart.com/V103308169C?ap=e3a9" target="_blank" rel="noopener noreferrer" className="btn-warm text-center">
                Obtener Acceso Ahora
              </a>
            </div>

            <p className="text-sm" style={{ color: "#9CAF88" }}>
              ✓ Acceso instantáneo | ✓ Sin tarjeta de crédito | ✓ Garantía de 7 días
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-[#F5EFE7]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#3D3D3D" }}>
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "¿Cuándo puedo empezar a usar estas recetas?",
                a: "A partir de los 6 meses cuando tu bebé esté listo para la alimentación complementaria. También incluimos recetas para bebés de 6 meses a 3 años.",
              },
              {
                q: "¿Funcionan tanto para BLW como para papillas?",
                a: "Sí, todas las recetas están adaptadas para ambos métodos. Tú eliges cuál usar.",
              },
              {
                q: "¿Hay garantía?",
                a: "Sí, 7 días de garantía sin preguntas. Si no estás satisfecho, te devolvemos tu dinero.",
              },
              {
                q: "¿Recibiré actualizaciones?",
                a: "Sí, nuevas recetas y contenido cada mes, de por vida, sin costo adicional.",
              },
            ].map((faq, index) => (
              <div key={index} className="card-warm">
                <h3 className="font-bold text-lg mb-2" style={{ color: "#D4A574" }}>
                  {faq.q}
                </h3>
                <p style={{ color: "#5D5D5D" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t-2" style={{ borderColor: "#E8D5C4" }}>
        <div className="container text-center">
          <p style={{ color: "#5D5D5D" }} className="mb-4">
            © 2024 500 Recetas para Bebés. Todos los derechos reservados.
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" style={{ color: "#D4A574" }} className="hover:underline">
              Privacidad
            </a>
            <a href="#" style={{ color: "#D4A574" }} className="hover:underline">
              Términos
            </a>
            <a href="#" style={{ color: "#D4A574" }} className="hover:underline">
              Contacto
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
