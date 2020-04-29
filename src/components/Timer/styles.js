import styled from 'styled-components';

export const ContainerFluid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 0 20px;
  background: ${(props) => (!props.breaktime ? 'rgb(240, 91, 86)' : '#4e901e')};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: #fff;
    margin-bottom: 20px;
    text-shadow: 2px 2px #000;
  }

  img {
    max-width: 100px;
    height: auto;
    margin-bottom: 20px;
  }
`;

export const Countdown = styled.h2`
  text-align: center;
  font-size: 50px;
  color: #fff;
  margin-bottom: 20px;
  text-shadow: 2px 2px #000;
`;

export const Button = styled.button`
  width: 110px;
  padding: 10px 20px;
  border: 3px solid #000;
  border-radius: 10px;
  background-color: #fff;
  color: #4e901e;
  margin: 0 10px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Form = styled.form`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #fff;

  label {
    display: block;
    width: 100%;
    color: #fff;
    font-weight: bold;
  }
`;

export const FormGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    width: 125px;
    margin-top: 5px;
    padding: 10px 10px 10px 20px;
    border-radius: 10px;
    border: none;
  }

  button {
    margin-top: 5px;
    width: 50px;
    height: 40px;
    border: none;
    border-radius: 10px;
    background: ${(props) =>
      !props.breaktime ? '#4e901e' : 'rgb(240, 91, 86)'};
    color: #fff;
    margin: 5px 10px 0 10px;
    font-weight: bold;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
