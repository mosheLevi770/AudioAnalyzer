import React, {useState, useEffect, useRef} from 'react';
import AudioVisualiser from './AudioVisualiser';

const AudioAnalyzer = (props) =>
{
    const audioContext = useRef();
    const analyzer = useRef();
    const dataArray = useRef();
    const source = useRef();
    const rafId = useRef();

    const [audioData, setAudioData] = useState(new Uint8Array(1024));

    useEffect(
        () =>
        {
            audioContext.current = new window.AudioContext();

            console.log(audioContext.current);

            analyzer.current = audioContext.current.createAnalyser();
            dataArray.current = new Uint8Array(analyzer.current.frequencyBinCount);
            source.current = audioContext.current.createMediaStreamSource(props.audio);
            source.current.connect(analyzer.current);

            rafId.current = requestAnimationFrame(tick);

            return () =>
            {
                cancelAnimationFrame(rafId.current);
                analyzer.current.disconnect();
                source.current.disconnect();
            }
        },
        []
    )

    const tick = () =>
    {
        analyzer.current.getByteTimeDomainData(dataArray.current);
        setAudioData(dataArray.current.slice());
        rafId.current = requestAnimationFrame(tick);
    }

    //console.log(audioData);

    return(
        <AudioVisualiser
            audioData={audioData}
        />
    )
}

export default AudioAnalyzer;