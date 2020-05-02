import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import { FiPlay, FiPause, FiRefreshCw, FiCheck } from 'react-icons/fi';
import useInterval from '../../hooks/useInterval';

import {
  Container,
  Countdown,
  Button,
  ButtonGroup,
  ContainerFluid,
  Form,
  FormGroup,
} from './styles';

import logo from '../../assets/logo.png';
import notification from '../../assets/notification.mp3';

export default function Timer() {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  const [minutes, setMinutes] = useState(workTime);
  const [seconds, setSeconds] = useState(0);

  const [timerEnabled, setTimerEnabled] = useState(false);
  const [breakMoment, setBreakMoment] = useState(false);

  const audio = useRef();

  const handleRefresh = useCallback(() => {
    audio.current.pause();
    audio.current.currentTime = 0;

    if (breakMoment) {
      setMinutes(parseInt(breakTime, 10));
      setBreakMoment(true);
    } else {
      setMinutes(parseInt(workTime, 10));
      setBreakMoment(false);
    }

    setTimerEnabled(false);
    setSeconds(0);
  }, [breakMoment, breakTime, workTime]);

  useInterval(() => {
    if (timerEnabled) {
      if (parseInt(seconds, 10) === 0 && parseInt(minutes, 10) !== 0) {
        setSeconds(59);
        setMinutes(minutes - 1);
      } else if (parseInt(seconds, 10) === 0 && parseInt(minutes, 10) === 0) {
        if (!breakMoment) {
          audio.current.play();
          setSeconds(0);
          setMinutes(parseInt(breakTime, 10));
          setBreakMoment(true);
        } else {
          audio.current.play();
          setSeconds(0);
          setMinutes(parseInt(workTime, 10));
          setBreakMoment(false);
        }
      } else {
        setSeconds(parseInt(seconds, 10) - 1);
      }
    }
  }, 1000);

  function handleSubmit(e) {
    e.preventDefault();
    if (parseInt(workTime, 10) <= 0 || parseInt(breakTime, 10) <= 0) {
      toast.warning('You cannot set negative numbers or 0 as value!');
    } else {
      toast.success('Timer updated successfully!');
      handleRefresh();
    }
  }

  useEffect(() => {
    document.title = `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    } - ${breakMoment ? 'Take coffee' : 'Work hard dream big'}`;
  });

  return (
    <ContainerFluid breaktime={breakMoment}>
      <Container>
        <img src={logo} alt="Pomodoro Timer" />
        <h1>{breakMoment ? 'Take coffee' : 'Pomodoro Timer'}</h1>
        <Countdown>
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </Countdown>

        <ButtonGroup>
          {timerEnabled ? (
            <Button type="button" onClick={() => setTimerEnabled(false)}>
              <FiPause size={20} />
            </Button>
          ) : (
            <Button type="button" onClick={() => setTimerEnabled(true)}>
              <FiPlay size={20} />
            </Button>
          )}

          <Button type="button" onClick={handleRefresh}>
            <FiRefreshCw size={20} />
          </Button>
        </ButtonGroup>
        <div>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="work">
              Work time duration (min):
              <FormGroup breaktime={breakMoment}>
                <input
                  type="number"
                  onChange={(e) => setWorkTime(e.target.value)}
                  value={workTime}
                  id="work"
                />
                <button type="submit">
                  <FiCheck size={20} />
                </button>
              </FormGroup>
            </label>
          </Form>
        </div>

        <div>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="break">
              Break time duration (min):
              <FormGroup breaktime={breakMoment}>
                <input
                  type="number"
                  onChange={(e) => setBreakTime(e.target.value)}
                  value={breakTime}
                  id="break"
                />
                <button type="submit">
                  <FiCheck size={20} />
                </button>
              </FormGroup>
            </label>
          </Form>
        </div>
      </Container>
      <audio id="beep" ref={audio} src={notification} type="audio" />
    </ContainerFluid>
  );
}
