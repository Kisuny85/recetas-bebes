import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Almacenamiento simple en memoria (en producción usar base de datos)
const subscribers: Array<{
  email: string;
  name: string;
  subscribedAt: Date;
  emailsSent: number[];
}> = [];

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email || !name) {
      return new Response(
        JSON.stringify({ error: 'Email y nombre son requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verificar si ya está suscrito
    const existing = subscribers.find(s => s.email === email);
    if (existing) {
      return new Response(
        JSON.stringify({ message: 'Ya estás suscrito' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Agregar nuevo suscriptor
    subscribers.push({
      email,
      name,
      subscribedAt: new Date(),
      emailsSent: []
    });

    // Enviar Email 1 inmediatamente
    await sendEmail1(email, name);

    // Programar Email 2 (día 2) y Email 3 (día 4)
    scheduleEmails(email, name);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: '¡Gracias! Revisa tu correo para descargar el PDF.' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error en suscripción:', error);
    return new Response(
      JSON.stringify({ error: 'Error al procesar la suscripción' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function sendEmail1(email: string, name: string) {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    }
    .container {
      background-color: #ffffff;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #FF6B9D;
      margin: 0;
      font-size: 28px;
    }
    .button {
      display: inline-block;
      background-color: #FF6B9D;
      color: #ffffff !important;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin: 20px 0;
    }
    .features {
      background-color: #FFF5F8;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .features li {
      margin: 10px 0;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 14px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎁 Mamá Chef Bebé</h1>
    </div>
    
    <p>¡Hola ${name}!</p>
    
    <p>Gracias por confiar en Mamá Chef Bebé. Como prometí, aquí tienes tu guía gratuita con <strong>5 recetas de desayunos nutritivos</strong> que le encantarán a tu bebé.</p>
    
    <div style="text-align: center;">
      <a href="https://recetas-bebes.vercel.app/5-desayunos-gratis.pdf" class="button">
        👉 Descarga tu PDF aquí
      </a>
    </div>
    
    <div class="features">
      <p><strong>Estas recetas están diseñadas para:</strong></p>
      <ul>
        <li>✅ Ser fáciles y rápidas de preparar</li>
        <li>✅ Aportar los nutrientes que tu bebé necesita</li>
        <li>✅ Adaptarse a diferentes etapas (6-24 meses)</li>
      </ul>
    </div>
    
    <p><strong>Un consejo rápido:</strong> Empieza con la receta de "Papilla de Avena con Plátano" - es la favorita de la mayoría de los bebés y solo toma 5 minutos.</p>
    
    <p>¿Tienes dudas sobre alguna receta? Responde este correo y con gusto te ayudo.</p>
    
    <p>Con cariño,<br><strong>Mamá Chef Bebé</strong></p>
    
    <p style="font-size: 12px; color: #999; margin-top: 20px;">P.D.: Guarda este correo para tener siempre a mano el enlace del PDF.</p>
    
    <div class="footer">
      <p>© 2026 Mamá Chef Bebé. Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await resend.emails.send({
      from: 'Mamá Chef Bebé <onboarding@resend.dev>',
      to: email,
      subject: '🎁 Aquí están tus 5 Desayunos Nutritivos para tu Bebé',
      html: htmlContent,
    });
    
    const subscriber = subscribers.find(s => s.email === email);
    if (subscriber) {
      subscriber.emailsSent.push(1);
    }
  } catch (error) {
    console.error('Error enviando email 1:', error);
  }
}

function scheduleEmails(email: string, name: string) {
  // Email 2 después de 2 días (172800000 ms)
  setTimeout(() => {
    sendEmail2(email, name);
  }, 2 * 24 * 60 * 60 * 1000);

  // Email 3 después de 4 días (345600000 ms)
  setTimeout(() => {
    sendEmail3(email, name);
  }, 4 * 24 * 60 * 60 * 1000);
}

async function sendEmail2(email: string, name: string) {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    }
    .container {
      background-color: #ffffff;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #FF6B9D;
      margin: 0;
      font-size: 28px;
    }
    .story-box {
      background-color: #FFF5F8;
      padding: 20px;
      border-left: 4px solid #FF6B9D;
      margin: 20px 0;
    }
    .challenges {
      margin: 20px 0;
    }
    .challenges li {
      margin: 10px 0;
      color: #666;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 14px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>💭 Mamá Chef Bebé</h1>
    </div>
    
    <p>Hola de nuevo ${name},</p>
    
    <p>Espero que hayas tenido oportunidad de probar alguna de las recetas que te envié.</p>
    
    <div class="story-box">
      <p><strong>Quiero contarte algo personal:</strong></p>
      <p>Cuando mi bebé tenía 8 meses, pasé <strong>horas buscando recetas</strong> en internet, viendo videos, preguntando a otras mamás... y aún así me sentía perdida.</p>
    </div>
    
    <p><strong>¿Te ha pasado?</strong></p>
    
    <div class="challenges">
      <ul>
        <li>❌ No sabía si las porciones eran correctas</li>
        <li>❌ Tenía miedo de que faltaran nutrientes</li>
        <li>❌ Me frustraba cuando mi bebé rechazaba la comida</li>
        <li>❌ Quería variedad pero siempre terminaba haciendo lo mismo</li>
      </ul>
    </div>
    
    <p>Por eso creé <strong>Mamá Chef Bebé</strong>: para que ninguna mamá tenga que pasar por esa incertidumbre.</p>
    
    <p>Las 5 recetas que te envié son solo el comienzo. Imagina tener <strong>500 recetas probadas</strong> a tu disposición, organizadas por edad, ingredientes y necesidades nutricionales.</p>
    
    <p>Mañana te contaré más sobre esto.</p>
    
    <p>Mientras tanto, cuéntame: <strong>¿cuál ha sido tu mayor reto al preparar comida para tu bebé?</strong> Me encantaría conocer tu experiencia.</p>
    
    <p>Con cariño,<br><strong>Mamá Chef Bebé</strong></p>
    
    <div class="footer">
      <p>© 2026 Mamá Chef Bebé. Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await resend.emails.send({
      from: 'Mamá Chef Bebé <onboarding@resend.dev>',
      to: email,
      subject: '¿Ya probaste las recetas? Te cuento algo personal...',
      html: htmlContent,
    });
    
    const subscriber = subscribers.find(s => s.email === email);
    if (subscriber) {
      subscriber.emailsSent.push(2);
    }
  } catch (error) {
    console.error('Error enviando email 2:', error);
  }
}

async function sendEmail3(email: string, name: string) {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    }
    .container {
      background-color: #ffffff;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #FF6B9D;
      margin: 0;
      font-size: 28px;
    }
    .button {
      display: inline-block;
      background-color: #FF6B9D;
      color: #ffffff !important;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin: 20px 0;
      font-size: 18px;
    }
    .benefits {
      background-color: #FFF5F8;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .benefits li {
      margin: 10px 0;
    }
    .highlight-box {
      background-color: #FFE5EF;
      border: 2px solid #FF6B9D;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      margin: 25px 0;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 14px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🍽️ Mamá Chef Bebé</h1>
    </div>
    
    <p>Hola ${name},</p>
    
    <p>Si las 5 recetas gratuitas te han sido útiles, tengo una noticia que te va a encantar.</p>
    
    <p>He reunido <strong>500 recetas completas</strong> en una colección digital que incluye:</p>
    
    <div class="benefits">
      <ul>
        <li>✅ <strong>500 recetas</strong> organizadas por edad (6-24 meses)</li>
        <li>✅ <strong>Menús semanales</strong> ya planificados</li>
        <li>✅ <strong>Lista de compras</strong> para cada semana</li>
        <li>✅ <strong>Guía de nutrición</strong> por etapa</li>
        <li>✅ <strong>Tips de conservación</strong> y preparación anticipada</li>
        <li>✅ <strong>Recetas para alergias</strong> e intolerancias</li>
        <li>✅ <strong>Videos tutoriales</strong> de las recetas más populares</li>
      </ul>
    </div>
    
    <p><strong>¿Por qué esta colección es diferente?</strong></p>
    
    <p>Cada receta incluye:</p>
    <ul>
      <li>⏱️ Tiempo de preparación exacto</li>
      <li>👶 Porciones según la edad</li>
      <li>📊 Información nutricional completa</li>
      <li>🔄 Variaciones y sustituciones</li>
      <li>💡 Consejos para que tu bebé la acepte mejor</li>
    </ul>
    
    <div class="highlight-box">
      <h2 style="color: #FF6B9D; margin: 0 0 10px 0;">Oferta Especial para Ti</h2>
      <p style="font-size: 18px; margin: 10px 0;">Como ya descargaste las 5 recetas gratuitas, tienes acceso a un <strong style="font-size: 24px; color: #FF6B9D;">descuento exclusivo del 30%</strong></p>
      <p style="font-size: 14px; color: #666;">Esta oferta es solo para los próximos 3 días</p>
    </div>
    
    <div style="text-align: center;">
      <a href="https://recetas-bebes.vercel.app" class="button">
        👉 Ver la Colección Completa
      </a>
    </div>
    
    <p><strong>Garantía de satisfacción:</strong> Si en 30 días sientes que la colección no valió la pena, te devuelvo tu dinero sin preguntas.</p>
    
    <p>Imagina tener la tranquilidad de saber que cada comida que preparas es nutritiva, balanceada y perfecta para tu bebé.</p>
    
    <p><strong>¿Lista para simplificar la alimentación de tu bebé?</strong></p>
    
    <p>Con cariño,<br><strong>Mamá Chef Bebé</strong></p>
    
    <p style="font-size: 12px; color: #999; margin-top: 20px;">P.D.: Más de 5,000 mamás ya confían en esta colección. Lee sus testimonios en la página de compra.</p>
    
    <div style="text-align: center; margin-top: 30px;">
      <a href="https://recetas-bebes.vercel.app" class="button">
        👉 Acceder a la Oferta Especial
      </a>
    </div>
    
    <div class="footer">
      <p>© 2026 Mamá Chef Bebé. Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await resend.emails.send({
      from: 'Mamá Chef Bebé <onboarding@resend.dev>',
      to: email,
      subject: '🍽️ 500 Recetas para tu Bebé (Oferta Especial)',
      html: htmlContent,
    });
    
    const subscriber = subscribers.find(s => s.email === email);
    if (subscriber) {
      subscriber.emailsSent.push(3);
    }
  } catch (error) {
    console.error('Error enviando email 3:', error);
  }
}
