import "./style.css";
import Sidebar from "@/components/Sidebar";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "React Notes",
  description: "一个基于 Next.js App Router 的笔记应用",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="container">
          <div className="main">
            <Sidebar />
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
      </body>
    </html>
  );
}
