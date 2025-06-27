import Note from "../../components/Note";
import { getNote } from "../../../lib/redis";

// redis-server --service-start
export default async function Page({ params }) {
  // 动态路由 获取笔记 id
  const noteId = params.id;

  console.log("params.id =", params.id); // ✅ 正常输出
  const note = await getNote(noteId);

  if (note == null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    );
  }

  return <Note noteId={noteId} note={note} />;
}
