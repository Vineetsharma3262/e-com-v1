import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy",
};

const prose =
  "space-y-3 leading-relaxed text-muted [&_a]:font-semibold [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_b]:font-semibold [&_b]:text-ink [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5";

const toc = [
  ["data", "1. Data we collect"],
  ["use", "2. How we use your data"],
  ["cookies", "3. Cookies and browser storage"],
  ["sharing", "4. Who we share your data with"],
  ["retention", "5. How long we keep data"],
  ["security", "6. How we protect your data"],
  ["rights", "7. Your rights"],
  ["children", "8. Children"],
  ["changes", "9. Changes to this policy"],
  ["contact", "10. Grievance officer and contact"],
];

function Block({ id, title, children }) {
  return (
    <section id={id} className="mt-10 scroll-mt-36">
      <h2 className="font-serif text-2xl font-semibold">{title}</h2>
      <div className={`mt-3 ${prose}`}>{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 lg:px-8">
    <article className="mx-auto max-w-3xl">
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-accent">Haat</p>
      <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted">Last updated: 3 November 2026</p>
      <div className={`mt-6 text-[17px] ${prose}`}>
      <p>
        This policy explains what personal data Haat (“we”, “us”) collects when you use this website, why we collect it, who we share it with and the choices you have. It is written in line with the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000.         By using this website or placing an order, you agree to this policy.
      </p>
      </div>
      <nav aria-label="Contents" className="mt-8 rounded-2xl border border-line bg-card p-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-muted">Contents</p>
        <ol className="grid gap-1.5 text-sm sm:grid-cols-2">
          {toc.map(([id, label]) => (
            <li key={id}>
              <a className="hover:text-accent" href={`#${id}`}>{label}</a>
            </li>
          ))}
        </ol>
      </nav>
      <Block id="data" title="1. Data we collect">
        <ul className="list-disc space-y-1 pl-5">
          <li>Contact details: your name, email address and mobile number when you contact us or place an order.</li>
          <li>Order details: your delivery name, address, PIN code and mobile number, the products you order and your order history.</li>
          <li>Payment information: the payment status and transaction reference from our payment gateway partner. Card, UPI and bank details are entered on the payment partner&apos;s page and are never stored by us.</li>
          <li>Messages: anything you send us by email, phone or WhatsApp.</li>
          <li>Technical data: our hosting provider automatically records basic request information such as IP address, browser type and the pages requested, for security and troubleshooting.</li>
        </ul>
      </Block>
      <Block id="use" title="2. How we use your data">
        <p>We use your data only to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>process, pack, ship and deliver your orders, and handle returns and refunds;</li>
          <li>send you order updates;</li>
          <li>answer your questions and resolve complaints;</li>
          <li>prevent fraud and keep the website secure;</li>
          <li>meet our legal, tax and accounting obligations.</li>
        </ul>
        <p>We will only send you promotional messages if you have opted in, and you can unsubscribe at any time. We do not sell your personal data.</p>
      </Block>
      <Block id="cookies" title="3. Cookies and browser storage">
        <p>We do not use login cookies. Your light/dark preference is saved in your own browser (local storage), not on our servers.</p>
        <p>We do not use advertising or third-party tracking cookies.</p>
      </Block>
      <Block id="sharing" title="4. Who we share your data with">
        <p>We share only what each service needs to do its job:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Our hosting provider: hosting of this website.</li>
          <li>Our payment gateway partner: to take payment for your order (name, email, mobile number and order amount).</li>
          <li>Courier partners: your delivery name, address and mobile number.</li>
          <li>Email service provider: to deliver order emails.</li>
          <li>Government or law-enforcement authorities: only when required by law.</li>
        </ul>
        <p>Some of these providers may store data on servers outside India. We use providers that protect data with industry-standard security.</p>
      </Block>
      <Block id="retention" title="5. How long we keep data">
        <p>We keep your contact details for as long as we need them to serve you. Order and invoice records are kept for as long as tax and accounting laws require. When data is no longer needed, we delete or anonymise it.</p>
      </Block>
      <Block id="security" title="6. How we protect your data">
        <p>The website is served only over secure, encrypted connections (HTTPS), and payment details never touch our servers. No system is perfectly secure, but if we become aware of a breach affecting you, we will inform you and the authorities as the law requires.</p>
      </Block>
      <Block id="rights" title="7. Your rights">
        <p>You can ask us to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>tell you what personal data we hold about you;</li>
          <li>correct or update it;</li>
          <li>delete your personal data, except records we must keep by law;</li>
          <li>withdraw consent you have given, for example to promotional messages;</li>
          <li>nominate another person to exercise these rights on your behalf.</li>
        </ul>
        <p>Email us to make a request. If you are not satisfied with our response, you may complain to the Data Protection Board of India.</p>
      </Block>
      <Block id="children" title="8. Children">
        <p>This website is meant for adults. If you are under 18, please use it only with the involvement and consent of a parent or guardian.</p>
      </Block>
      <Block id="changes" title="9. Changes to this policy">
        <p>We may update this policy from time to time. The date at the top shows the latest version. For significant changes, we will post a notice on this website.</p>
      </Block>
      <Block id="contact" title="10. Grievance officer and contact">
        <p>For any privacy question, request or complaint, contact our grievance officer. We acknowledge complaints within 48 hours and aim to resolve them within one month.</p>
        <address className="rounded-2xl border border-line bg-card p-5 not-italic">
          <b>Grievance Officer</b>, Customer Care, Haat
          <br />
          {site.addressOneLine}
          <br />
          Email: <a href={`mailto:${site.email}`}>{site.email}</a> · Phone/WhatsApp: <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
        </address>
        <p>
          See also our <Link href="/terms">Terms & Conditions</Link>.
        </p>
      </Block>
      <p className="mt-12 border-t border-line pt-6 text-sm text-muted [&_a]:font-semibold [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2">
        See also: <Link href="/privacy">Privacy Policy</Link> · <Link href="/terms">Terms & Conditions</Link>
      </p>
    </article>
    </div>
  );
}
