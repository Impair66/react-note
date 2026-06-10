"use server";

import { redirect } from "next/navigation";
import { addNote, updateNote, delNote } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const noteSchema = z.object({
  title: z.string().min(1, "标题不能为空"),
  content: z.string().min(1, "请填写内容").max(100, "字数最多 100"),
});

export async function saveNote(prevState, formData) {
  const noteId = formData.get("noteId");
  const data = {
    title: formData.get("title"),
    content: formData.get("body"),
    updateTime: new Date(),
  };

  const validated = noteSchema.safeParse(data);
  if (!validated.success) {
    return { errors: validated.error.issues };
  }

  let targetId;
  if (noteId) {
    await updateNote(noteId, JSON.stringify(data));
    targetId = noteId;
  } else {
    targetId = await addNote(JSON.stringify(data));
  }

  revalidatePath("/", "layout");
  redirect(`/note/${targetId}`);
}

export async function deleteNote(prevState, formData) {
  const noteId = formData.get("noteId");
  if (!noteId) {
    return { error: "缺少笔记 ID" };
  }
  await delNote(noteId);
  revalidatePath("/", "layout");
  redirect("/");
}
