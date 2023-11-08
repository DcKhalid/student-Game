import { useEffect, useState } from "react";
import styled from "styled-components";
import { getData, sortKids } from "./api/API";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { shuffle } from "lodash";

const App = () => {
  const [state, setState] = useState<Array<{}>>([]);
  const [imagestate, setimageState] = useState<Array<{}>>([]);
  const [isSecondGameSelected, setIsSecondGameSelected] = useState(false);
  const [isFirstGameSelected, setIsFirstGameSelected] = useState(false);
  const [isThirdGameSelected, setIsThirdGameSelected] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [gameData, setGameData] = useState([]);
  const [timerRunning, setTimerRunning] = useState(false);
  let timer: number | undefined;

  useEffect(() => {
    if (timerRunning) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timerRunning]);

  const startTimer = () => {
    setCountdown(0);
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
    clearInterval(timer);
    alert(`It took you ${countdown} seconds to complete the task.`);
  };
  const reloadPage = () => {
    window.location.reload();
  };

  const shuffleGame = () => {
    const shuffledGameData = shuffle(gameData);
    setGameData(shuffledGameData);
    reloadPage();
  };
  const handleThirdGameClick = () => {
    setIsThirdGameSelected(true);
    setIsFirstGameSelected(false);
    setIsSecondGameSelected(false);
  };
  const handleFirstGameClick = () => {
    setIsFirstGameSelected(true);
    setIsSecondGameSelected(false);
    setIsThirdGameSelected(false);
  };
  const handleSecondGameClick = () => {
    setIsSecondGameSelected(true);
    setIsFirstGameSelected(false);
    setIsThirdGameSelected(false);
  };

  useEffect(() => {
    getData().then((res: any) => {
      setState(res);
    });
    console.log(getData);

    sortKids().then((res: any) => {
      setimageState(res);
    });
    console.log(sortKids);
  }, []);

  const onDrag = (res: any) => {
    // console.log(res);
    const { source, destination } = res;

    let data = Array.from(state);
    let [newData] = data.splice(source.index, 1);
    data.splice(destination.index, 0, newData);

    setState(data);
  };
  return (
    <DragDropContext onDragEnd={onDrag}>
      <Container>
        <Wrappers>
          <Wrapper>
            <Side>
              <Holds onClick={handleFirstGameClick}>First Game</Holds>
              <Holds onClick={handleSecondGameClick}>Sec Game</Holds>
              <Holds onClick={handleThirdGameClick}>Third Game</Holds>
            </Side>
            <Hold>
              {isFirstGameSelected ? (
                <>
                  <Droppable droppableId="stateDragnDrop">
                    {(props: any) => (
                      <First {...props.droppableProps} ref={props.innerRef}>
                        <P>Word</P>
                        {state &&
                          state?.map((props: any, i: number) => (
                            <Draggable
                              draggableId={props._id}
                              key={props._id}
                              index={i}
                            >
                              {(provs: any) => (
                                <Box
                                  key={props._id}
                                  {...provs.dragHandleProps}
                                  {...provs.draggableProps}
                                  ref={provs.innerRef}
                                >
                                  {props.name}
                                </Box>
                              )}
                            </Draggable>
                          ))}
                        {props.placeholder}
                      </First>
                    )}
                  </Droppable>
                  <Second>
                    <P>Image</P>
                    {imagestate &&
                      imagestate?.map((props: any) => (
                        <Box1 src={props.image} key={props._id}></Box1>
                      ))}
                  </Second>
                </>
              ) : null}{" "}
              :{" "}
              {isSecondGameSelected ? (
                <>
                  <Droppable droppableId="stateDragnDrop">
                    {(props: any) => (
                      <First {...props.droppableProps} ref={props.innerRef}>
                        <P>Number</P>
                        {state &&
                          state?.map((props: any, i: number) => (
                            <Draggable
                              draggableId={props._id}
                              key={props._id}
                              index={i}
                            >
                              {(provs: any) => (
                                <Box
                                  key={props._id}
                                  {...provs.dragHandleProps}
                                  {...provs.draggableProps}
                                  ref={provs.innerRef}
                                >
                                  {props.number}
                                </Box>
                              )}
                            </Draggable>
                          ))}
                        {props.placeholder}
                      </First>
                    )}
                  </Droppable>
                  <Second>
                    <P>Spelling</P>
                    {imagestate &&
                      imagestate?.map((props: any) => (
                        <Box2 key={props._id}>{props.word} </Box2>
                      ))}
                  </Second>
                </>
              ) : null}
              {isThirdGameSelected ? (
                <Div>
                  <P>Arrange the word correctly</P>
                  <Holds1>
                    <Holding>
                      {state &&
                        state?.map((props: any) => (
                          <Right key={props._id}>{props.name} :</Right>
                        ))}
                    </Holding>
                    <Holding1>
                      <Left>
                        <>
                          <Circle>w</Circle>
                          <Circle>a</Circle>
                          <Circle>l</Circle>
                          <Circle>d</Circle>
                          <Circle>f</Circle>
                        </>
                      </Left>
                      <Left>
                        <Circle>c</Circle>
                        <Circle>s</Circle>
                        <Circle>n</Circle>
                        <Circle>l</Circle>
                        <Circle>g</Circle>
                      </Left>
                      <Left>
                        <Circle>p</Circle>
                        <Circle>b</Circle>
                        <Circle>o</Circle>
                        <Circle>p</Circle>
                        <Circle>a</Circle>
                      </Left>
                      <Left>
                        <Circle>p</Circle>
                        <Circle>o</Circle>
                        <Circle>l</Circle>
                        <Circle>o</Circle>
                        <Circle>e</Circle>
                      </Left>
                      <Left>
                        <D></D>
                        <D></D>
                        <D></D>
                        <D></D>
                      </Left>
                    </Holding1>
                  </Holds1>
                </Div>
              ) : null}
            </Hold>
          </Wrapper>
        </Wrappers>
        <Button onClick={startTimer}>Start Countdown</Button>
        <Button onClick={stopTimer}>Stop Countdown</Button>
        <Button onClick={shuffleGame}>Stop Countdown</Button>
        <D>Countdown: {countdown} seconds</D>
      </Container>
    </DragDropContext>
  );
};

