import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'score' or 'audio'
    const pieceId = formData.get('pieceId') as string;
    const partType = formData.get('partType') as string; // required for audio files

    if (!file || !type || !pieceId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = {
      score: ['application/pdf'],
      audio: ['audio/mpeg', 'audio/wav', 'audio/mp3'],
    };

    if (!allowedTypes[type as keyof typeof allowedTypes]?.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }

    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'uploads', type);
    await mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const filename = `${Date.now()}-${file.name}`;
    const filepath = join(uploadDir, filename);

    // Write file to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Create file record in database
    const fileRecord = await prisma.file.create({
      data: {
        filename,
        path: filepath,
        mimeType: file.type,
        size: file.size,
      },
    });

    // Update piece with file reference
    if (type === 'score') {
      await prisma.piece.update({
        where: { id: pieceId },
        data: { scoreFileId: fileRecord.id },
      });
    } else if (type === 'audio' && partType) {
      await prisma.audioPart.create({
        data: {
          pieceId,
          partType: partType as any,
          fileId: fileRecord.id,
        },
      });
    }

    return NextResponse.json(fileRecord);
  } catch (error) {
    console.error('Error handling file upload:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
