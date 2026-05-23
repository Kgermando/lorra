import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json());

/**
 * POST /api/contact — envoie un e-mail via Gandi SMTP
 */
app.post('/api/contact', async (req, res) => {
  const { name, phone, email, service, message } = req.body as {
    name: string;
    phone: string;
    email?: string;
    service: string;
    message: string;
  };

  if (!name || !phone || !service || !message) {
    res.status(400).json({ error: 'Champs obligatoires manquants.' });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env['SMTP_HOST'] ?? 'mail.gandi.net',
    port: Number(process.env['SMTP_PORT'] ?? 587),
    secure: false,
    auth: {
      user: process.env['SMTP_USER'],
      pass: process.env['SMTP_PASS'],
    },
  });

  const htmlBody = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
      <div style="background:#1a6bbd;padding:24px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:22px;">Nouvelle demande de rendez-vous</h1>
        <p style="color:#cde4ff;margin:6px 0 0;">Clinique Lorra Medical</p>
      </div>
      <div style="padding:24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#555;width:40%;">Nom complet</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:bold;">${name}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#555;">Téléphone</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:bold;">${phone}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#555;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">${email ?? '—'}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#555;">Service souhaité</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:bold;">${service}</td></tr>
        </table>
        <div style="margin-top:16px;">
          <p style="color:#555;margin:0 0 8px;">Message :</p>
          <p style="background:#f8f8f8;padding:12px;border-radius:4px;margin:0;">${message.replace(/\n/g, '<br>')}</p>
        </div>
      </div>
      <div style="background:#f5f5f5;padding:12px 24px;text-align:center;font-size:12px;color:#999;">
        Ce message a été envoyé depuis le formulaire de contact du site lorra-medical.com
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Lorra Medical" <${process.env['SMTP_USER']}>`,
      to: process.env['CONTACT_EMAIL'],
      replyTo: email ?? process.env['SMTP_USER'],
      subject: `[Rendez-vous] ${service} — ${name}`,
      html: htmlBody,
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Erreur envoi e-mail:', err);
    res.status(500).json({ error: 'Échec de l\'envoi de l\'e-mail.' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
