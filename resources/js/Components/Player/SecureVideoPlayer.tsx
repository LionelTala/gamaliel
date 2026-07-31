// resources/js/Components/Player/SecureVideoPlayer.tsx
import { useRef } from 'react';

interface Props {
    src: string;
    poster?: string;
}

export default function SecureVideoPlayer({ src, poster }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault(); // désactive le clic droit → "Enregistrer la vidéo sous..."
    };

    return (
        <div className="relative rounded-xl overflow-hidden bg-black" onContextMenu={handleContextMenu}>
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                controls
                controlsList="nodownload noremoteplayback" // ✅ masque le bouton téléchargement natif Chrome/Edge
                disablePictureInPicture
                className="w-full aspect-video"
                onContextMenu={handleContextMenu}
            />
        </div>
    );
}
