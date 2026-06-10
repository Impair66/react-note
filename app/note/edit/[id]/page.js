import { notFound } from "next/navigation";
import NoteEditor from "@/components/NoteEditor";
import { getNote } from "@/lib/redis";

export default async function EditPage({ params }) {
  const { id: noteId } = await params;
  const note = await getNote(noteId);

  if (note === null) {
    notFound();
  }

  return (
    <NoteEditor
      noteId={noteId}
      initialTitle={note.title}
      initialBody={note.content}
    />
  );
}
