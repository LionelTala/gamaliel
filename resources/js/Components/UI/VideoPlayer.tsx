// resources/js/Components/UI/VideoPlayer.tsx
import { Plyr } from 'plyr-react';
import 'plyr-react/plyr.css';

interface Props {
    videoId: string;
    title?: string;
}

const VideoPlayer = ({ videoId, title }: Props) => {
    return (
        <div className="plyr-wrapper rounded-xl overflow-hidden">
            <Plyr
                source={{
                    type: 'video',
                    title: title || 'Vidéo',
                    sources: [
                        {
                            src: videoId,
                            provider: 'youtube',
                        },
                    ],
                }}
                options={{
                    controls: [
                        'play-large',
                        'play',
                        'progress',
                        'current-time',
                        'mute',
                        'volume',
                        'fullscreen',
                    ],
                    youtube: {
                        noCookie: true,
                        rel: 0,
                        showinfo: 0,
                        iv_load_policy: 3,
                        modestbranding: 1,
                    },
                }}
            />
        </div>
    );
};

export default VideoPlayer;
