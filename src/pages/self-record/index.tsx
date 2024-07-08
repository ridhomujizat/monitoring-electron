import {
  CloseCircleFilled,
  DownloadOutlined,
  PauseCircleFilled,
  PlayCircleFilled,
} from "@ant-design/icons";
import { Button, Modal } from "antd";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

export default function SelfRecord() {
  const [onRecored, setOnRecored] = useState(false);
  const [source, setSource] = useState<{
    list: any[] | [];
    selected: any | null;
    isSelect: boolean;
  }>({
    list: [],
    selected: null,
    isSelect: false,
  });

  const videoRef = useRef<HTMLVideoElement>();
  const mediaRecorderRef = useRef<MediaRecorder>();
  const [chunks, setChunks] = useState([]);
  const [isPlay, setIsPlay] = useState(false);
  const streamRef = useRef(null); // Reference to the media stream

  useEffect(() => {
    // Clean up the media stream when the component unmounts
    return () => {
      clearStream();
    };
  }, []);

  const clearStream = () => {
    // @ts-ignore
    if (streamRef.current && streamRef.current?.getTracks()) {
      // @ts-ignore
      streamRef.current?.getTracks()?.forEach((track) => track.stop());
    }
  };

  const stopCapture = () => {
    mediaRecorderRef.current?.stop();
    // @ts-ignore
    videoRef.current.srcObject = null;
    // @ts-ignore
    clearStream();
    setOnRecored(false);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    // @ts-ignore
    streamRef.current = stream;
    // @ts-ignore
    videoRef.current.srcObject = stream;

    // const options = { mimeType: 'video/webm; codecs=vp9' };
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event: any) => {
      if (event.data.size > 0) {
        // @ts-ignore
        setChunks([...chunks, event.data]);
      }
    };
    // mediaRecorderRef.current.onstop = saveRecording;
    mediaRecorderRef.current.start();

    setOnRecored(true);
  };

  const saveRecording = () => {
    const blob = new Blob(chunks, {
      type: "video/webm; codecs=vp9",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recording.webm";
    a.click();
    URL.revokeObjectURL(url);
    // recordedChunksRef.current = [];
  };

  console.log(videoRef.current?.src, videoRef.current?.srcObject);
  return (
    <div className="container p-3 flex flex-col items-center gap-2">
      {/* @ts-ignore */}
      <video id="stream" src="#" autoPlay ref={videoRef}></video>
      <p className="pr-5">{onRecored && "Recording with camera and audio"}</p>
      {chunks.length > 0 && !onRecored && (
        <div className="flex items-center shadow border rounded py-1 px-2 my-5">
          <p>Record {moment().format("lll")} </p>
          <Button
            type="text"
            shape="circle"
            icon={isPlay ? <PauseCircleFilled /> : <PlayCircleFilled />}
            onClick={() => {
              if (isPlay) {
                setIsPlay(false);
                // @ts-ignore
                videoRef.current.src = "";
                return;
              }
              setIsPlay(true);
              const blob = new Blob(chunks, {
                type: "video/webm",
              });
              const url = URL.createObjectURL(blob);

              if (videoRef.current) {
                videoRef.current.src = url;
              }
            }}
          />
          <Button
            type="text"
            shape="circle"
            icon={<DownloadOutlined />}
            onClick={saveRecording}
          />
          <Button
            type="text"
            shape="circle"
            icon={<CloseCircleFilled />}
            onClick={() => {
              if (isPlay) {
                setIsPlay(false);
                // @ts-ignore
                videoRef.current.src = "";
                return;
              }
              setChunks([]);
            }}
          />
        </div>
      )}
      <div className="flex gap-2 items-center">
        <Button type="primary" onClick={startRecording} disabled={onRecored}>
          Play
        </Button>
        <Button
          type="primary"
          danger
          onClick={stopCapture}
          disabled={!onRecored}
        >
          Stop
        </Button>
      </div>
      <Modal
        title="Select Screen"
        open={source.isSelect}
        onCancel={() => {
          setSource({
            ...source,
            isSelect: false,
          });
        }}
        closable
      >
        <div className="flex flex-col gap-2">
          {source.list
            .sort((a, b) => a - b)
            .map((item: any, index) => (
              <div
                key={index}
                className="flex gap-2 items-center cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
                onClick={() => {
                  startRecording();
                  setSource({
                    ...source,
                    selected: item,
                    isSelect: false,
                  });
                }}
              >
                <img src={item.thumbnailURL} alt={item.name} />
                <span>{item.name}</span>
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
}
