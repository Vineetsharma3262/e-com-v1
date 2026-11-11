export async function GET(_request, { params }) {
  const { code } = await params;
  if (!/^\d{6}$/.test(code)) {
    return Response.json({ ok: false }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${code}`, {
      next: { revalidate: 86400 },
    });
    if (!response.ok) return Response.json({ ok: false }, { status: 502 });
    const body = await response.json();
    const entry = body?.[0];
    const offices = entry?.Status === "Success" ? entry.PostOffice : null;
    if (!offices?.length) return Response.json({ ok: false });

    const localities = [...new Set(offices.map((office) => office.Name).filter(Boolean))];
    return Response.json({
      ok: true,
      city: offices[0].District || offices[0].Block || "",
      state: offices[0].State || "",
      localities,
    });
  } catch {
    return Response.json({ ok: false }, { status: 502 });
  }
}
