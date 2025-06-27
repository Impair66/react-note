import NoteEditor from "../../../components/NoteEditor";
import { getNote } from "../../../../lib/redis";

export default async function EditPage(props) {
  const { params } = props;
  const noteId = params.id;
  console.log("params.id =", params.id); // ✅ 正常输出
  const note = await getNote(noteId);

  // 让效果更明显
  //   const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  //   await sleep(5000);

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    );
  }

  return (
    <NoteEditor
      noteId={noteId}
      initialTitle={note.title}
      initialBody={note.content}
    />
  );
}
