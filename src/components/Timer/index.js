import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { FiPlay, FiPause, FiRefreshCw, FiCheck } from 'react-icons/fi';

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

export default function Timer() {
  const timerRef = useRef();

  const [workTime, setWorkTime] = useState(0);
  const [breakTime, setBreakTime] = useState(5);

  const [minutes, setMinutes] = useState(workTime);
  const [seconds, setSeconds] = useState(0);

  const [timerEnabled, setTimerEnabled] = useState(false);
  const [breakMoment, setBreakMoment] = useState(false);

  const handleRefresh = useCallback(() => {
    if (breakMoment) {
      setMinutes(parseInt(breakTime, 10));
      setBreakMoment(true);
    } else {
      setMinutes(parseInt(workTime, 10));
      setBreakMoment(false);
    }

    setTimerEnabled(false);
    clearTimeout(timerRef.current);
    setSeconds(0);
  }, [breakMoment, breakTime, workTime]);

  function handleSubmit(e) {
    e.preventDefault();

    handleRefresh();
  }

  const startCountdown = useCallback(() => {
    timerRef.current = setTimeout(() => {
      if (parseInt(seconds, 10) === 0 && parseInt(minutes, 10) !== 0) {
        setSeconds(59);
        setMinutes(minutes - 1);
      } else if (parseInt(seconds, 10) === 0 && parseInt(minutes, 10) === 0) {
        if (!breakMoment) {
          setSeconds(0);
          setMinutes(parseInt(breakTime, 10));
          setBreakMoment(true);
        } else {
          setSeconds(0);
          setMinutes(parseInt(workTime, 10));
          setBreakMoment(false);
        }
      } else {
        setSeconds(parseInt(seconds, 10) - 1);
      }
    }, 1000);
  }, [seconds, minutes, breakMoment, breakTime, workTime]);

  useEffect(() => {
    if (timerEnabled) {
      startCountdown();
    }
  }, [startCountdown, timerEnabled]);

  return (
    <ContainerFluid breaktime={breakMoment}>
      {minutes === workTime || (minutes === breakTime && breakMoment) ? (
        <Helmet>
          <title>Pomodoro Timer</title>
        </Helmet>
      ) : (
        <Helmet>
          <title>{`${minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds
          } - ${breakMoment ? 'Take coffee' : 'Work hard dream big'}`}</title>
        </Helmet>
      )}

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
    </ContainerFluid>
  );
}
