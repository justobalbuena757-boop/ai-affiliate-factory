export const prerender = false;

export async function GET({ request }: { request: Request }) {
  try {
    const url = new URL(request.url);
    const uuid = url.searchParams.get('uuid');
    if (!uuid) {
      return new Response(JSON.stringify({ visits: [] }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ visits: [] }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ visits: [] }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
