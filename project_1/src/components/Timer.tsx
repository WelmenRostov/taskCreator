import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [secondUser, setSecond] = useState(0);
  const [minutesUser, setMinutes] = useState(0);
  const [hoursUser, setHours] = useState(0);

  const devTime = secondUser + minutesUser * 60 + hoursUser * 3600;
  const [time, setTime] = useState(devTime);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const remainingSeconds = time % 60;

  const [run, setRun] = useState(false);

  const formatTime = (time: number) => String(time).padStart(2, '0');

  function handleDigitalInput(
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(-2);
    setter(Number(value));

  }

  function handleStart(){
    if (time > 0){
      setRun(true)
    }
  }

  function handleStop(){
    setRun(false)

    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;

    setHours(h);
    setMinutes(m);
    setSecond(s);
  }

  function handleReset(){
    setRun(false)
    setHours(0);
    setMinutes(0);
    setSecond(0);
    setTime(0)
  }

  useEffect(() => {
    if (!run) {
      setTime(secondUser + minutesUser * 60 + hoursUser * 3600)
    }
  }, [secondUser, minutesUser , hoursUser]);

  useEffect(() => {
    if (!run) return;

    const intervalId = setInterval(() => {
      setTime((prevTime) => {

        if (prevTime > 0) return prevTime - 1;
        clearInterval(intervalId);

        handleReset()
        return 0;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [run]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <p>{time}</p>

      {run ? (
        <div className="text-center mb-[30px]">
          <span className="countdown font-mono text-9xl">
            <span
              style={{ '--value': hours } as React.CSSProperties}
              aria-live="polite"
              aria-label={String(hours)}
            ></span>
            :
            <span
              style={{ '--value': minutes } as React.CSSProperties}
              aria-live="polite"
              aria-label={String(minutes)}
            ></span>
            :
            <span
              style={{ '--value': remainingSeconds, '--digits': 2 } as React.CSSProperties}
              aria-live="polite"
              aria-label={String(remainingSeconds)}
            ></span>
          </span>
        </div>
      ) : (
        <div className="text-center mb-[30px]">
          <span className="countdown font-mono text-9xl">
            <input
              name=""
              type="text"
              value={formatTime(hoursUser)}
              onChange={(e) => handleDigitalInput(e, setHours)}
              className={`w-[140px]  outline-none `}
              placeholder=""
              inputMode="numeric"
              pattern="[0-9]*"
            />
            :
            <input
              name=""
              type="text"
              onChange={(e) => handleDigitalInput(e, setMinutes)}
              value={formatTime(minutesUser)}
              className={`w-[140px] outline-none`}
              placeholder=""
              inputMode="numeric"
              pattern="[0-9]*"
            />
            :
            <input
              name=""
              type="text"
              value={formatTime(secondUser)}
              onChange={(e) => handleDigitalInput(e, setSecond)}
              className={`w-[140px] outline-none`}
              placeholder=""
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </span>
        </div>
      )}
      {!run ? (<div>
        <button className={`bg-gray-600 w-[100px] rounded-full h-[100px] flex items-center justify-center`}

                onClick={handleStart}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="none"
            className="w-[50%] h-50%]"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>) : (
        <div className={`flex flex-row items-center justify-center gap-[20px]`}>
          <button className={`bg-gray-600 w-[100px] rounded-full h-[100px] flex items-center justify-center`}
                  onClick={handleStop}>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="none"
              className="w-[50%] h-50%]"
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          </button>
          <button className={`bg-gray-600 w-[100px] rounded-full h-[100px] flex items-center justify-center`}
          onClick={handleReset}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="none"
              className="w-[50%] h-50%] text-red-400"
            >
              <rect x="6" y="6" width="12" height="12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(Timer);
