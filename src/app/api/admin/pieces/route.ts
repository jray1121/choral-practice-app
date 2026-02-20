import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import prisma from '@/lib/prisma';

// Validation schema for piece creation/update
const pieceSchema = z.object({
  title: z.string().min(1),
  composer: z.string().optional(),
  arranger: z.string().optional(),
  collectionId: z.string().min(1),
  difficulty: z.enum(['BEGINNER', 'MEDIUM', 'ADVANCED', 'PROFESSIONAL']),
  tags: z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await req.json();
    const validatedData = pieceSchema.parse(json);

    const piece = await prisma.piece.create({
      data: validatedData,
    });

    return NextResponse.json(piece);
  } catch (error) {
    console.error('Error creating piece:', error);
    return NextResponse.json(
      { error: 'Failed to create piece' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const pieces = await prisma.piece.findMany({
      include: {
        collection: true,
        scoreFile: true,
        audioParts: {
          include: {
            audioFile: true,
          },
        },
      },
    });

    return NextResponse.json(pieces);
  } catch (error) {
    console.error('Error fetching pieces:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pieces' },
      { status: 500 }
    );
  }
}
