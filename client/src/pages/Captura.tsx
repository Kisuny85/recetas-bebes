import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function Captura() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE5EF] to-[#FFF5F8] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: "#FF6B9D" }}></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: "#FFB6C1" }}></div>

      <div className="relative z-10 max-w-2xl w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#FF6B9D" }}>
            🍼 Mamá Chef Bebé
          </h1>
          <p className="text-lg" style={{ color: "#666" }}>
            Alimentación nutritiva y fácil para tu bebé
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {!submitted ? (
            <>
              {/* Gift Badge */}
              <div className="text-center mb-8">
                <div className="inline-block bg-gradient-to-r from-[#FF6B9D] to-[#FFB6C1] px-6 py-2 rounded-full mb-6 shadow-md">
                  <span className="text-white font-bold text-sm">🎁 REGALO GRATIS</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#3D3D3D" }}>
                  5 Desayunos Nutritivos para tu Bebé
                </h2>
                <p className="text-lg md:text-xl mb-6" style={{ color: "#5D5D5D" }}>
                  Recibe en tu correo una guía completa con 5 recetas de desayunos fáciles, rápidos y nutritivos. ¡Perfectas para empezar el día con energía!
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-[#FFF5F8] rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-lg mb-4" style={{ color: "#FF6B9D" }}>
                  ✨ Dentro de tu guía encontrarás:
                </h3>
                <ul className="space-y-3">
                  {[
                    "5 recetas probadas y aprobadas por bebés",
                    "Fáciles y rápidas - Perfectas para mamás ocupadas",
                    "Adaptadas por edad - De 6 a 24 meses",
                    "Ingredientes simples que ya tienes en casa",
                    "Información nutricional completa",
                  ].map((item, index) => (
                    <li key={index} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#FF6B9D" }} />
                      <span style={{ color: "#3D3D3D" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Form */}
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
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-16 h-16 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold mb-4" style={{ color: "#3D3D3D" }}>
                ¡Listo! Revisa tu correo
              </h3>
              <p className="text-xl mb-6" style={{ color: "#5D5D5D" }}>
                Te hemos enviado el PDF con las 5 recetas de desayunos.
              </p>
              <p className="text-lg mb-8" style={{ color: "#999" }}>
                Si no lo ves en tu bandeja de entrada, revisa tu carpeta de spam.
              </p>
              <div className="bg-[#FFF5F8] rounded-2xl p-6">
                <p className="text-lg mb-4" style={{ color: "#3D3D3D" }}>
                  💡 <strong>Consejo:</strong> Mientras esperas el correo, ¿te gustaría ver nuestra colección completa de 500 recetas?
                </p>
                <a
                  href="/"
                  className="inline-block bg-[#FF6B9D] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#E55A8A] transition-colors shadow-md"
                >
                  Ver Colección Completa
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm" style={{ color: "#666" }}>
            © 2026 Mamá Chef Bebé. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
