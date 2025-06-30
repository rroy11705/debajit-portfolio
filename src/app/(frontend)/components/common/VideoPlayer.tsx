'use client'

import React, { lazy } from "react";
const ReactPlayer = lazy(() => import("react-player/lazy"));

interface VideoPlayerProps {
	id: string;
	url?: string;
	classNames?: string;
	controls?: boolean;
	playing?: boolean;
	light?: string | boolean;
}

const VideoPlayer = ({
	id,
	url = "",
	classNames = "",
	controls = true,
	playing = true,
	light = "https://ionicframework.com/docs/img/demos/thumbnail.svg",
}: VideoPlayerProps) => {
  if (!url) return
	return (
    <div className={"w-full " + classNames}>
      <ReactPlayer
        id={id}
        className="absolute top-0 left-0 overflow-hidden"
        width="100%"
        height="100%"
        controls={controls}
        playing={playing}
        light={light}
        playIcon={
          <button
            className="max-w-[200px] w-full flex justify-center items-center gap-[10px] rounded-[40px] text-[20px] p-6"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
							<polygon className="play-btn__svg" points="9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69" fill="#fff"/>
							<path className="play-btn__svg" d="M26,13A13,13,0,1,1,13,0,13,13,0,0,1,26,13ZM13,2.18A10.89,10.89,0,1,0,23.84,13.06,10.89,10.89,0,0,0,13,2.18Z" fill="#fff"/>
						</svg> 
          </button>
        }
        url={url}
      />
    </div>
  );
}

export default VideoPlayer;