export default App;
const Button = styled.button`
  padding: 10px 18px;
  background: orange;
  border: none;
  color: white;
  margin: 0px 10px;
`;
const D = styled.div`
  font-size: 16px;
  color: #fff;
  font-weight: 500;
`;
const Circle = styled.div`
  width: 30px;
  font-size: 15px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  border-radius: 50%;
  border: 1px solid grey;
  /* margin-top: -14px; */
  position: relative;
  bottom: 19px;
`;
const Holding1 = styled.div`
  width: 70%;
  height: 300px;
  /* border: 2px solid white; */
  margin-right: 10px;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;
const Holding = styled.div`
  width: 15%;
  height: 300px;
  /* border: 2px solid gray; */
  margin-left: 10px;
`;
const Div = styled.div`
  width: 100%;
  background: #161c2769;
  /* height: 300px; */
`;
const Left = styled.div`
  width: 20%;
  height: 300px;
  /* border: 1px solid grey; */
  margin-left: 23px;
  display: flex;
  gap: 27px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Right = styled.div`
  width: 70px;
  height: 50px;
  /* border: 1px solid white; */
  margin-left: 7px;
  font-size: 17px;
  font-weight: bold;
  color: #fff;
  margin-top: -9px;
  margin-top: 8.1px;
  object-fit: cover;
`;
const Holds1 = styled.div`
  width: 90%;
  background: #161c2769;
  height: 350px;
  /* border: 1px solid orange; */
  display: flex;
  margin-left: 12px;
  justify-content: space-between;
  align-items: center;
`;
const Box1 = styled.img`
  width: 90px;
  height: 50px;
  border: 1px solid white;
  margin-left: 4px;
  margin-top: 8.3px;
  object-fit: cover;
`;
const Box2 = styled.div`
  width: 90px;
  height: 50px;
  border: 1px solid white;
  margin-left: 6px;
  margin-top: 13px;
  font-size: 15px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  width: 90px;
  height: 50px;
  border: 1px solid white;
  margin-left: 6px;
  margin-top: 13px;
  font-size: 15px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const P = styled.div`
  font-size: 19px;
  color: white;
  font-weight: bold;
  text-align: center;
`;
const Second = styled.div`
  width: 19%;
  height: 360px;
  background: 111620;
  border: 1px solid grey;
  text-align: center;
`;

const First = styled.div`
  width: 19%;
  height: 360px;
  background: 111620;
  border: 1px solid grey;
`;
const Holds = styled.div`
  width: 100px;
  height: 55px;
  background: #92bcff;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;
const Side = styled.div`
  width: 10%;
  background: #241f3469;
  height: 400px;
  margin-right: 29px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-direction: column;
  border: 6px solid #fff;
`;
const Hold = styled.div`
  width: 40%;
  background: #111620;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 6px solid #92bcff;
`;
const Wrapper = styled.div`
  width: 80%;
  background: #161c27;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrappers = styled.div`
  width: 100%;
  height: 90vh;
  background: pink;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #161c27;
`;
