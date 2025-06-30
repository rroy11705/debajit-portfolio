import React from 'react'

const SanitizedText = ({ text }: { text: string }) => {
	const splittedText = text.split('\\n');
  return (
    <>
      {splittedText.map((segment, index) => (
        <React.Fragment key={index}>
          {segment}
          {index < splittedText.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
}

export default SanitizedText