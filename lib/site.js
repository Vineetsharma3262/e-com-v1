export const site = {
  name: "Haat",
  phoneDisplay: "+91 00000 00000",
  phoneTel: "+910000000000",
  whatsapp: "910000000000",
  email: "hello@haat.store",
  addressLines: ["Your Street, Your City", "Your State, India"],
  addressOneLine: "Your Street, Your City, Your State, India",
  freeShippingOver: 299,
  shippingFee: 99,
  instagram: "#",
  facebook: "#",
};

export function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function whatsappLink(message) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mapsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.addressOneLine)}`;
}
