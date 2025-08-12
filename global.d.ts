declare module 'next/server' {
  import type { IncomingMessage } from 'http';

  export class NextResponse {
    static next(): NextResponse;
    static redirect(url: string | URL, status?: number): NextResponse;
  }

  export interface NextRequest extends IncomingMessage {
    cookies: Map<string, { value: string }>;
    nextUrl: URL & { pathname: string };
  }
}
