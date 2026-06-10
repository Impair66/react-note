"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import nextSvg from "@/public/next.svg";
import fileSvg from "@/public/file.svg";

export default function SidebarNoteContent({
  id,
  title,
  children,
  expandedChildren,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const pathParts = pathname?.split("/").filter(Boolean) || [];
  const selectedId =
    pathParts.length > 0 ? pathParts[pathParts.length - 1] : null;

  const [isPending] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = id === selectedId;

  const itemRef = useRef(null);
  const prevTitleRef = useRef(title);
  const sidebarToggleRef = useRef(null);

  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title;
      itemRef.current?.classList.add("flash");
    }
  }, [title]);

  const buttonClass = [
    "sidebar-note-open",
    isPending ? "pending" : "",
    isActive ? "active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => {
        itemRef.current?.classList.remove("flash");
      }}
      className={["sidebar-note-list-item", isExpanded ? "note-expanded" : ""].join(" ")}
    >
      {children}
      <button
        className={buttonClass}
        style={{
          backgroundColor: isPending
            ? "var(--gray-80)"
            : isActive
            ? "var(--tertiary-blue)"
            : "",
          border: isActive
            ? "1px solid var(--primary-border)"
            : "1px solid transparent",
        }}
        onClick={() => {
          const sidebarToggle = document.getElementById("sidebar-toggle");
          if (sidebarToggle) {
            sidebarToggle.checked = true;
          }
          router.push(`/note/${id}`);
        }}
      >
        Open note for preview
      </button>
      <button
        className="sidebar-note-toggle-expand"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        <Image
          src={isExpanded ? fileSvg : nextSvg}
          width={10}
          height={10}
          alt={isExpanded ? "Collapse" : "Expand"}
        />
      </button>
      {isExpanded && expandedChildren}
    </div>
  );
}
