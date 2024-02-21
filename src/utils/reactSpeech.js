import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import React, { useEffect, useState } from "react";
import {
  PiMicrophoneSlashThin,
  PiMicrophoneLight,
  PiStopCircle,
} from "react-icons/pi";

export default function SpeechToText(props) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const [recordStatus, setRecordStatus] = useState("stop");
  useEffect(()=>{
    if (recordStatus === "start") {
        console.log("starting");
        SpeechRecognition.startListening({ language: "en-IN",continuous:true });
      } else if (recordStatus === "stop") {
        console.log("stopping");
        props.setText(transcript);
        SpeechRecognition.stopListening();
      }
  },[recordStatus])
  
  

  if (!browserSupportsSpeechRecognition || !isMicrophoneAvailable) {
    return <PiMicrophoneSlashThin />;
  }

//   const handleOnclick = () => {
//     if (recordStatus === "start") {
//       SpeechRecognition.startListening({ language: "en-IN" });
//     } else if (recordStatus === "stop") {
//       SpeechRecognition.stopListening();
//     } else if (transcript && transcript !== "") {
//       resetTranscript();
//     }
//   };
  console.log(recordStatus,listening,transcript);

  return (
    <div>
      <button
        onClick={() => {
          setRecordStatus((previous) => {
            return previous === "start" ? "stop" : "start";
          });
        }}
      >
        {listening ? <PiStopCircle /> : <PiMicrophoneLight />}
      </button>
    </div>
  );
}
