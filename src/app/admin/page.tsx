import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PiecesList } from "@/components/admin/PiecesList";
import { CollectionsList } from "@/components/admin/CollectionsList";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      <Tabs defaultValue="pieces" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pieces">Pieces</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="uploads">Uploads</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pieces" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Music Pieces</CardTitle>
              <CardDescription>
                Manage your choral pieces, scores, and audio files.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PiecesList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Collections</CardTitle>
              <CardDescription>
                Organize pieces into collections or repertoires.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CollectionsList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uploads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>File Management</CardTitle>
              <CardDescription>
                Upload and manage scores and audio files.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Upload management interface coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
