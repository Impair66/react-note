"use client";

export default function Error({ error, reset }) {
  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">
        服务暂时不可用，请稍后重试
      </span>
      <button
        onClick={() => reset()}
        style={{
          marginTop: "1em",
          padding: "0.5em 1em",
          cursor: "pointer",
        }}
      >
        重试
      </button>
    </div>
  );
}
