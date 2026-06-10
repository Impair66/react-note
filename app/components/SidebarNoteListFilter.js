"use client";

import SidebarNoteItem from "@/components/SidebarNoteItem";
import { useSearchParams } from "next/navigation";

export default function SidebarNoteListFilter({ notes }) {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("q")?.toLowerCase() || "";

  const parsedNotes = Object.entries(notes).map(([noteId, noteStr]) => ({
    noteId,
    noteData: JSON.parse(noteStr),
  }));

  const filteredNotes = searchText
    ? parsedNotes.filter(({ noteData }) =>
        noteData?.title?.toLowerCase().includes(searchText)
      )
    : parsedNotes;

  if (filteredNotes.length === 0) {
    return (
      <div className="notes-empty">
        {searchText ? "没有找到匹配的笔记" : "暂无笔记!"}
      </div>
    );
  }

  return (
    <ul className="notes-list">
      {filteredNotes.map(({ noteId, noteData }) => (
        <li key={noteId}>
          <SidebarNoteItem noteId={noteId} note={noteData} />
        </li>
      ))}
    </ul>
  );
}
