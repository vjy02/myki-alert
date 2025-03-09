import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const apiUrl = `${supabaseUrl}/rest/v1/reported_lines`;
const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY!; 

async function verifyRecaptcha(token: string) {
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    body: new URLSearchParams({
      secret: recaptchaSecretKey,
      response: token,
    }),
  });
  const data = await response.json();
  return data.success;
}

export async function POST(request: NextRequest) {
  try {
    const { line_id, user_id, captcha_token } = await request.json();
    if (!line_id) {
      return NextResponse.json(
        { error: 'Line ID is required' },
        { status: 400 }
      );
    }
    
    const isCaptchaValid = await verifyRecaptcha(captcha_token);
    if (!isCaptchaValid) {
      return NextResponse.json(
        { error: 'Invalid reCAPTCHA token' },
        { status: 400 }
      );
    }

    const reported_date = new Date().toISOString();

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
      },
      body: JSON.stringify([{ line_id, reported_date, user_id }]),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData = {};
      try {
        errorData = errorText ? JSON.parse(errorText) : {};
      } catch (e) {
        console.error('Error parsing error response:', e);
      }
      return NextResponse.json(
        { error: (errorData as any).message || 'Failed to report line' },
        { status: response.status }
      );
    }

    const responseText = await response.text();
    let data = {};
    if (responseText) {
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Error parsing JSON response:', e);
      }
    }
    return NextResponse.json(
      { message: 'Line reported successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while reporting the line' },
      { status: 500 }
    );
  }
}
