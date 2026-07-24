import React, { useEffect, useRef, useState } from 'react';
import { galleryImages } from '../siteData';

function GalleryLightbox() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const closeButton = useRef(null);
  const triggerButton = useRef(null);

  useEffect(() => {
    if (selectedIndex === null) return undefined;
    closeButton.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedIndex(null);
      if (event.key === 'Tab') {
        event.preventDefault();
        closeButton.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex]);

  const close = () => {
    setSelectedIndex(null);
    triggerButton.current?.focus();
  };

  return (
    <>
      <div className="gallery-grid">
        {galleryImages.map(([src, alt], index) => (
          <button
            className="gallery-item"
            key={src}
            type="button"
            aria-label={`Enlarge image: ${alt}`}
            onClick={(event) => {
              triggerButton.current = event.currentTarget;
              setSelectedIndex(index);
            }}
          >
            <img src={src} alt={alt} />
            <span>View image</span>
          </button>
        ))}
      </div>
      {selectedIndex !== null && (
        <div className="lightbox-backdrop" role="presentation" onMouseDown={close}>
          <div className="lightbox" role="dialog" aria-modal="true" aria-label="Enlarged gallery image" onMouseDown={(event) => event.stopPropagation()}>
            <button className="lightbox-close" type="button" ref={closeButton} onClick={close} aria-label="Close enlarged image">×</button>
            <img src={galleryImages[selectedIndex][0]} alt={galleryImages[selectedIndex][1]} />
            <p>{galleryImages[selectedIndex][1]}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default GalleryLightbox;
