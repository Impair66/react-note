import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import SidebarNoteList from "@/components/SidebarNoteList";
import EditButton from "@/components/EditButton";
import NoteListSkeleton from "@/components/NoteListSkeleton";
import SidebarSearchField from "@/components/SidebarSearchField";
import logoSvg from "@/public/logo.svg";

export default function Sidebar() {
  return (
    <section className="col sidebar">
      <Link href={"/"} className="link--unstyled">
        <section className="sidebar-header">
          <Image
            className="logo"
            src={logoSvg}
            width={22}
            height={20}
            alt=""
            role="presentation"
          />
          <strong>React Notes</strong>
        </section>
      </Link>
      <section className="sidebar-menu" role="menubar">
        <SidebarSearchField />
        <EditButton noteId={null}>New</EditButton>
      </section>
      <nav>
        <Suspense fallback={<NoteListSkeleton />}>
          <SidebarNoteList />
        </Suspense>
      </nav>
    </section>
  );
}
