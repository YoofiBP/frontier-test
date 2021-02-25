import dotenv from "dotenv";
dotenv.config();

import { MailService } from "@sendgrid/mail";

export interface MailNotifier {
  send(user);
}

class SendGridEmailNotifier implements MailNotifier {
  private mailerService: any;

  constructor() {
    this.mailerService = new MailService();
    this.mailerService.setApiKey(process.env.SENDGRID_API_KEY);
  }

  send(user) {
    this.mailerService.send({
      to: user.email,
      from: "joseph.brown-pobee@ashesi.edu.gh",
      subject: "Your application has been successfully submitted",
      html:
        "<h1>Congratulations your application to Frontier has been submitted successfully</h1>",
    });
  }
}

export const sendGridNotifier = new SendGridEmailNotifier();
