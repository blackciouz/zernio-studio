import { marked } from 'marked';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function DocPage() {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetch(`/data/docs/${slug}.json`)
      .then(res => res.json())
      .then(data => {
        setContent(marked.parse(data.content));
        setTitle(data.title);
      });
  }, [slug]);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div 
        className="prose prose-invert prose-slate max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
