import { MailNotifier } from "../config/mail";

export const sendNotification = (notifier: MailNotifier) => {
  return (user) => {
    notifier.send(user);
  };
};
