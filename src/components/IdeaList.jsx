import React from 'react';

export default function IdeaList() {
  const ideas = [
    { id: 1, title: "Örnek Fikir 1", status: "pending" },
    { id: 2, title: "Örnek Fikir 2", status: "completed" }
  ];

  return (
    <div className="idea-list">
      <ul>
        {ideas.map(idea => (
          <li key={idea.id}>
            <h3>{idea.title}</h3>
            <p className={`status-${idea.status}`}>
              Durum: {idea.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}