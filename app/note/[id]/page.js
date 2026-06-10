import { notFound } from "next/navigation";
import Note from "@/components/Note";
import { getNote } from "@/lib/redis";

export default async function NotePage({ params }) {
  const { id: noteId } = await params;
  const note = await getNote(noteId);

  if (note === null) {
    notFound();
  }

  return <Note noteId={noteId} note={note} />;
}
