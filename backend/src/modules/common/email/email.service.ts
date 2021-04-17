import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor() {
    if (!['development'].includes(process.env.NODE_ENV)) {
      const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
      if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS)
        throw new Error('Missing SMTP config.');

      this.transporter = createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }
  }

  async sendMail(
    mailTo: string | string[],
    subject: string,
    body?: string,
    htmlBody?: string,
    attachments?: Transporter['options']['attachments'],
  ): Promise<void> {
    if (Array.isArray(mailTo) && mailTo.length === 0) return;

    if (['test', 'development'].includes(process.env.NODE_ENV)) {
      console.log('Sending mail');
      console.log('To:', mailTo);
      console.log('Subject:', subject);
      if (body) console.log('Text:', body);
      if (htmlBody) console.log('HtmlBody:', htmlBody);
      if (attachments) console.log('Attachments count:', attachments.length);
      return;
    }

    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: mailTo,
        subject,
        text: body,
        html: htmlBody,
        attachments,
      });
    } catch (e) {
      console.error(e);
    }
  }
}
