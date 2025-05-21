import { useState } from 'react';
import { Tag } from 'antd';

const AuthorTags = ({ authors }: { authors: string[] }) => {
  const [expanded, setExpanded] = useState(false);
  const maxVisible = 6;

  const visibleAuthors = expanded ? authors : authors.slice(0, maxVisible);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
      {visibleAuthors.map((author, index) => (
        <Tag key={index} color="blue" style={{ marginBottom: 4 }}>
          {author}
        </Tag>
      ))}
      {authors.length > maxVisible && (
        <Tag
          color="default"
          onClick={() => setExpanded(!expanded)}
          style={{ cursor: 'pointer', userSelect: 'none', marginBottom: 4 }}
        >
          {expanded ? 'Show less' : `+${authors.length - maxVisible} more`}
        </Tag>
      )}
    </div>
  );
};

export default AuthorTags;