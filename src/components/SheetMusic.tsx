import { useEffect, useRef } from 'react';
import { Factory, RenderContext } from 'vexflow';

interface SheetMusicProps {
  notes?: string;
  width?: number;
  height?: number;
}

export function SheetMusic({ notes = '', width = 500, height = 150 }: SheetMusicProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = '';

    // Create VexFlow factory
    const factory = new Factory({
      renderer: { elementId: containerRef.current.id || 'score', width, height }
    });

    const context = factory.getContext() as RenderContext;
    const stave = factory.Stave({ x: 10, y: 10, width: width - 20 })
      .addClef('treble')
      .addTimeSignature('4/4');

    const voice = factory.Voice().setStrict(false);
    const noteGroup = !notes
      ? [factory.StaveNote({ keys: ['b/4'], duration: 'w' })]
      : notes.split(' ').map(note => 
          factory.StaveNote({ keys: [note], duration: 'q' })
        );

    voice.addTickables(noteGroup);

    const formatter = factory.Formatter();
    formatter.joinVoices([voice]).formatToStave([voice], stave);

    stave.setContext(context).draw();
    voice.setContext(context).draw();
  }, [notes, width, height]);

  return (
    <div 
      ref={containerRef} 
      id="score"
      className="w-full overflow-x-auto bg-white rounded-lg shadow-sm"
    />
  );
}
