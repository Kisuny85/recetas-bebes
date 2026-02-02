import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Enable JSON parsing
  app.use(express.json());

  // Initialize Resend
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // API endpoint for email subscription
  app.post("/api/subscribe", async (req, res) => {
    try {
      const { email, name } = req.body;

      if (!email || !name) {
        return res.status(400).json({ error: "Email y nombre son requeridos" });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Email inválido" });
      }

      // Send welcome email with PDF
      const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tu Regalo: 5 Desayunos Nutritivos</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 0;
      background-color: #f9f9f9;
    }
    .container {
      background-color: #ffffff;
      border-radius: 10px;
      padding: 40px 30px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin: 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 3px solid #FF6B9D;
    }
    .header h1 {
      color: #FF6B9D;
      margin: 0;
      font-size: 32px;
      font-weight: bold;
    }
    .header p {
      color: #666;
      font-size: 16px;
      margin: 10px 0 0 0;
    }
    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      background-color: #FF6B9D;
      color: #ffffff !important;
      padding: 18px 40px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      margin: 25px 0;
      font-size: 18px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(255, 107, 157, 0.3);
    }
    .features {
      background-color: #FFF5F8;
      padding: 25px;
      border-radius: 8px;
      margin: 25px 0;
      border-left: 4px solid #FF6B9D;
    }
    .features h3 {
      color: #FF6B9D;
      margin-top: 0;
      font-size: 20px;
    }
    .features ul {
      margin: 15px 0;
      padding-left: 20px;
    }
    .features li {
      margin: 12px 0;
      font-size: 16px;
    }
    .cta-box {
      background: linear-gradient(135deg, #FFE5EF 0%, #FFF5F8 100%);
      border: 2px solid #FF6B9D;
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      margin: 30px 0;
    }
    .cta-box h2 {
      color: #FF6B9D;
      margin: 0 0 15px 0;
      font-size: 26px;
    }
    .cta-box p {
      font-size: 18px;
      margin: 15px 0;
      color: #333;
    }
    .highlight {
      background-color: #FFE5EF;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      text-align: center;
    }
    .highlight strong {
      color: #FF6B9D;
      font-size: 20px;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #f0f0f0;
      font-size: 14px;
      color: #666;
    }
    .emoji {
      font-size: 24px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1><span class="emoji">🎁</span> Mamá Chef Bebé</h1>
      <p>Alimentación nutritiva y fácil para tu bebé</p>
    </div>
    
    <p class="greeting">¡Hola <strong>${name}</strong>!</p>
    
    <p>Gracias por confiar en <strong>Mamá Chef Bebé</strong>. Sé lo que es sentirse abrumada buscando recetas nutritivas y apropiadas para tu bebé. Por eso creé esta guía especial para ti.</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://recetas-bebes.vercel.app/5-desayunos-gratis.pdf" class="button">
        <span class="emoji">👉</span> Descarga tu PDF GRATIS aquí
      </a>
    </div>
    
    <div class="features">
      <h3><span class="emoji">✨</span> Dentro de tu guía encontrarás:</h3>
      <ul>
        <li><strong>5 recetas de desayunos nutritivos</strong> probadas y aprobadas por bebés</li>
        <li><strong>Fáciles y rápidas</strong> - Perfectas para mamás ocupadas</li>
        <li><strong>Adaptadas por edad</strong> - De 6 a 24 meses</li>
        <li><strong>Ingredientes simples</strong> - Que ya tienes en casa</li>
        <li><strong>Información nutricional</strong> - Para tu tranquilidad</li>
      </ul>
    </div>
    
    <div class="highlight">
      <p><span class="emoji">💡</span> <strong>Consejo de mamá a mamá:</strong></p>
      <p>Empieza con la "Papilla de Avena con Plátano" - es la favorita de la mayoría de los bebés y solo toma 5 minutos prepararla.</p>
    </div>
    
    <div class="cta-box">
      <h2><span class="emoji">🍽️</span> ¿Te gustaría tener 500 recetas más?</h2>
      <p>Si estas 5 recetas te resultan útiles, imagina tener acceso a una <strong>colección completa de 500 recetas</strong> organizadas por edad, con menús semanales, listas de compras y guías nutricionales.</p>
      <p style="font-size: 16px; color: #666; margin-top: 20px;">Más de <strong>5,000 mamás</strong> ya confían en esta colección para alimentar a sus bebés con tranquilidad y variedad.</p>
      <div style="margin-top: 25px;">
        <a href="https://recetas-bebes.vercel.app" class="button">
          <span class="emoji">🌟</span> Ver la Colección Completa
        </a>
      </div>
    </div>
    
    <p style="margin-top: 30px;">¿Tienes dudas sobre alguna receta? Responde este correo y con gusto te ayudo.</p>
    
    <p style="margin-top: 20px;">Con cariño,<br><strong>Mamá Chef Bebé</strong> <span class="emoji">💕</span></p>
    
    <p style="font-size: 13px; color: #999; margin-top: 25px; font-style: italic;">P.D.: Guarda este correo para tener siempre a mano el enlace del PDF. Y si conoces a otra mamá que pueda beneficiarse, ¡compártelo!</p>
    
    <div class="footer">
      <p><strong>© 2026 Mamá Chef Bebé</strong></p>
      <p>Todos los derechos reservados</p>
    </div>
  </div>
</body>
</html>
      `;

      const { data, error } = await resend.emails.send({
        from: "Mamá Chef Bebé <onboarding@resend.dev>",
        to: [email],
        subject: "🎁 Tu Regalo: 5 Desayunos Nutritivos para tu Bebé",
        html: htmlContent,
      });

      if (error) {
        console.error("Error enviando email:", error);
        return res.status(500).json({ error: "Error al enviar el email" });
      }

      console.log("Email enviado exitosamente:", data);
      return res.status(200).json({ 
        success: true, 
        message: "¡Gracias! Revisa tu correo para descargar el PDF." 
      });
    } catch (error) {
      console.error("Error en suscripción:", error);
      return res.status(500).json({ error: "Error al procesar la suscripción" });
    }
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
