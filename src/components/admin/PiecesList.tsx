'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PieceForm } from './PieceForm';

type Piece = {
  id: string;
  title: string;
  composer?: string;
  arranger?: string;
  collection: {
    name: string;
  };
  difficulty: string;
  scoreFile?: {
    filename: string;
  };
  audioParts: Array<{
    partType: string;
    audioFile: {
      filename: string;
    };
  }>;
};

export function PiecesList() {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Fetch pieces on component mount
  // useEffect(() => {
  //   fetch('/api/admin/pieces')
  //     .then(res => res.json())
  //     .then(data => setPieces(data));
  // }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Piece</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Piece</DialogTitle>
            </DialogHeader>
            <PieceForm onSuccess={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Composer</TableHead>
              <TableHead>Collection</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Files</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pieces.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No pieces added yet. Add your first piece to get started.
                </TableCell>
              </TableRow>
            ) : (
              pieces.map((piece) => (
                <TableRow key={piece.id}>
                  <TableCell>{piece.title}</TableCell>
                  <TableCell>{piece.composer}</TableCell>
                  <TableCell>{piece.collection.name}</TableCell>
                  <TableCell>{piece.difficulty}</TableCell>
                  <TableCell>
                    {piece.scoreFile ? (
                      <span className="text-green-600">✓ Score</span>
                    ) : (
                      <span className="text-red-600">✗ Score</span>
                    )}
                    {' | '}
                    {piece.audioParts.length > 0 ? (
                      <span className="text-green-600">
                        ✓ Audio ({piece.audioParts.length})
                      </span>
                    ) : (
                      <span className="text-red-600">✗ Audio</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
