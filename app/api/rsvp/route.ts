import { NextResponse } from "next/server";

const SCRIPT_URL = process.env.RSVP_SCRIPT_URL!;
const TOKEN = process.env.RSVP_TOKEN!;

export async function GET() {
  try {
    const res = await fetch(SCRIPT_URL, { cache: "no-store" });
    const data = await res.json();

    if (!data?.ok) {
      return NextResponse.json(data, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: "Failed to load RSVP.", details: String(err?.message ?? err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {

    console.log("=== DEBUG RSVP TOKEN ===");
    console.log("RSVP_TOKEN from env:", TOKEN);
    console.log("RSVP_TOKEN length:", TOKEN?.length);
    console.log("SCRIPT_URL:", SCRIPT_URL);
    
    const body = await req.json();

    const url = new URL(SCRIPT_URL);
    url.searchParams.set("token", TOKEN);

    const res = await fetch(url.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    // IMPORTANT: treat ok:false as an error (Apps Script still returns 200)
    if (!data?.ok) {
      return NextResponse.json(data, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: "Failed to submit RSVP.", details: String(err?.message ?? err) }, { status: 500 });
  }
}