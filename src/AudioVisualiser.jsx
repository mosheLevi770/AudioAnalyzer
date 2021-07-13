import React, {useRef, useEffect} from 'react';

const AudioVisualiser = (props) =>
{

    const canvasRef = useRef();

    const draw = () =>
    {
        if (canvasRef === undefined)
            return;

        const { audioData } = props;
        if (audioData === null)
            return;

        const canvas = canvasRef.current;
        const height = canvas.height;
        const width = canvas.width;
        const context = canvas.getContext('2d');
        let x = 0;
        const sliceWidth = (width * 1.0)/audioData.length;

        context.lineWidth = 2;
        context.strokeStyle = '#000000';
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.moveTo(0, height/2);

        for (const item of audioData)
        {
            const y = (item/255.0)*height;
            context.lineTo(x, y);
            x += sliceWidth;
        }

        context.lineTo(x, height/2);
        context.stroke();
    }

    useEffect(
        () =>
        {
            draw();
        },
        [props.audioData]
    )

    return(
        <div className='ba absolute'>
            <canvas width='200' height='50' ref={canvasRef}/>
        </div>
    )
}

export default AudioVisualiser;