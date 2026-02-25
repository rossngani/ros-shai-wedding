import { NextResponse } from "next/server";

type Entry = {
  name: string;
  message: string;
  createdAt: string;
};

// Temporary in-memory store (resets on redeploy/server restart)
const store: Entry[] = [];

export async function GET() {
  return NextResponse.json({ entries: store.slice().reverse() });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name ?? "").trim();
    const message = String(body?.message ?? "").trim();

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required." },
        { status: 400 }
      );
    }

    if (name.length > 60) {
      return NextResponse.json(
        { error: "Name is too long." },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "Message is too long (max 500 characters)." },
        { status: 400 }
      );
    }

    const entry: Entry = {
      name,
      message,
      createdAt: new Date().toISOString(),
    };

    store.push(entry);

    return NextResponse.json({ ok: true, entry });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}