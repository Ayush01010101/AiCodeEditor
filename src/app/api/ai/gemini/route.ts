import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(request: Request, responce: Response) {
  const { text } = await generateText({
    model: google('gemini-3-flash-preview'),
    prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  });
  return NextResponse.json({ text })
}

