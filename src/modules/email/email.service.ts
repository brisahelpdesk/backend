import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
}

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);

    constructor(private readonly configService: ConfigService) {}

    async sendPasswordResetEmail(
    to: string,
    resetToken: string,
    frontendUrl: string
  ): Promise<void> {
    const passwordResetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;
    
    const subject = 'BRISA Helpdesk - Reset Your Password';

    await this.sendEmail({
      to,
      subject,
      text: passwordResetUrl
    });
  }

  private async sendEmail(options: EmailOptions): Promise<void> {
    // For now, we'll log the email instead of actually sending it
    // In production, you would integrate with a real email service like SendGrid, AWS SES, etc.
    this.logger.log(`Email would be sent to: ${options.to}`);
    this.logger.log(`Subject: ${options.subject}`);
    
    // TODO: Implement actual email sending
    // Example with a hypothetical email service:
    // await this.emailProvider.send(options);
  }
} 