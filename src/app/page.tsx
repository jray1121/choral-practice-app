import { AudioPlayer } from '@/components/AudioPlayer';
import { SheetMusic } from '@/components/SheetMusic';
import { RecordButton } from '@/components/RecordButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Choral Practice App</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Your Practice Session</h2>
            <RecordButton 
              onRecordingComplete={(blob) => {
                // Create URL for the recorded audio
                const url = URL.createObjectURL(blob);
                console.log('Recording URL:', url);
                // TODO: Handle the recording - could save it, play it back, etc.
              }}
            />
          </div>

          <div className="border rounded-lg p-4">
            <SheetMusic 
              notes="c/4 d/4 e/4 f/4" 
              width={800}
              height={200}
            />
          </div>

          <div className="flex justify-center">
            <AudioPlayer />
          </div>
        </div>
      </div>
    </main>
  );
}
