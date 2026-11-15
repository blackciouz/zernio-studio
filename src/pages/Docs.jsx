import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Docs() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    fetch('/data/docs/index.json')
      .then(res => res.json())
      .then(setDocs);
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Documentation</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs.map(doc => (
          <Link 
            key={doc.slug} 
            to={`/docs/${doc.slug}`}
            className="p-4 bg-card border border-border rounded-lg hover:border-primary transition"
          >
            {doc.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
