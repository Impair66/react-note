import SidebarNoteListFilter from "@/components/SidebarNoteListFilter";
import { getAllNotes } from "@/lib/redis";

export default async function NoteList() {
  const notes = await getAllNotes();

  if (Object.keys(notes).length === 0) {
    return <div className="notes-empty">{"暂无笔记!"}</div>;
  }

  return <SidebarNoteListFilter notes={notes} />;
}
