export const prerender = false;

export async function POST({ request }: { request: Request }) {
	try {
		const data = await request.json();
		const { uuid, url, title, referrer, screen, tz } = data ?? {};
		if (!uuid || !url) return new Response(null, { status: 204 });

		const visit = {
			url,
			title: title || "",
			referrer: referrer || "",
			screen: screen || "",
			tz: tz || "",
			timestamp: new Date().toISOString(),
			ua: (request.headers.get("user-agent") || "").slice(0, 120),
		};

		console.log("");
		console.log("━━━ TRACK ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
		console.log(`  UUID:    ${uuid}`);
		console.log(`  URL:     ${url}`);
		console.log(`  Title:   ${title || "-"}`);
		console.log(`  Source:  ${referrer ? "referrer" : "direct"}`);
		if (referrer) console.log(`  Ref:     ${referrer}`);
		console.log(`  Screen:  ${screen || "-"}`);
		console.log(`  TZ:      ${tz || "-"}`);
		console.log(`  UA:      ${(visit.ua || "").slice(0, 80)}`);
		console.log(`  Time:    ${visit.timestamp}`);
		console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

		return new Response(null, { status: 204 });
	} catch {
		return new Response(null, { status: 204 });
	}
}
