import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = {
  title: "Terms & Conditions",
};

const prose =
  "space-y-3 leading-relaxed text-muted [&_a]:font-semibold [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_b]:font-semibold [&_b]:text-ink [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5";

const toc = [
  ["using-the-website", "1. Using the website"],
  ["products", "2. Products and prices"],
  ["orders", "3. Orders"],
  ["payment", "4. Payment"],
  ["shipping", "5. Shipping and delivery"],
  ["cancellation", "6. Cancellations"],
  ["returns", "7. Returns, exchanges and refunds"],
  ["conduct", "8. Acceptable use"],
  ["ip", "9. Content and trademarks"],
  ["liability", "10. Our responsibility to you"],
  ["law", "11. Governing law and disputes"],
  ["changes", "12. Changes to these terms"],
  ["contact", "13. Grievance officer and contact"],
];

function Block({ id, title, children }) {
  return (
    <section id={id} className="mt-10 scroll-mt-36">
      <h2 className="font-serif text-2xl font-semibold">{title}</h2>
      <div className={`mt-3 ${prose}`}>{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 lg:px-8">
    <article className="mx-auto max-w-3xl">
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-accent">Haat</p>
      <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">Terms & Conditions</h1>
      <p className="mt-3 text-sm text-muted">Last updated: 3 November 2026</p>
      <div className={`mt-6 text-[17px] ${prose}`}>
        <p>
          These terms apply when you browse this website or buy from Haat (“we”, “us”). Please read them before placing an order. By using the website you agree to these terms and to our <Link href="/privacy">Privacy Policy</Link>.
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
      <Block id="using-the-website" title="1. Using the website">
        <p>You must be 18 or older to place an order, or do so with the involvement of a parent or guardian.</p>
        <p>Please give accurate details when you contact us or place an order. We may refuse orders linked to fraud or misuse of the website.</p>
      </Block>
      <Block id="products" title="2. Products and prices">
        <p>All prices are in Indian Rupees (₹) and include applicable taxes. Shipping charges, if any, are shared with you before you pay.</p>
        <p>We try to show products accurately, but colours and details may look slightly different on your screen. If a price or description is clearly wrong, we may cancel the affected order and refund you in full.</p>
      </Block>
      <Block id="orders" title="3. Orders">
        <p>Placing an order is an offer to buy. The order is confirmed once payment is received and we send you the confirmation. We may decline or cancel an order, for example if an item is out of stock, the address is not serviceable, or we suspect fraud. If you have already paid for a cancelled order, we refund the full amount.</p>
      </Block>
      <Block id="payment" title="4. Payment">
        <p>Payments are processed securely by our payment partners using UPI, cards, net banking or cash on delivery. We do not see or store your card, UPI or bank details. If a payment fails but money is deducted from your account, it is normally reversed automatically by your bank or the payment partner; contact us with your order number if it is not.</p>
      </Block>
      <Block id="shipping" title="5. Shipping and delivery">
        <ul className="list-disc space-y-1 pl-5">
          <li>We deliver to serviceable PIN codes across India.</li>
          <li>Shipping is free on orders over ₹299. Otherwise, a shipping fee of ₹99 applies.</li>
          <li>Orders usually arrive within 3–6 business days of dispatch. Delivery times are estimates and can be affected by the courier, location, weather or holidays.</li>
          <li>Please check the package when it arrives. If it is damaged, opened or the wrong item, contact us as soon as possible with your order number and photos.</li>
        </ul>
      </Block>
      <Block id="cancellation" title="6. Cancellations">
        <p>You can cancel an order before it is dispatched by contacting us with your order number. Paid orders cancelled before dispatch are refunded in full. Once an order has been dispatched, it can no longer be cancelled, but you may return it under the returns policy below.</p>
      </Block>
      <Block id="returns" title="7. Returns, exchanges and refunds">
        <ul className="list-disc space-y-1 pl-5">
          <li>You can return or exchange items within 7 days of delivery, provided they are unused, unwashed and have their original tags and packaging.</li>
          <li>To start a return, contact us by email or WhatsApp with your order number and the item(s) you want to return. We will share the return instructions.</li>
          <li>Once we receive and check the returned item, we refund the item price to your original payment method. Banks may take a few additional working days to show the credit.</li>
          <li>If you received a damaged, defective or wrong item, we will replace it or give a full refund, including any shipping charge.</li>
        </ul>
      </Block>
      <Block id="conduct" title="8. Acceptable use">
        <p>Please do not misuse the website: no attempts to access other people&apos;s data, interfere with the website&apos;s operation, place fraudulent orders or copy content for commercial use.</p>
      </Block>
      <Block id="ip" title="9. Content and trademarks">
        <p>The Haat name, logo, text, images and design of this website belong to us or our licensors. You may not use them without our written permission.</p>
      </Block>
      <Block id="liability" title="10. Our responsibility to you">
        <p>We are responsible for supplying the products you order as described. To the extent the law allows, we are not liable for indirect losses or for delays caused by events outside our reasonable control. Our total liability for any order is limited to the amount you paid for it. Nothing in these terms limits your rights under the Consumer Protection Act, 2019.</p>
      </Block>
      <Block id="law" title="11. Governing law and disputes">
        <p>These terms are governed by the laws of India. Please contact us first so we can try to resolve any issue. Otherwise, disputes are subject to the jurisdiction of the courts where our business is registered, without affecting your right to approach a consumer commission.</p>
      </Block>
      <Block id="changes" title="12. Changes to these terms">
        <p>We may update these terms from time to time. The version shown when you place an order applies to that order.</p>
      </Block>
      <Block id="contact" title="13. Grievance officer and contact">
        <p>For complaints about an order, a product or this website, contact our grievance officer. We acknowledge complaints within 48 hours and aim to resolve them within one month.</p>
        <address className="rounded-2xl border border-line bg-card p-5 not-italic">
          <b>Grievance Officer</b>, Customer Care, Haat
          <br />
          {site.addressOneLine}
          <br />
          Email: <a href={`mailto:${site.email}`}>{site.email}</a> · Phone/WhatsApp: <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
        </address>
      </Block>
      <p className="mt-12 border-t border-line pt-6 text-sm text-muted [&_a]:font-semibold [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2">
        See also: <Link href="/privacy">Privacy Policy</Link> · <Link href="/terms">Terms & Conditions</Link>
      </p>
    </article>
    </div>
  );
}
